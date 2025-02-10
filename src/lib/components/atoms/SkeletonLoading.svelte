<script>
	export let width = '100%'
	export let height = '20px'
	export let borderRadius = '4px'
	export let animate = true
</script>

<div
	class="skeleton {animate ? 'animate' : ''}"
	style="width: {width}; height: {height}; border-radius: {borderRadius};"
></div>

<style>
	.skeleton {
		background: var(--color-zinc-300);
		position: relative;
		overflow: hidden;
	}

	.skeleton::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transform: translateX(-100%);
		background-image: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0) 0,
			rgba(255, 255, 255, 0.2) 30%,
			rgba(255, 255, 255, 0.7) 60%,
			rgba(255, 255, 255, 0)
		);
	}

	.animate::after {
		animation: shimmer 2s infinite;
	}

	@keyframes shimmer {
		100% {
			transform: translateX(100%);
		}
	}
</style>
