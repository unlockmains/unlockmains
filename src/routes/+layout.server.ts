import type { LayoutServerLoad } from './$types'
import { PUBLIC_APPWRITE_DATABASE } from '$env/static/public';

export const load: LayoutServerLoad = async ({ locals: { user, databases }, cookies }) => {
  const home_pageInfo = await databases?.listDocuments(PUBLIC_APPWRITE_DATABASE, '678c9ed500327fa69c7b');
  const top_banner  = home_pageInfo.documents[0].top_banner ?? null;
 
  return {
    user,
    cookies: cookies.getAll(),
    top_banner,
  }
}