<script>
	import Background from '../atoms/Background.svelte'
	import HomeSection from './HomeSection.svelte'
	import Pricing from './Pricing.svelte'
	import SmallDetails from './SmallDetails.svelte'

	export let quotes
</script>

<Background />
<div class="home-page">
	<HomeSection {quotes} />
	<SmallDetails />
	<Pricing />
</div>

<style lang="scss">
	.home-page {
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
