<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { browser } from '$app/environment'

	export let src: string
	export let loop = true
	export let autoplay = true
	export let rendererType: 'svg' | 'canvas' | 'html' = 'svg'

	let container: HTMLDivElement
	let animation: any

	const preloadAnimation = async () => {
		try {
			const response = await fetch(src)
			return await response.json()
		} catch (error) {
			console.error('Failed to preload animation:', error)
		}
	}

	onMount(async () => {
		if (!browser) return
		const lottie = (await import('lottie-web')).default
		const animationData = await preloadAnimation()

		animation = lottie.loadAnimation({
			container,
			renderer: rendererType,
			loop,
			autoplay,
			...(animationData ? { animationData } : { path: src })
		})
	})

	onDestroy(() => {
		if (browser && animation) {
			animation.destroy()
		}
	})

	export function play() {
		if (browser) animation?.play()
	}

	export function pause() {
		if (browser) animation?.pause()
	}

	export function stop() {
		if (browser) animation?.stop()
	}
</script>

<div bind:this={container} class="lottie-container"></div>

<style>
	.lottie-container {
		width: 100%;
		height: 100%;
	}
</style>
