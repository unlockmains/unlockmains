<script lang="ts">
	export let label: string | undefined = undefined
	export let id: string
	export let name: string
	export let type: string
	export let placeholder: string
	export let value: string

	const onChangeNumberInput = (event: Event) => {
		if (type === 'number') {
			const enteredValue = (event.currentTarget as HTMLInputElement).value
			const allNumns = enteredValue.match(/[0-9]/g)
			if (allNumns) value = allNumns.join('')
		}
	}
</script>

{#if label}
	<label for={name}>{label}</label>
{/if}
<input {id} {name} {...{ type }} {placeholder} bind:value on:change={onChangeNumberInput} />

<style lang="scss">
	label {
		text-transform: capitalize;
		display: block;
		margin: 5px 0;
		color: var(--custom-color-secondary);
		font-size: 0.8rem;
	}
	input {
		--height: 4em;
		border: 2px solid var(--color-zinc-700);
		height: var(--height);
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

		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
		&[type='number'] {
			-moz-appearance: textfield;
		}
	}
</style>
