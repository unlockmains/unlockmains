import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { Actions } from "./$types";
import { ID, Query } from "node-appwrite";
import { PUBLIC_APPWRITE_BUCKET, PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from "$env/static/public";
import { PUBLCI_APPWRITE_STUDENT_PROFILE_DB } from "$env/static/private";

export const prerender = false;

export const load: PageServerLoad = async ({ locals: { user, databases } }) => {
    if (!user) {
        redirect(303, '/')
    }

    const studentDocument = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLCI_APPWRITE_STUDENT_PROFILE_DB, [Query.equal("user_id", user?.$id)]);
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
        const file = files[0] as File

        try {
            const uploadedFile = await storage.createFile(PUBLIC_APPWRITE_BUCKET, ID.unique(), file);
            const fileUrl = `${PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${PUBLIC_APPWRITE_BUCKET}/files/${uploadedFile.$id}/view?project=${PUBLIC_APPWRITE_PROJECT}&project=${PUBLIC_APPWRITE_PROJECT}&mode=admin`;
            const savingData = {
                "question_type": type,
                "questions_submitted": Number(quantity),
                "is_pyq": isPyq === "yes" ? true : false,
                "submitted_by": user?.$id,
                "submission_type": "DRAFT",
                "file_url": fileUrl,
                "file_id": uploadedFile.$id,
            }
            const document = await databases.createDocument(PUBLIC_APPWRITE_DATABASE, '678c9d1e0029d8232760', ID.unique(), savingData);
            return redirect(303, "/dashboard");
        } catch (err) {
            console.log("error", err)
            message = (err as unknown as Error).message;
            return fail(400, { success, message });
        }
    }
}
