import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { Actions } from "./$types";
import { ID, Query } from "node-appwrite";
import { PUBLIC_APPWRITE_BUCKET, PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT, PUBLIC_APPWRITE_SUBMITTED_FILES_DB, PUBLIC_APPWRITE_STUDENT_PROFILE_DB, PUBLIC_APPWRITE_STUDENT_SUBMISSION_DB } from "$env/static/public";
import { getFileWithUpdatedFileName } from "$lib/api/utils";
import { EQuestionTypes, ESubmissionStatus } from "$lib/types/enums";
import type { IStudentProfile } from "$lib/types";

export const ssr = true;

export const load: PageServerLoad = async ({ locals: { user, databases } }) => {
    if (!user || user.profile.user_type !== 'STUDENT') {
        redirect(303, '/dashboard')
    }
    const studentDocument = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_PROFILE_DB,
        [
            Query.equal("users_profile", user?.profile.$id),
            Query.select(["$id", "gs_submissions_left", "eassy_submissions_left", "optional_submissions_left"]),
            Query.limit(1),
        ]);
    const studentProfile = studentDocument.documents[0];
    const questionTypes = [
        { text: EQuestionTypes.GENERAL_STUDIES, value: EQuestionTypes.GENERAL_STUDIES, count: studentProfile.gs_submissions_left, disabled: !studentProfile.gs_submissions_left },
        { text: EQuestionTypes.OPTIONAL, value: EQuestionTypes.OPTIONAL, count: studentProfile.optional_submissions_left, disabled: !studentProfile.optional_submissions_left },
        { text: EQuestionTypes.ESSAY, value: EQuestionTypes.ESSAY, count: studentProfile.eassy_submissions_left, disabled: !studentProfile.eassy_submissions_left },
    ]
    return { user, questionTypes, studentProfile: JSON.stringify(studentProfile) }
}

export const actions: Actions = {
    default: async (event) => {
        const {
            request,
            locals: { databases, storage, user }
        } = event;

        let success = false;
        let message = "";

        const formData = await request.formData();
        const type = formData.get('question-type') as string;
        const gsType = formData.get('specific-gs-question-type') as string;
        const gsSubjectTag = formData.get('specific-gs-subject-tag') as string;
        const quantity = formData.get("question-quantity")!;
        const isPyq = formData.get("question-pyq") as string;

        const files = formData.getAll("question-files");
        const studentProfile = JSON.parse(formData.get('student-profile') as string) as IStudentProfile;

        try {
            const savingData = {
                "student_profile": studentProfile.$id,
                "question_type_lvl1": type,
                "question_type_lvl2": gsType,
                "question_type_lvl3": gsSubjectTag,
                "total_questions": Number(quantity),
                "is_pyq": isPyq === "" ? null : isPyq === 'yes' ? true : false,
                "status": ESubmissionStatus.SUBMITTED,
            }
            const document = await databases.createDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_SUBMISSION_DB, ID.unique(), savingData);

            for (const file of files) {
                if (file instanceof File) {
                    const fileId = ID.unique();
                    const fileToUpload = getFileWithUpdatedFileName({ file, fileId })
                    const uploadedFile = await storage.createFile(PUBLIC_APPWRITE_BUCKET, fileId, fileToUpload);
                    const fileUrl = `${PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${PUBLIC_APPWRITE_BUCKET}/files/${uploadedFile.$id}/view?project=${PUBLIC_APPWRITE_PROJECT}&project=${PUBLIC_APPWRITE_PROJECT}`;
                    await databases.createDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_SUBMITTED_FILES_DB, ID.unique(), {
                        student_submission: document.$id,
                        file_id: uploadedFile.$id,
                        file_url: fileUrl,
                    });
                }
            }
            event.cookies.set('toastMessage', "Submission successful", { path: '/' });

            const fieldToBeUpdated: Record<string, number> = {};
            if (type === "General Studies") {
                fieldToBeUpdated["gs_submissions_left"] = studentProfile.gs_submissions_left - Number(quantity);
            } else if (type === "Optional") {
                fieldToBeUpdated["optional_submissions_left"] = studentProfile.optional_submissions_left - Number(quantity);
            } else if (type === "Essay") {
                fieldToBeUpdated["eassy_submissions_left"] = studentProfile.eassy_submissions_left - Number(quantity);
            }
            await databases.updateDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_PROFILE_DB, studentProfile.$id, fieldToBeUpdated);
            throw redirect(303, "/dashboard");
        } catch (err) {
            if (err instanceof Error) {
                success = false;
                message = err.message;
                return fail(400, { success, message });
            } else if ((err as unknown as { message: string, status: number }).status === 303) {
                throw err;
            }

            success = false;
            message = "An unexpected error occurred";
            return fail(500, { success, message });
        }
    }
}
