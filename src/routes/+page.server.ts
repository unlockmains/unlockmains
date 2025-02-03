import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import PricingCardsData from '$lib/api/mockPlansData.json'
import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT, PUBLIC_APPWRITE_SAMPLE_FILE_BUCKET } from '$env/static/public'

export const prerender = true;

export const load: PageServerLoad = async ({ url, locals: { user, databases, storage } }) => {
  if (user) {
    redirect(303, '/dashboard')
  }

  const quotesDoc = await databases?.listDocuments(PUBLIC_APPWRITE_DATABASE, '678c9de4000056cd1e18');
  const quotes = quotesDoc.documents.map(doc => doc.quote)
  const sample_files = await storage?.listFiles('6797ad5300336b23d2ce');

  const sampleFilesToShow = sample_files.files.map((file) => {
    return {
      id: file.$id,
      name: file.name,
      url: `${PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${PUBLIC_APPWRITE_SAMPLE_FILE_BUCKET}/files/${file.$id}/view?project=${PUBLIC_APPWRITE_PROJECT}&project=${PUBLIC_APPWRITE_PROJECT}`
    }
  })

  return { url: url.origin, quotes, pricingPbData: PricingCardsData, sampleFilesToShow }
}