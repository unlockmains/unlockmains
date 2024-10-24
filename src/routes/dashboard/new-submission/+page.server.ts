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
                saveFormData.append("submitted_file", file)
            }
        }
        saveFormData.append("question_type", type)
        saveFormData.append("no_of_questions", quantity)
        saveFormData.append("is_pyq", isPyq)
        saveFormData.append("submitted_by", user?.id)
        try {
            const createdRecord = await pocketbase.collection('question_submissions').create(saveFormData);
            console.log("createdRecord", createdRecord)

        } catch(err){
            console.log("custom err2", err)
            return fail(400, { success, message });
        }
        
    }
}
