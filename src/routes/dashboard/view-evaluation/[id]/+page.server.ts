import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { EEvaluationStatus } from "$lib/types/enums";
import { ID } from "node-appwrite";
import { getFileWithUpdatedFileName } from "$lib/api/utils";
import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATED_FILES_BUCKET, PUBLIC_APPWRITE_EVALUATION_FILES_DB, PUBLIC_APPWRITE_EVALUATOR_REMARK_DB } from "$env/static/public";

export const ssr = false;

export const load: PageServerLoad = async ({ locals: { user } }) => {
    if (!user || user.profile.user_type === 'EVALUATOR') {
        redirect(303, '/dashboard')
    }
    return { user }
}

export const actions: Actions = {
    offlineEvaluation: async (event) => {
        const {
            request,
            locals: { databases, storage }
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
                    const fileId = ID.unique();
                    const fileToUpload = getFileWithUpdatedFileName({ file, fileId })
                    const uploadedFile = await storage.createFile(PUBLIC_APPWRITE_EVALUATED_FILES_BUCKET, fileId, fileToUpload);
                    await databases.createDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATION_FILES_DB, ID.unique(), {
                        evaluation_remark: id,
                        file_id: uploadedFile.$id,
                    });
                }
            }

            await databases.updateDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_REMARK_DB, id, updatingData);
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