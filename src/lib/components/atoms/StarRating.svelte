<script lang="ts">
	import { fade } from 'svelte/transition'

	export let initialRating = 0
	export let onChange = (rating: number) => {}

	let rating = initialRating
	let hoverRating = 0

	function handleClick(index: number) {
		rating = index
		onChange(index)
	}

	function handleMouseEnter(index: number) {
		hoverRating = index
	}

	function handleMouseLeave() {
		hoverRating = 0
	}
</script>

<div class="star-rating">
	{#each Array(5) as _, i}
		{@const index = i + 1}
		<button
			class="star-button"
			onclick={() => handleClick(index)}
			onmouseenter={() => handleMouseEnter(index)}
			onmouseleave={handleMouseLeave}
			aria-label="Rate {index} stars"
		>
			<svg
				class="star"
				class:active={index <= (hoverRating || rating)}
				viewBox="0 0 24 24"
				transition:fade={{ duration: 200 }}
			>
				<path
					d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
				/>
			</svg>
		</button>
	{/each}
</div>

<style lang="scss">
	.star-rating {
		display: flex;
		gap: 0.5em;

		.star-button {
			background: none;
			border: none;
			padding: 0;
			cursor: pointer;
			transform-origin: center;
			transition: transform 0.2s ease;

			&:hover {
				transform: scale(1.1);
			}

			.star {
				width: 2.375em;
				height: 2.375em;
				fill: none;
				stroke: #d1d5db;
				stroke-width: 2;
				transition: all 0.2s ease;

				&.active {
					fill: #fbbf24;
					stroke: #fbbf24;
				}
			}
		}
	}
</style>
