import { fail, redirect, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { createAdminClient, createSessionClient, SESSION_COOKIE } from "$lib/appwrite"

export const load: PageServerLoad = async ({ url, locals: { user } }) => {
  if (user) {
    redirect(303, '/dashboard')
  }

  const userId = url.searchParams.get("id");
  if (!userId) {
    redirect(303, '/login')
  }
  return { url: url.origin, userId }
}

// export const actions: Actions = {
//   default: async (event) => {
//     const {
//       url,
//       request,
//     } = event;
//     const formData = await request.formData()
//     const token = formData.get('token') as string
//     const userId = url.searchParams.get("id")!
//     const { account } = createAdminClient()
//     try {
//       const response = await account.createSession(userId, token)

//       if (!response.$id) {
//         throw new Error('Failed to verify OTP');
//       }
//       console.log("response", response)
//       event.cookies.set('toastMessage', "Ahoy! Verified.", { path: '/' });
//       throw redirect(303, '/dashboard');
//     } catch (error) {
//       console.error('Error verifying OTP:', error);
//       return fail(500, {
//         success: false,
//         message: 'There was an issue. Please contact support.'
//       });
//     }
//   }
// }