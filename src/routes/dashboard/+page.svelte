<script lang="ts">
	import { alwaysShow } from '$lib/stores/sideNavStore'
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
