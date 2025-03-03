import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ locals: { supabase }, cookies }) => {
      try {
            await supabase.auth.signOut()
      } catch (err) {
            console.log("error while logging out", err)
      } finally {
            redirect(303, '/')
      }
}
