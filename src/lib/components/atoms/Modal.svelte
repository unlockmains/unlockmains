<script lang="ts">
	import { afterUpdate } from 'svelte'
	import CrossIcon from '../icons/CrossIcon.svelte'

	export let showModal: boolean = false

	let dialog: HTMLDialogElement

	afterUpdate(() => {
		if (showModal) dialog.showModal()
	})
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click={(e) => {
		if (e.target === dialog) dialog.close()
	}}
	on:focus|preventDefault
	on:keydown|preventDefault
	on:keypress|preventDefault
>
	<button
		on:click={() => {
			dialog.close()
			showModal = false
		}}><CrossIcon /></button
	>
	<div>
		<slot />
		<!-- svelte-ignore a11y_autofocus -->
		<!-- <button on:click={() => dialog.close()}>close modal</button> -->
	</div>
</dialog>

<style lang="scss">
	dialog {
		border-radius: 0.2em;
		border: none;
		padding: 0;
		border-radius: 1em;
		box-shadow: 0px 4px var(--color-black-600);
		border: 1px solid var(--color-black-600);

		button {
			position: absolute;
			top: 0;
			right: 0;
			padding: 0.5em;
			background-color: transparent;
			border: none;
			cursor: pointer;
			color: var(--color-black-600);
			font-size: 1.5em;
		}
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
		margin: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	button {
		display: block;
	}
</style>
