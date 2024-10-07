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

<slot />
