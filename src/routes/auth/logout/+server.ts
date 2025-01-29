import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { SESSION_COOKIE, SESSION_ID } from '$lib/appwrite'

export const GET: RequestHandler = async ({ locals: { account }, cookies }) => {
      await account.deleteSession(
            'current'
      );
      cookies.delete(SESSION_COOKIE, { path: "/" });
      redirect(303, '/')

}
