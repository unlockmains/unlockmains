import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import PricingCardsData from '$lib/api/mockPlansData.json'
import { PUBLIC_APPWRITE_DATABASE } from '$env/static/public'

export const load: PageServerLoad = async ({ url, locals: { user, databases } }) => {
  if (user) {
    redirect(303, '/dashboard')
  }

  const quotesDoc = await databases?.listDocuments(PUBLIC_APPWRITE_DATABASE, '678c9de4000056cd1e18');
  const quotes  = quotesDoc.documents.map(doc => doc.quote)

  return { url: url.origin, quotes, pricingPbData: PricingCardsData }
}