import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { pocketbase } }) => {
  const user = pocketbase.authStore.model;
  if (!user) {
    redirect(303, '/')
  }

  return { profile: user }
}

export const actions: Actions = {
  update: async ({ request, locals: { pocketbase } }) => {
    const formData = await request.formData()
    const fullName = formData.get('fullName') as string
    const username = formData.get('username') as string
    const website = formData.get('website') as string
    const avatarUrl = formData.get('avatarUrl') as string

    const user = pocketbase.authStore.model;

    // const { error } = await supabase.from('profiles').upsert({
    //   id: session?.user.id,
    //   full_name: fullName,
    //   username,
    //   website,
    //   avatar_url: avatarUrl,
    //   updated_at: new Date(),
    // })

    // if (error) {
    //   return fail(500, {
    //     fullName,
    //     username,
    //     website,
    //     avatarUrl,
    //   })
    // }

    // return {
    //   fullName,
    //   username,
    //   website,
    //   avatarUrl,
    // }
  },
  signout: async ({ locals: { pocketbase } }) => {
    pocketbase.authStore.clear();
    redirect(303, '/')
  },
}
