import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { user } }) => {
  if (!user) {
    redirect(303, '/')
  }

  return { profile: user }
}

export const actions: Actions = {
  update: async ({ request, locals: { databases } }) => {
    const formData = await request.formData()
    const fullName = formData.get('fullName') as string
    const username = formData.get('username') as string
    const website = formData.get('website') as string
    const avatarUrl = formData.get('avatarUrl') as string

    const user = {id: '1'};

    // const { error } = await databases.collection('user').update(
    //   user?.id,
    //   {
    //   fullName: fullName,
    //   username,
    //   avatar: avatarUrl
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
  signout: async ({ locals: { account } }) => {
    await account.deleteSession('current')
    redirect(303, '/')
  },
}
