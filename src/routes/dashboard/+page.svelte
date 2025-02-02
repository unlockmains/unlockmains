<script lang="ts">
	import { alwaysShow } from '$lib/stores/sideNavStore'
	import { onMount } from 'svelte'
	import { toast } from 'svelte-sonner'

	let { data } = $props<{
		data: {
			toastMessage: string | undefined
		}
	}>()

	$effect(() => {
		if (data.toastMessage) {
			toast.success(data.toastMessage)
		}
	})
</script>

<main class:sideBarSpace={$alwaysShow}>
	<h1>Dashboard</h1>
</main>

<style lang="scss">
	main {
		margin: 0 2rem;

		&.sideBarSpace {
			margin-left: max(15rem + 1rem, 15% + 1rem);
		}
	}
</style>
