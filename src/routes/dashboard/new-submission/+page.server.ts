import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { Actions } from "./$types";
import { ID, Query } from "node-appwrite";
import { PUBLIC_APPWRITE_BUCKET, PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT, PUBLIC_APPWRITE_SUBMITTED_FILES_DB, PUBLIC_APPWRITE_STUDENT_PROFILE_DB, PUBLIC_APPWRITE_QUESTION_SUBMISSION_DB } from "$env/static/public";

export const ssr = true;

export const load: PageServerLoad = async ({ locals: { user, databases } }) => {
    if (!user) {
        redirect(303, '/')
    }
    const studentDocument = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_PROFILE_DB,
        [
            Query.equal("user_id", user?.$id),
            Query.select(["user_id", "gs_submissions_left", "eassy_submissions_left", "optional_submissions_left"]),
            Query.limit(1),
        ]);
    const studetProfile = studentDocument.documents[0];
    const questionTypes = [
        { text: "GS Question", value: "GS Question", count: studetProfile.gs_submissions_left, disabled: !studetProfile.gs_submissions_left },
        { text: 'Optional', value: 'Optional', count: studetProfile.optional_submissions_left, disabled: !studetProfile.optional_submissions_left },
        { text: 'Essay', value: 'Essay', count: studetProfile.eassy_submissions_left, disabled: !studetProfile.eassy_submissions_left },
    ]
    return { user, questionTypes }
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
        const quantity = formData.get("question-quantity")!;
        const isPyq = formData.get("question-pyq") as string;

        const files = formData.getAll("question-files");
        
        try {
            const savingData = {
                "question_type": type,
                "questions_submitted": Number(quantity),
                "is_pyq": isPyq === "yes" ? true : false,
                "submitted_by": user?.$id,
                "submission_type": "DRAFT",
            }
            const document = await databases.createDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_QUESTION_SUBMISSION_DB, ID.unique(), savingData);

            for (const file of files) {
                if (file instanceof File) {
                    const fileId = ID.unique();
                    const extension = file.name.split('.').pop();
                    const fileNameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
                    const newFileName = `${fileNameWithoutExtension}_${fileId}.${extension}`;
                    const fileToUpload = new File([file], newFileName, {
                        type: file.type,
                        lastModified: file.lastModified
                    });
                    const uploadedFile = await storage.createFile(PUBLIC_APPWRITE_BUCKET, fileId, fileToUpload);
                    const fileUrl = `${PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${PUBLIC_APPWRITE_BUCKET}/files/${uploadedFile.$id}/view?project=${PUBLIC_APPWRITE_PROJECT}&project=${PUBLIC_APPWRITE_PROJECT}`;
                    await databases.createDocument(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_SUBMITTED_FILES_DB, ID.unique(), {
                        question_submission: document.$id,
                        file_id: uploadedFile.$id,
                        file_url: fileUrl,
                    });
                }
            }
            event.cookies.set('toastMessage', "Submission successful", { path: '/' });

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
