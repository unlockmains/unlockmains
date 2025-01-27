<script lang="ts">
	import HomePage from '$lib/components/homePage/HomePage.svelte'
	export let data
	$: ({ quotes, pricingPbData, sampleFilesToShow } = data)
</script>

<svelte:head>
	<title>Unlock Mains</title>
</svelte:head>

<HomePage {quotes} {pricingPbData} {sampleFilesToShow} />
