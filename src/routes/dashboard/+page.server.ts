import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const csr = true

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
    const { session } = await safeGetSession()
    if (!session) {
        redirect(303, '/')
    }

    return { session }
}