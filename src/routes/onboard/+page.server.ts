import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url, locals: { user } }) => {
  if (user) {
    redirect(303, '/dashboard')
  }

  return { url: url.origin }
}