<script lang="ts">
	import { hideTopBanner, topBannerVisible } from '$lib/stores/topBannerStore'
	import CrossIcon from '../icons/CrossIcon.svelte'

	export let bannerText: string = 'This space can be used for banner.'
</script>

<div class="banner" style={$topBannerVisible ? '' : 'display: none;'}>
	<div class="left-banner-img" />
	<span class="text">{bannerText}</span>
	<div class="right-banner-img" />
	<button on:click={hideTopBanner}>
		<CrossIcon />
	</button>
</div>

<style lang="scss">
	.banner {
		background-color: #151514;
		color: white;
		text-align: center;
		align-content: center;
		padding: 1em 5%;
		position: fixed;
		width: 100%;
		z-index: 999;

		.text {
			position: relative;
			font-size: 0.8em;
			z-index: 1000;
		}

		.left-banner-img {
			position: absolute;
			left: 0;
			top: 0;
			width: 25%;
			height: 100%;
			background: url('/lib/banner-bg.svg') no-repeat center center;
			background-size: cover;
			opacity: 0.2;
		}

		.right-banner-img {
			position: absolute;
			right: 0;
			top: 0;
			width: 25%;
			height: 100%;
			background: url('/lib/banner-bg.svg') no-repeat center center;
			background-size: cover;
			transform: scaleX(-1);
			opacity: 0.2;
		}

		button {
			border: none;
			border-radius: 50%;
			outline: none;
			background: var(--color-white-800);
			position: absolute;
			top: 0.75em;
			right: 0;
			width: 3em;
			height: 3em;
			display: flex;
			cursor: pointer;
			justify-content: center;
			align-items: center;
		}
	}
</style>
