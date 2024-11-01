import { fail, redirect, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { env } from "$env/dynamic/private"

export const load: PageServerLoad = async ({ url, locals: { pocketbase } }) => {
  const user = pocketbase.authStore.model;
  if (user) {
    redirect(303, '/dashboard')
  }

  const email = url.searchParams.get("email");
  if (!email) {
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
    const token = formData.get('token') as string
    const email = url.searchParams.get("email")!
    try {
      const response = await fetch(`${env.PB_URL}api/otp/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: token })
      });

      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }

      const data = await response.json();

      if (data.token) {
        pocketbase.authStore.save(data.token, data.record)
        return {
          signInOtp: {
            success: true,
            type: "success",
            message: 'Ahoy! Verified.'
          }
        };
      } else {
        return fail(400, {
          success: false,
          message: 'Invalid OTP. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return fail(500, {
        success: false,
        message: 'There was an issue. Please contact support.'
      });
    }
  }
}