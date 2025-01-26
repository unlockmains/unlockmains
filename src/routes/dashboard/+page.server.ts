import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const csr = true

export const load: PageServerLoad = async ({ locals: { user } }) => {
    if (!user) {
        redirect(303, '/')
    }

    return { user: null }
}