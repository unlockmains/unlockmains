import { fail, redirect, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import type { EmailOtpType } from "@supabase/supabase-js"

export const load: PageServerLoad = async ({ url, locals: { user } }) => {
  if (user) {
    redirect(303, '/dashboard')
  }

  const searchParams = url.searchParams;
  if (!searchParams.get("email")) {
    redirect(303, '/login')
  }
  return { url: url.origin }
}

export const actions: Actions = {
  default: async (event) => {
    const {
      url,
      request,
      locals: { pocketbase }
    } = event;
    const formData = await request.formData()
    const searchParams = url.searchParams;
    const token = formData.get('token') as string
    const email = searchParams.get("email")!
    const type = searchParams.get("type") as EmailOtpType ?? "magiclink"
/* 
    const { error } = await pocketbase.collection("users").auth({
      email,
      token,
      type
    });

    if (error) {
      return fail(400, {
        success: false,
        message: `There was an issue, Please contact support. ${error.message}`
      })
    }

    return {
      signInOtp: {
        success: true,
        type: "success",
        message: 'Ahoy! Verified.'
      }
    } */
  }
}