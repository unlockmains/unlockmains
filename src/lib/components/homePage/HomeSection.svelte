<script lang="ts">
	import { goto } from '$app/navigation'
	import Button from '../atoms/Button.svelte'
	import Quotes from '../atoms/Quotes.svelte'
	import LottieAnimation from '../atoms/LottieAnimation.svelte'
	export let quotes

	const animationPath = '/lib/lottie/rocket-launch.json'
</script>

<section class="home-section">
	<div class="main-details">
		<div class="main-title">Answer writing made easy with Unlock Mains</div>
		<p class="sub-text">Get your ability validated and verified by interview appeared faculty.</p>
		<Button type="home-register" label="Register" onClick={() => goto('/login')} />
	</div>
	<div class="side-details">
		<div class="rocket">
			<LottieAnimation src={animationPath} loop={true} autoplay={true} />
		</div>
		<p>Launch your Mains dream through us</p>
		<Quotes {quotes} />
	</div>
</section>

<style lang="scss">
	.home-section {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		position: relative;
		user-select: none;
		gap: 5em;
		padding: 5em;
		height: 100%;
		min-height: 100vh;

		.main-details {
			width: 50%;
			display: flex;
			flex-direction: column;
			gap: 1em;

			.main-title {
				font-size: 4em;
				position: relative;
				color: #000;
				font-family: Archivo, sans-serif;
				line-height: 1.2;
				letter-spacing: -0.02em;
				margin-top: 0;
				margin-bottom: 0;
			}
			.sub-text {
				margin-bottom: 0px;
				font-size: 18px;
				line-height: 1.9;
				letter-spacing: -0.02em;
				color: var(--color-zinc-500);
				margin-bottom: 2em;
			}
		}
	}

	.side-details {
		display: flex;
		flex-direction: column;
		width: 50%;
		align-items: center;
		justify-content: space-around;
		background: url('/lib/grid-home.svg') no-repeat center center;
		background-size: contain;

		.rocket {
			width: 80%;
		}

		p {
			position: relative;
			left: 0%;
			font-family: Archivo, Inter, sans-serif;
			font-size: 1.3em;
			font-weight: 400;
			letter-spacing: -0.02em;
		}
	}
</style>
