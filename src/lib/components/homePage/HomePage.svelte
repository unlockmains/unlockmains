<script>
	import Background from '../atoms/Background.svelte'
	import HomeSection from './HomeSection.svelte'
	import SmallDetails from './SmallDetails.svelte'

	export let quotes
</script>

<Background />
<HomeSection {quotes} />
<SmallDetails />

<style lang="scss">
</style>
