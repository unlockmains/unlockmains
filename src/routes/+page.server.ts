import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url, locals: { pocketbase } }) => {
  const user = pocketbase.authStore.model;
  if (user) {
    redirect(303, '/dashboard')
  }

  const quotes = await pocketbase.collection('quotes').getFullList();

  return { url: url.origin, quotes }
}