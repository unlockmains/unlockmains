import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import type { Actions } from "./$types";
import type { AuthModel } from "pocketbase";

// Make sure this is set to false to allow for form handling
export const prerender = false;

export const load: PageServerLoad = async ({ locals: { pocketbase } }) => {
    const user = pocketbase.authStore.model;
    if (!user) {
        redirect(303, '/')
    }

    return { user }
}

export const actions: Actions = {
    default: async (event) => {
        const {
            url,
            request,
            locals: { pocketbase }
        } = event;

        let success = false;
        let message = "";
        const user: AuthModel = pocketbase.authStore.model;

        const formData = await request.formData();
        const type = formData.get('question-type') as string;
        const quantity = formData.get("question-quantity")!;
        const isPyq = formData.get("question-pyq") as string;

        const saveFormData = new FormData();

        const files = formData.getAll("question-files");
        for (const file of files) {
            if (file instanceof File) {
                saveFormData.append("submittedFile", file)
            }
        }
        saveFormData.append("questionType", type)
        saveFormData.append("noOfQuestions", quantity)
        saveFormData.append("isPyq", isPyq)
        saveFormData.append("submittedBy", user?.id)
        try {
            await pocketbase.collection('question_submissions').create(saveFormData);
        } catch(err){
            return fail(400, { success, message });
        }
        
    }
}
