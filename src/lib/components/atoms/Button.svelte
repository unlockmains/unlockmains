<script lang="ts">
	export let label: string
	export let type: 'default' | 'google-login' | 'email-login' | 'register' | 'link' = 'default'
	export let onClick: (event: MouseEvent) => void = () => {}
	export let withLoader: boolean = false
	export let disabled: boolean = false
</script>

<button on:click={onClick} class={type} {disabled}>
	{#if withLoader}
		<span class="loader" />
	{/if}
	<slot />
	{label}
</button>

<style lang="scss">
	button {
		--btn-width: 6em;
		--btn-height: 2.5em;
		--btn-background: whitesmoke;
		--btn-background-hover: #fff;
		--btn-outline: none;
		--btn-color: rgb(65, 64, 64);
		--btn-radius: 1em;
		--btn-box-color: rgb(199, 197, 197);
		--btn-border: 2px solid var(--btn-box-color);
		--btn-box-shadow: 0 4px 0 var(--btn-box-color);
		width: var(--btn-width);
		height: var(--btn-height);
		background: var(--btn-background);
		border-radius: var(--btn-radius);
		border: var(--btn-border);
		outline: var(--btn-outline);
		color: var(--btn-color);
		box-shadow: var(--btn-box-shadow);
		display: flex;
		align-items: center;
		gap: 0.5em;
		justify-content: center;
		position: relative;
		font-weight: 500;
		font-size: 1em;

		&:hover {
			transition: all 0.1s ease-in;
			background: var(--btn-background-hover);
			cursor: pointer;
		}

		&:active {
			transform: translateY(4px);
			box-shadow: none;
		}

		.loader {
			width: 17px;
			height: 8px;
			border-radius: 8px;
			background-color: var(--btn-box-color);
			position: absolute;
			left: 10px;
			animation: spin 1s linear infinite;
		}

		&.google-login {
			--btn-width: 16em;
			--btn-height: 3em;
			--btn-background: whitesmoke;
			--btn-color: #000;
			--btn-box-color: rgb(147, 147, 227);
		}

		&.email-login {
			--btn-width: 100%;
			--btn-height: 3em;
			--btn-background: rgb(253, 232, 110);
			--btn-background-hover: rgb(251, 228, 100);
			--btn-color: #000;
			--btn-box-color: rgb(243, 211, 0);
		}

		&.register {
			--btn-width: 100%;
			--btn-height: 3em;
			--btn-background: rgb(110, 229, 253);
			--btn-background-hover: rgb(100, 206, 251);
			--btn-color: #000;
			--btn-box-color: rgb(0, 198, 243);
		}

		&.link {
			--btn-width: 6em;
			--btn-height: 2em;
			--btn-background: transparent;
			--btn-background-hover: transparent;
			--btn-color: #0158fa;
			--btn-box-color: transparent;
			font-weight: 700;
			font-size: 0.875em;

			&:hover {
				text-decoration: underline;
			}
		}

		&:disabled {
			cursor: not-allowed;
			--btn-background: var(--color-zinc-400);
			--btn-background-hover: var(--color-zinc-400);
			--btn-box-color: var(--color-zinc-700);
			--btn-color: #fff;

			&:active {
				transform: translateY(0);
				box-shadow: var(--btn-box-shadow);
			}
		}

		@keyframes spin {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}
	}
</style>
