import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { EEvaluationStatus } from "$lib/types/enums";
import { v4 as uuidv4 } from "uuid";
import { getFileWithUpdatedFileName } from "$lib/api/utils";

export const ssr = false;

export const load: PageServerLoad = async ({ locals: { user } }) => {
    if (!user || user.profile.user_type === 'STUDENT') {
        redirect(303, '/dashboard')
    }
    return { user }
}

export const actions: Actions = {
    offlineEvaluation: async (event) => {
        const {
            request,
            locals: { supabase, user }
        } = event;

        let success = false;
        let message = "";

        const formData = await request.formData();
        const totalQuestions = formData.get('submitted-quantity') as string;
        const remarks = formData.get("remarks") as string;
        const id = formData.get("id") as string;

        const files = formData.getAll("evaluated-files");

        try {
            const updatingData = {
                "questions_evaluated": Number(totalQuestions),
                "remarks": remarks,
                "evaluation_start": new Date().toISOString(),
                "evaluation_end": new Date().toISOString(),
                "status": EEvaluationStatus.EVALUATED,
            }

            for (const file of files) {
                if (file instanceof File) {
                    const fileId = uuidv4();
                    const fileToUpload = getFileWithUpdatedFileName({ file, fileId })
                    const { data: uploadedFile, error: uploadError } = await supabase.storage.from("evaluations").upload(`${user?.id}/${fileId}_${file.name}`, fileToUpload);
                    if (!uploadError) {
                        await supabase.from("evaluation_files").insert({
                            evaluation_remarks: id,
                            file_id: uploadedFile.id,
                            path: uploadedFile.path,
                            full_path: uploadedFile.fullPath,
                        })
                    }
                }
            }
            await supabase.from("evaluation_remarks").update(updatingData).eq("id", id);
            event.cookies.set('toastMessage', "Evaluation Submission successful", { path: '/' });

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