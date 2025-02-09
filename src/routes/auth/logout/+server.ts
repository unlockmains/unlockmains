import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { SESSION_COOKIE, SESSION_ID } from '$lib/appwrite'
import { authStore } from '$lib/stores/userStore';

export const GET: RequestHandler = async ({ locals: { account }, cookies }) => {
      try {
            await account.deleteSession(
                  'current'
            );
      } catch (err) {
            console.log("error while logging out", err)
      } finally {
            cookies.delete(SESSION_COOKIE, { path: "/" });
            authStore.clearAuth();
            redirect(303, '/')
      }
}
