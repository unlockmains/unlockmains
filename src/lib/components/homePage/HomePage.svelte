<script>
	import Background from '../atoms/Background.svelte'
	import HomeFaq from './HomeFAQ.svelte'
	import HomeFooter from './HomeFooter.svelte'
	import HomeSection from './HomeSection.svelte'
	import Pricing from './Pricing.svelte'
	import SmallDetails from './SmallDetails.svelte'
	import Toppers from './Toppers.svelte'

	export let quotes
	export let pricingPbData
</script>

<Background />
<div class="home-page">
	<HomeSection {quotes} />
	<SmallDetails />
	<Pricing {pricingPbData} />
	<Toppers />
	<HomeFaq />
	<HomeFooter />
</div>

<style lang="scss">
	.home-page {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
