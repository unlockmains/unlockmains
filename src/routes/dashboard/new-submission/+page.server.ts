import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { Actions } from "./$types";
import { getFileWithUpdatedFileName } from "$lib/api/utils";
import { EQuestionTypes, ESubmissionStatus } from "$lib/types/enums";
import type { IStudentProfile } from "$lib/types";
import { v4 as uuidv4 } from "uuid"

export const ssr = true;

export const load: PageServerLoad = async ({ locals: { user, supabase } }) => {
    if (!user || user.profile.user_type !== 'STUDENT') {
        redirect(303, '/dashboard')
    }
    const studentDocument = await supabase.from("student_profile").select("id, gs_submissions_left, essay_submissions_left, optional_submissions_left").eq("user_id", user.id).single();

    const studentProfile = studentDocument.data!;
    const questionTypes = [
        { text: EQuestionTypes.GENERAL_STUDIES, value: EQuestionTypes.GENERAL_STUDIES, count: studentProfile.gs_submissions_left, disabled: !studentProfile.gs_submissions_left },
        { text: EQuestionTypes.OPTIONAL, value: EQuestionTypes.OPTIONAL, count: studentProfile.optional_submissions_left, disabled: !studentProfile.optional_submissions_left },
        { text: EQuestionTypes.ESSAY, value: EQuestionTypes.ESSAY, count: studentProfile.essay_submissions_left, disabled: !studentProfile.essay_submissions_left },
    ]

    return { user, questionTypes, studentProfile: JSON.stringify(studentProfile) }
}

export const actions: Actions = {
    default: async (event) => {
        const {
            request,
            locals: { user, supabase }
        } = event;

        let success = false;
        let message = "";

        const formData = await request.formData();
        const type = formData.get('question-type') as string;
        const gsType = formData.get('specific-gs-question-type') as string;
        const gsSubjectTag = formData.get('specific-gs-subject-tag') as string;
        const quantity = formData.get("question-quantity")!;
        const isPyq = formData.get("question-pyq") as string;

        const files = formData.getAll("updated-file");

        const studentProfile = JSON.parse(formData.get('student-profile') as string) as IStudentProfile;

        const studentSubmissionId = uuidv4();
        try {
            const savingData = {
                "student_profile": studentProfile.id,
                "question_type_lvl1": type,
                "question_type_lvl2": gsType,
                "question_type_lvl3": gsSubjectTag,
                "total_questions": Number(quantity),
                ... (isPyq !== null && { "is_pyq": isPyq === 'yes' ? true : false }),
                "status": ESubmissionStatus.SUBMITTED,
            }

            await supabase.from("student_submissions").insert({
                id: studentSubmissionId,
                ...savingData
            });

            for (const file of files) {
                if (file instanceof File) {
                    const fileId = uuidv4();
                    const fileToUpload = getFileWithUpdatedFileName({ file, fileId })
                    const { data } = await supabase.storage.from("submissions").upload(`${user?.id}/${fileId}_${file.name}`, fileToUpload);
                    if (data) {
                        const insert = await supabase.from("student_submission_files").insert({
                            student_submissions: studentSubmissionId,
                            file_id: data.id,
                            full_path: data.fullPath,
                            path: data.path,
                        });
                    }
                }
            }
            event.cookies.set('toastMessage', "Submission successful", { path: '/' });

            const fieldToBeUpdated: Record<string, number> = {};
            if (type === "General Studies") {
                fieldToBeUpdated["gs_submissions_left"] = studentProfile.gs_submissions_left < 0 ? -1 : studentProfile.gs_submissions_left - Number(quantity);
            } else if (type === "Optional") {
                fieldToBeUpdated["optional_submissions_left"] = studentProfile.optional_submissions_left < 0 ? -1 : studentProfile.optional_submissions_left - Number(quantity);
            } else if (type === "Essay") {
                fieldToBeUpdated["essay_submissions_left"] = studentProfile.essay_submissions_left < 0 ? -1 : studentProfile.essay_submissions_left - Number(quantity);
            }
            await supabase.from("student_profile").update(fieldToBeUpdated).eq("user_id", user?.id!);
            success = true;
            message = "Submission successful";
        } catch (err) {
            if (err instanceof Error) {
                success = false;
                message = err.message;
                try {
                    await supabase.from("student_submissions").delete().eq("id", studentSubmissionId);
                    await supabase.from("student_submissions_files").delete().eq("student_submissions", studentSubmissionId);
                } catch (err) {
                    console.log("error deleting documents", err);
                }
                return fail(400, { success, message });
            } else if ((err as unknown as { message: string, status: number }).status === 303) {
                success = false;
            }

            success = false;
            message = "An unexpected error occurred";
        }
        return { success, message };
    }
}
