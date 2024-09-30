<script lang="ts">
	export let expanded: boolean = false
</script>

<span class:rotate={expanded}>
	<svg viewBox="0 0 16 16" height="12" width="12" fill="none" xmlns="http://www.w3.org/2000/svg"
		><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g>
			<path d="M6 -3.49691e-07L14 8L6 16L4 16L4 -4.37114e-07L6 -3.49691e-07Z" fill="#000000"></path>
		</g></svg
	>
</span>

<style lang="scss">
	span {
		transition: transform 0.2s;
		&.rotate {
			transform: rotateZ(90deg);
		}
	}
</style>
