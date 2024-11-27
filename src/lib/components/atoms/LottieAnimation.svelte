<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { browser } from '$app/environment'

	export let src
	export let loop = true
	export let autoplay = true
	export let rendererType = 'svg'

	let container: HTMLDivElement
	let animation: any

	onMount(() => {
		if (browser) {
			import('lottie-web').then((lottie) => {
				animation = lottie.loadAnimation({
					container,
					renderer: rendererType,
					loop,
					autoplay,
					path: src
				})
			})
		}
	})

	onDestroy(() => {
		if (animation) {
			animation.destroy()
		}
	})

	export function play() {
		animation?.play()
	}

	export function pause() {
		animation?.pause()
	}

	export function stop() {
		animation?.stop()
	}
</script>

<div bind:this={container} class="lottie-container"></div>

<style>
	.lottie-container {
		width: 100%;
		height: 100%;
	}
</style>
