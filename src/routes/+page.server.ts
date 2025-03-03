import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import PricingCardsData from '$lib/api/mockPlansData.json'
import quotesData from '$lib/api/quotes.json'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'

export const ssr = true;

export const load: PageServerLoad = async ({ url, locals: { user, supabase } }) => {
  if (user) {
    redirect(303, '/dashboard')
  }
  const { data: sampleFilesData } = await supabase.storage.from("sample_files").list("active");

  const sampleFilesToShow = sampleFilesData
    ? sampleFilesData.filter(file => file.metadata.mimetype.includes("pdf"))
      .map((file) => {
        return {
          id: file.id,
          name: file.name,
          url: `${PUBLIC_SUPABASE_URL}storage/v1/object/public/sample_files/${file.name}?t=${file.last_accessed_at}`
        }
      }) : []

  return { url: url.origin, quotes: quotesData, pricingPbData: PricingCardsData, sampleFilesToShow }
}