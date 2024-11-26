<script>
	import Background from '../atoms/Background.svelte'
	import HomeSection from './HomeSection.svelte'
	import Pricing from './Pricing.svelte'
	import SmallDetails from './SmallDetails.svelte'

	export let quotes
</script>

<Background />
<HomeSection {quotes} />
<SmallDetails />
<Pricing />

<style lang="scss">
</style>
