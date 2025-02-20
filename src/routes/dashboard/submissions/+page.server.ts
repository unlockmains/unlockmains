import type { PageServerLoad } from "./$types"
import { redirect } from "@sveltejs/kit";

export const ssr = false

export const load: PageServerLoad = async ({ locals: { databases, user }, parent }) => {
    if (!user) {
        redirect(303, '/')
    }
    const data = await parent();

    return { user, studentProfile: data.profile?.documents[0] }
}