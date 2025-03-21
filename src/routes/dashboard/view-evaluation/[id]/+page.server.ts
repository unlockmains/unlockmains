import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const ssr = false;

export const load: PageServerLoad = async ({ locals: { user } }) => {
    if (!user || user.profile.user_type === 'EVALUATOR') {
        redirect(303, '/dashboard')
    }
    return { user }
}

export const actions: Actions = {

}