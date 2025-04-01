import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession, supabase }, cookies }) => {
  const { session, user } = await safeGetSession()
  let top_banner = "Launching Soon with exciting offers."
  let plans = {};
  try {
    const { data, error } = await supabase.from('home_page')
      .select('*')
    console.log("data", data, error)
    if (data) {
      top_banner = data[0]?.top_banner
      plans = data[0]?.plans

    }
  } catch (error) {
    console.error('Error fetching home page info:', error);
  }

  return {
    user,
    session,
    cookies: cookies.getAll(),
    top_banner,
  }
}