import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const ssr = true

export const load: PageServerLoad = async ({ locals: { user, toastMessage } }) => {
    if (!user) {
        redirect(303, '/')
    }

    return { user, toastMessage, userPermission: "STUDENT" }
}