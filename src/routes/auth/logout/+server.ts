import { redirect } from '@sveltejs/kit'

import type { RequestHandler } from './$types'
import { SESSION_ID } from '$lib/appwrite'

export const GET: RequestHandler = async ({ locals: { account }, cookies }) => {
      const sessionId = cookies.get(SESSION_ID);
      if (sessionId) {
            await account.deleteSession(
                  sessionId
            );
            redirect(303, '/')
      } else {
            redirect(302, "/dashboard")
      }
}
