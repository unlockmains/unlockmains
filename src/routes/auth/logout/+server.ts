import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { SESSION_COOKIE, SESSION_ID } from '$lib/appwrite'
import { removeUserFromCache } from '../cache';

export const GET: RequestHandler = async ({ locals: { account }, cookies }) => {
      const sessionCookie = cookies.get(SESSION_COOKIE)!;
      try {
            await account.deleteSession(
                  'current'
            );
      } catch (err) {
            console.log("error while logging out", err)
      } finally {
            cookies.delete(SESSION_COOKIE, { path: "/" });
            removeUserFromCache(sessionCookie);
            redirect(303, '/')
      }
}
