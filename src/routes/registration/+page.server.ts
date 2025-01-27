import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url, locals: { user } }) => {
    console.log("load")
  if (user) {
    redirect(303, '/dashboard')
  }

  return { url: url.origin }
}