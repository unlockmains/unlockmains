import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const csr = true;

export const load: PageServerLoad = async ({ locals: { user } }) => {
    if (!user || user.profile.user_type === 'STUDENT') {
        redirect(303, '/dashboard')
    }
    return { user }
}