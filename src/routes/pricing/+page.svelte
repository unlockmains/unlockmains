<script>
	import Background from '$lib/components/atoms/Background.svelte'
	import Pricing from '$lib/components/homePage/Pricing.svelte'
	import PricingCardsData from '$lib/api/mockPlansData.json'
	import HomeFooter from '$lib/components/homePage/HomeFooter.svelte'
</script>

<svelte:head>
	<title>Pricing - Unlock Mains</title>
	<meta
		name="description"
		content="Get to know about our competitive pricing for your Mains/Civil Services qualifications."
	/>
	<meta property="og:title" content="Contact Us" />
	<meta
		property="og:description"
		content="Get to know about our competitive pricing for your Mains/Civil Services qualifications."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://unlockmains.com/pricing" />
</svelte:head>

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
