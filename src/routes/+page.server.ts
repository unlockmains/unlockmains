import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import PricingCardsData from '$lib/api/mockPlansData.json'

export const load: PageServerLoad = async ({ url, locals: { user } }) => {
  // const user = pocketbase.authStore.model;
  if (user) {
    redirect(303, '/dashboard')
  }

  // const quotes = await pocketbase.collection('quotes').getFullList();

  // const record = await pocketbase.collection('payment_plans_details').getFullList({
  //   expand: "paymentCategory"
  // });

  // console.log("record", record)

  return { url: url.origin, quotes: [], pricingPbData: PricingCardsData }
}