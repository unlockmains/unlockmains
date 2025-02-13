<script lang="ts">
	export let length: number = 6
	export let value: string
</script>

<div class="otp-container">
	<input type="text" bind:value max={length} min={0} maxlength={length} placeholder=". . . . . ." />
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
			height: 3em;
			width: 20em;
			border-radius: 0.5em;
			padding: 0.5em;
			font-size: 1rem;
			background-color: var(--custom-bg-color);
			text-align: center;
			font-weight: 900;
			letter-spacing: 12px;

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
