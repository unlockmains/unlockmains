<script>
	import Background from '$lib/components/atoms/Background.svelte'
	import Pricing from '$lib/components/homePage/Pricing.svelte'
	import PricingCardsData from '$lib/api/mockPlansData.json'
	import HomeFooter from '$lib/components/homePage/HomeFooter.svelte'
</script>

<Background />
<Pricing pricingPbData={PricingCardsData} />
<HomeFooter />

<style lang="scss">
	.careers-page {
		max-width: 1200px;
		margin: 0 auto;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;
	}
</style>
