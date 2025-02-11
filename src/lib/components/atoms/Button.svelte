<script lang="ts">
	export let label: string
	export let type:
		| 'default'
		| 'google-login'
		| 'email-login'
		| 'register'
		| 'link'
		| 'nav'
		| 'submit'
		| 'home-register'
		| 'next'
		| 'back'
		| 'view' = 'default'
	export let onClick: (event: MouseEvent) => void = () => {}
	export let withLoader: boolean = false
	export let disabled: boolean = false
	export let style: string = ''
</script>

<button on:click={onClick} class={type} {disabled} {style}>
	{#if withLoader}
		<span class="loader"></span>
	{/if}
	<slot />
	{label}
</button>

<style lang="scss">
	button {
		--btn-width: 6em;
		--btn-height: 2.5em;
		--btn-background: var(--color-white-800);
		--btn-background-hover: var(--color-white-900);
		--btn-outline: none;
		--btn-color: var(--color-zinc-800);
		--btn-radius: 1em;
		--btn-box-color: var(--color-zinc-300);
		--btn-border: 2px solid var(--btn-box-color);
		--btn-box-shadow: 0 4px 0 var(--btn-box-color);
		--btn-font-weight: 500;
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
		font-weight: var(--btn-font-weight);
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
			--btn-background: var(--color-white-800);
			--btn-color: var(--color-black-900);
			--btn-box-color: var(--color-purple-400);
		}

		&.email-login {
			--btn-width: 100%;
			--btn-height: 3em;
			--btn-background: var(--color-yellow-100);
			--btn-background-hover: var(--color-yellow-200);
			--btn-color: var(--color-black-900);
			--btn-box-color: var(--color-yellow-500);
		}

		&.register {
			--btn-width: 100%;
			--btn-height: 3em;
			--btn-background: var(--color-cyan-100);
			--btn-background-hover: var(--color-cyan-300);
			--btn-color: var(--color-black-900);
			--btn-box-color: var(--color-cyan-700);
		}

		&.link {
			--btn-width: 6em;
			--btn-height: 2em;
			--btn-background: transparent;
			--btn-background-hover: transparent;
			--btn-color: var(--color-blue-800);
			--btn-box-color: transparent;
			font-weight: 700;
			font-size: 0.875em;

			&:hover {
				text-decoration: underline;
			}
		}

		&.nav {
			--btn-width: 100%;
			--btn-height: 3em;
			--btn-background: var(--color-zinc-300);
			--btn-background-hover: var(--color-zincß-400);
			--btn-color: var(--color-black-900);
			--btn-box-color: var(--color-zinc-700);
		}

		&.submit {
			--btn-width: 10em;
			--btn-height: 3em;
			--btn-background: var(--color-gold-400);
			--btn-background-hover: var(--color-gold-600);
			--btn-color: var(--color-black-900);
			--btn-box-color: var(--color-gold-800);
		}

		&.home-register {
			--btn-width: 100%;
			--btn-height: 3em;
			--btn-background: var(--color-purple-300);
			--btn-background-hover: var(--color-purple-400);
			--btn-color: var(--color-black-900);
			--btn-box-color: var(--color-black-900);
			--btn-font-weight: 400;
		}

		&.next {
			--btn-width: 10em;
			--btn-height: 3em;
			--btn-background: var(--color-purple-300);
			--btn-background-hover: var(--color-purple-400);
			--btn-color: var(--color-black-900);
			--btn-box-color: var(--color-black-900);
			--btn-font-weight: 400;
		}

		&.back {
			--btn-width: 10em;
			--btn-height: 3em;
			--btn-background: var(--color-white-800);
			--btn-background-hover: var(--color-white-900);
			--btn-color: var(--color-zinc-800);
			--btn-box-color: var(--color-black-900);
			--btn-font-weight: 400;
		}

		&.view {
			--btn-width: 10em;
			--btn-height: 3em;
			--btn-background: var(--color-peach-200);
			--btn-background-hover: var(--color-peach-300);
			--btn-color: var(--color-black-900);
			--btn-box-color: var(--color-black-900);
			--btn-font-weight: 400;
		}

		&:disabled {
			cursor: not-allowed;
			--btn-background: var(--color-zinc-400) !important;
			--btn-background-hover: var(--color-zinc-400) !important;
			--btn-box-color: var(--color-zinc-700) !important;
			--btn-color: var(--color-white-900) !important;

			&:active {
				transform: translateY(0) !important;
				box-shadow: var(--btn-box-shadow) !important;
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
