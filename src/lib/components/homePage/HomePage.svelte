<script>
	import Background from '../atoms/Background.svelte'
	import HomeFaq from './HomeFAQ.svelte'
	import HomeFooter from './HomeFooter.svelte'
	import HomeSection from './HomeSection.svelte'
	import HomeTrialPeriod from './HomeTrialPeriod.svelte'
	import Pricing from './Pricing.svelte'
	import SampleFiles from './SampleFiles.svelte'
	import SmallDetails from './SmallDetails.svelte'
	import Toppers from './Toppers.svelte'

	export let quotes
	export let pricingPbData
	export let sampleFilesToShow
</script>

<Background />
<div class="home-page">
	<HomeSection {quotes} />
	<SmallDetails />
	<Pricing {pricingPbData} />
	<HomeTrialPeriod />
	<SampleFiles {sampleFilesToShow} />
	<!-- <Toppers /> -->
	<HomeFaq />
	<HomeFooter />
</div>

<style lang="scss">
	.home-page {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
