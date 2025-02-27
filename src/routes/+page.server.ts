import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import PricingCardsData from '$lib/api/mockPlansData.json'
import quotesData from '$lib/api/quotes.json'
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT, PUBLIC_APPWRITE_SAMPLE_FILE_BUCKET } from '$env/static/public'

export const ssr = true;

export const load: PageServerLoad = async ({ url, locals: { user, storage } }) => {
  if (user) {
    redirect(303, '/dashboard')
  }
  const sample_files = await storage?.listFiles('6797ad5300336b23d2ce');

  // const sampleFilesToShow = sample_files.files.map((file) => {
  //   return {
  //     id: file.$id,
  //     name: file.name,
  //     url: `${PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${PUBLIC_APPWRITE_SAMPLE_FILE_BUCKET}/files/${file.$id}/view?project=${PUBLIC_APPWRITE_PROJECT}&project=${PUBLIC_APPWRITE_PROJECT}`
  //   }
  // })

  return { url: url.origin, quotes: quotesData, pricingPbData: PricingCardsData, sampleFilesToShow: [] }
}