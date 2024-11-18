<script lang="ts">
	import HomePageIcons from '$lib/components/icons/HomePageIcons.svelte'
	import { onMount } from 'svelte'
	export let data
	$: ({ quotes } = data)

	export let rotationInterval = 6000

	let currentQuoteIndex = 0
	let mounted = false

	onMount(() => {
		mounted = true
		const interval = setInterval(() => {
			currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length
		}, rotationInterval)

		return () => clearInterval(interval)
	})
</script>

<svelte:head>
	<title>Unlock Mains</title>
</svelte:head>

<section class="landing-page">
	<div class="home-page-1">
		<img src="/lib/home-page-1.png" alt="study" />
	</div>
	<div class="main-title">Answer writing made easy with Unlock Mains</div>
	<div class="quote-container">
		{#each quotes as quote, i}
			<div class="quote" class:active={currentQuoteIndex === i && mounted}>
				{quote.quote} <br />- <i style="font-size: 0.75em;">{quote.author}</i>
			</div>
		{/each}
	</div>
	<HomePageIcons type="penpencil" />
	<h2 class="header">Get your ability validated and verified by interview appeared faculty.</h2>
</section>
<section class="more-details">
	<div class="flex row flex-center items-center">
		<div class="col-4 bordered flex flex-center items-center">
			<span class="header">More details</span>
		</div>
		<div class="col-4 bordered flex flex-center items-center">
			<span class="header">More details</span>
		</div>
		<div class="col-4 bordered flex flex-center items-center">
			<span class="header">More details</span>
		</div>
		<div class="col-4 bordered flex flex-center items-center">
			<span class="header">More details</span>
		</div>
	</div>
</section>

<style lang="scss">
	.landing-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		position: relative;

		.home-page-1 {
			position: absolute;
			opacity: 0.5;

			img {
				filter: blur(1px);
			}
		}

		.main-title {
			font-size: 4em;
			font-weight: 700;
			position: relative;
			color: var(--color-orange-700);
			text-align: center;
		}

		.quote-container {
			position: relative;
			width: 70%;
			margin: 50px auto;
			height: 200px;
			display: flex;
			justify-content: center;
			align-items: center;

			.quote {
				position: absolute;
				width: 100%;
				text-align: center;
				opacity: 0;
				transform: translateY(20px);
				font-size: 24px;
				line-height: 1.6;
				font-family: Georgia, serif;
				padding: 20px;
				animation: fadeOut 0.5s ease-out forwards;
				text-shadow: 0px 0px 4px #dc9d9d;

				&.active {
					opacity: 1;
					transform: translateY(0);
					animation: fadeIn 0.5s ease-out forwards;
				}

				&::before,
				&::after {
					content: '"';
					font-size: 80px;
					color: #ddd;
					position: absolute;
					height: 30px;
					line-height: 0;
				}

				&::before {
					left: 0;
					top: 20px;
				}

				&::after {
					right: 0;
					bottom: 0;
				}
			}
		}

		@keyframes fadeIn {
			from {
				opacity: 0;
				transform: translateY(20px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@keyframes fadeOut {
			from {
				opacity: 1;
				transform: translateY(0);
			}
			to {
				opacity: 0;
				transform: translateY(-20px);
			}
		}
	}
	.more-details {
		height: 20vh;

		.row {
			gap: 1em;
		}

		.header {
			font-size: 1.5em;
			font-weight: 700;
			color: var(--color-orange-700);
		}
	}
</style>
