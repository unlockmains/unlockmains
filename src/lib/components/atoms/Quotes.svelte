<script lang="ts">
	import type { RecordModel } from 'pocketbase'
	import { onMount } from 'svelte'

	export let quotes: RecordModel[]

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

<div class="quote-container">
	{#each quotes as quote, i}
		<div class="quote" class:active={currentQuoteIndex === i && mounted}>
			{quote.quote} <br />- <i style="font-size: 0.75em;">{quote.author}</i>
		</div>
	{/each}
</div>

<style lang="scss">
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
</style>
