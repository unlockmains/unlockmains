<script lang="ts">
	import Spinner from '../icons/Spinner.svelte'
</script>

<div class="backdrop">
	<div class="spinner-container">
		<Spinner />
	</div>
</div>

<style lang="scss">
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5); // Semi-transparent grey backdrop
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.spinner-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
