import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const csr = true

export const load: PageServerLoad = async ({ locals: { pocketbase } }) => {
    // const user = pocketbase.authStore.model;
    // if (!user) {
    //     redirect(303, '/')
    // }

    return { user: null }
}