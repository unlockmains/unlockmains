<script lang="ts">
	export let label: string | undefined = undefined
	export let id: string
	export let name: string
	export let type: string
	export let placeholder: string
	export let value: string
	export let style: string = ''
	export let min: number | undefined = undefined
	export let max: number | undefined = undefined
	export let rows: number | undefined = undefined
	export let cols: number | undefined = undefined
	export let disabled: boolean = false

	const onChangeNumberInput = (event: Event) => {
		if (type === 'number') {
			const enteredValue = (event.currentTarget as HTMLInputElement).value
			const allNumns = enteredValue.match(/[0-9]/g)
			if (allNumns) value = allNumns.join('')
		}
	}
</script>

<div class="input-container">
	{#if label}
		<label for={name}>{label}</label>
	{/if}
	{#if type === 'textarea'}
		<textarea
			{id}
			{name}
			{...{ type }}
			{placeholder}
			bind:value
			on:change={onChangeNumberInput}
			{style}
			{rows}
			{cols}
		></textarea>
	{:else}
		<input
			{id}
			{name}
			{...{ type }}
			{placeholder}
			{min}
			{max}
			bind:value
			on:change={onChangeNumberInput}
			{style}
			{disabled}
		/>
	{/if}
</div>

<style lang="scss">
	.input-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		label {
			text-transform: capitalize;
			display: block;
			margin: 5px 0;
			color: var(--custom-color-secondary);
			font-size: 0.8rem;
		}
		input,
		textarea {
			--height: 4em;
			--font-size: 1em;
			--border-size-focus: 3px;
			--border-color-focus: var(--color-zinc-700);
			border: 2px solid var(--color-zinc-700);
			height: var(--height);
			border-radius: 1em;
			padding: 1em;
			font-size: var(--font-size);
			background-color: var(--custom-bg-color);
			width: 100%;

			&:focus-visible {
				border: var(--border-size-focus) solid var(--border-color-focus);
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
			&:disabled {
				cursor: not-allowed;
				background-color: var(--color-zinc-300);
			}
		}
		textarea {
			height: auto;
			resize: none;
		}
	}
</style>
