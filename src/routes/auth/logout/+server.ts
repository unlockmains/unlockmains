import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { SESSION_COOKIE, SESSION_ID } from '$lib/appwrite'

export const GET: RequestHandler = async ({ locals: { account }, cookies }) => {
      const sessionId = cookies.get(SESSION_ID);
      if (sessionId) {
            await account.deleteSession(
                  sessionId
            );
            cookies.delete(SESSION_ID, {path: "/"});
            cookies.delete(SESSION_COOKIE,  {path: "/"});
            redirect(303, '/')
      } else {
            redirect(302, "/")
      }
}
