import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals: { user, supabase }, parent }) => {
  if (!user) {
    redirect(303, '/')
  }

  const layoutData = await parent();
  const { data: allPlans } = await supabase.from("pricing_structure").select("*");

  return { user, profile: layoutData.profile ? layoutData.profile : null, allPlans: allPlans }
}