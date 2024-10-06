import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import type { SupabaseClient } from "@supabase/supabase-js";

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
            locals: { supabase }
        } = event;

        const formData = await request.formData();
        const type = formData.get('question-type') as string;
        const quantity = formData.get("question-quantity")!;
        const isPyq = formData.get("question-pyq") as string;

        // Prepare an array to hold the file upload promises
        const filePromises = [];

        // Handle file uploads
        const files = formData.getAll("question-files");
        console.log("files", type, quantity, isPyq, files)
        for (const file of files) {
            if (file instanceof File) {
                // You might want to implement a utility function for saving files
                filePromises.push(saveFile(file, supabase));
            }
        }

        // Wait for all file uploads to complete
        const uploadedFiles = await Promise.all(filePromises);

        // Log or process the uploaded files
        console.log("Uploaded Files:", uploadedFiles);

        // You can add further processing here (e.g., save to database)

        return { success: true }; // Return success or failure state
    }
}

// Utility function to save the file
async function saveFile(file: File, supabase: SupabaseClient<any, "public", any>) {
    const { data, error } = await supabase.storage.from('sample-ias').upload(`upload-test/${file.name}`, file);
    if (error) {
        console.error('File upload error:', error);
        return null;
    }
    return data; // Return the uploaded file's metadata or URL
}
