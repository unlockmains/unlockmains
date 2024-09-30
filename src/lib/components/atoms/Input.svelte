<script lang="ts">
	export let label: string | undefined = undefined
	export let id: string
	export let name: string
	export let type: string
	export let placeholder: string
	export let value: string
</script>

{#if label}
	<label for={name}>{label}</label>
{/if}
<input {id} {name} {...{ type }} {placeholder} bind:value />

<style lang="scss">
	label {
		text-transform: capitalize;
		color: grey;
		display: block;
		margin: 5px 0;
		color: var(--custom-color-secondary);
		font-size: 0.8rem;
	}
	input {
		border: 2px solid var(--color-zinc-700);
		height: 4em;
		border-radius: 1em;
		padding: 1em;
		font-size: 1rem;
		background-color: var(--custom-bg-color);
		width: 100%;

		&:focus-visible {
			border: 3px solid var(--color-zinc-700);
			outline: none;
		}

		&::placeholder {
			color: var(--color-zinc-400);
		}
	}
</style>
