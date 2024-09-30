<script lang="ts">
	import { afterUpdate } from 'svelte'

	export let length: number = 6
	export let value: string[]
	let otpInputs: HTMLInputElement[] = []

	afterUpdate(() => {
		for (let i = 0; i < length; i++) {
			if (!Number.isInteger(Number(value[i]))) {
				value[i] = ''
				otpInputs[i].value = ''
			}
		}
		otpInputs.find((otp) => !otp.value)?.focus()
	})

	const handleBackspace = (event: KeyboardEvent, index: number) => {
		if (event.code === 'Backslash' || event.code === 'Backspace' || event.code === 'Backspace') {
			event.preventDefault()
			value[index] = ''
			setTimeout(() => otpInputs[index - 1]?.focus(), 0)
		} else if (Number.isInteger(Number(event.key))) {
			setTimeout(() => otpInputs[index + 1]?.focus(), 0)
		}
	}
</script>

<div class="otp-container">
	{#each [...Array(length).keys()] as index}
		<input
			placeholder={'·'}
			maxlength="1"
			on:keydown={(event) => handleBackspace(event, index)}
			bind:this={otpInputs[index]}
			bind:value={value[index]}
		/>
	{/each}
</div>

<style lang="scss">
	.otp-container {
		display: flex;
		flex-direction: row;
		gap: 20px;
		height: 3em;
		align-items: center;

		input {
			border: 1px solid var(--color-zinc-700);
			height: 2em;
			width: 2em;
			border-radius: 0.25em;
			padding: 0.5em;
			font-size: 1rem;
			background-color: var(--custom-bg-color);
			text-align: center;
			font-weight: 900;

			&:focus-visible {
				border: 2px solid var(--color-zinc-700);
				outline: none;
			}

			&::placeholder {
				color: var(--color-zinc-400);
			}
		}
	}
</style>
