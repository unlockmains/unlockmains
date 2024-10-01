<script lang="ts">
	export let options: Record<string, string> = {}
</script>

<select>
	{#each Object.entries(options) as [key, value]}
		<option value={key} class="option-select">
			{value}
		</option>
	{/each}
</select>

<style lang="scss">
	select {
		width: 20em;
		height: 3em;
		font-size: 1em;
		display: flex;
		justify-content: center;
		border-radius: 8px;
		padding: 0 1em;

		&:focus {
		}
		.option-select:focus {
			background-color: yellow;
		}
	}
</style>
