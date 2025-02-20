<script lang="ts">
	import type { IPricingStructure, IStudentProfile, IUser } from '$lib/types'
	import Payment from '$lib/components/profile/Payment.svelte'
	import { getContext } from 'svelte'
	import type { Writable } from 'svelte/store'
	import Pricing from '$lib/components/homePage/Pricing.svelte'
	import PricingCardsData from '$lib/api/mockPlansData.json'

	let { data } = $props<{
		data: { studentProfile: IStudentProfile; allPlans: IPricingStructure[] }
	}>()

	const userStore = getContext<Writable<IUser>>('userStore')
</script>

<div class="profile">
	<Payment user={$userStore} studentProfile={data.profile} allPlans={data.allPlans} />
	<Pricing pricingPbData={PricingCardsData} afterAuth={true} />
</div>

<style lang="scss">
	.profile {
		--header-height: 8em;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		@media (max-width: 768px) {
			flex-direction: column;
		}
	}
</style>
