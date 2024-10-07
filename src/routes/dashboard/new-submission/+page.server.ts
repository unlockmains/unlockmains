import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import type { Actions } from "./$types";

// Make sure this is set to false to allow for form handling
export const prerender = false;

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
    const { session } = await safeGetSession()
    if (!session) {
        redirect(303, '/')
    }

    return { session }
}

export const actions: Actions = {
    default: async (event) => {
        const {
            url,
            request,
            locals: { supabase, safeGetSession }
        } = event;

        let success = false;
        let message = "";
        const user = (await safeGetSession()).user;

        const formData = await request.formData();
        const type = formData.get('question-type') as string;
        const quantity = formData.get("question-quantity")!;
        const isPyq = formData.get("question-pyq") as string;

        const filePromises = [];

        const files = formData.getAll("question-files");
        console.log("files", type, quantity, isPyq, files)
        for (const file of files) {
            if (file instanceof File) {
                filePromises.push(saveFile(file, supabase));
            }
        }

        try {
            const uploadedFiles = await Promise.all(filePromises);
            const { error: dbError } = await supabase.from("question_submissions").upsert({
                question_type: type,
                question_qty: quantity,
                storage_id: uploadedFiles[0]?.id,
                is_pyq: isPyq,
                user_id: user.id
            });

            if (dbError) {
                success = false;
                message = `Failed: Try again in some time! - ${dbError.message}`
            }
            success = true;
            message = ''
        } catch (e) {
            success = false;
            message = `Failed: Try again in some time! - ${(e as Error).message}`
        }

        return fail(400, { success, message });
    }
}

async function saveFile(file: File, supabase: SupabaseClient<any, "public", any>) {
    const { data, error } = await supabase.storage.from('sample-ias').upload(`${uuidv4()}_${file.name}`, file);
    if (error) {
        console.error('File upload error:', error);
        return null;
    }
    return data;
}
