import type { LayoutServerLoad } from './$types'
import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_HOME_PAGE_INFO_DB } from '$env/static/public';

export const load: LayoutServerLoad = async ({ locals: { user, databases }, cookies }) => {
  const home_pageInfo = await databases?.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_HOME_PAGE_INFO_DB);
  const top_banner = home_pageInfo.documents[0].top_banner ?? null;

  return {
    user,
    cookies: cookies.getAll(),
    top_banner,
  }
}