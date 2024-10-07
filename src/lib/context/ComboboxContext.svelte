<script context="module" lang="ts">
	export function onClickOutside(element: HTMLElement, callback: Function) {
		const onClick = (event: MouseEvent) => !element.contains(event?.target as Node) && callback()

		document.body.addEventListener('mousedown', onClick)

		return {
			update(newCallback: Function) {
				callback = newCallback
			},

			destroy() {
				document.body.removeEventListener('mousedown', onClick)
			}
		}
	}
</script>

<div class="ui">
	<slot />
</div>

<style>
	.ui :global(*) {
		box-sizing: border-box;
	}

	.ui {
	}

	.ui :global(.visually-hidden) {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	.ui :global(.label) {
		font-weight: bold;
	}

	.ui :global(.icon) {
		width: 24px;
		height: 24px;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
</style>
