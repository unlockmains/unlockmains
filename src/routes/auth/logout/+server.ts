import { redirect } from '@sveltejs/kit'

import type { RequestHandler } from './$types'

export const GET: RequestHandler = async ({ locals: { pocketbase } }) => {
      pocketbase.authStore.clear();
      redirect(303, '/')
}
