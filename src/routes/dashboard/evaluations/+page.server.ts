import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const ssr = false

export const load: PageServerLoad = async ({ locals: { user }, parent }) => {
    if (!user) {
        redirect(303, '/')
    }
    const data = await parent();

    return { user, evaluatorProfile: data.profile?.documents[0] }
}