<script lang="ts">
	import type { IPricingStructure, IStudentProfile } from '$lib/types'
	import Pricing from '$lib/components/homePage/Pricing.svelte'
	import PricingCardsData from '$lib/api/mockPlansData.json'

	let { data } = $props<{
		data: { profile: IStudentProfile; allPlans: IPricingStructure[] }
	}>()
</script>

<div class="profile">
	<h1>Plans</h1>
	<div class="separator"></div>
	<div class="active-plan">
		{#if data.profile.free_plan}
			<p class="plan-details"><i>You are currently on the free plan.</i></p>
		{/if}
		{#if data.profile.pricing_structure}
			<p class="plan-details">
				<i>You have an active plan</i> - {data.profile.pricing_structure.plan_code}
			</p>
		{/if}
	</div>
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

		.active-plan {
			display: flex;
			flex-flow: column wrap;
		}

		@media (max-width: 768px) {
			flex-direction: column;
		}
	}
</style>
