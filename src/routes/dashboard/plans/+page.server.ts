import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_PRICING_STRUCTURE, PUBLIC_APPWRITE_STUDENT_PROFILE_DB } from '$env/static/public'

export const load: PageServerLoad = async ({ locals: { user, databases }, parent }) => {
  if (!user) {
    redirect(303, '/')
  }

  const layoutData = await parent();
  const allPlans = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_PRICING_STRUCTURE);

  return { user, profile: layoutData.profile ? layoutData.profile.documents[0] : null, allPlans: allPlans.documents }
}