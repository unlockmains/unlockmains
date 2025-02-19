<script lang="ts">
	export let rating = 0
	export let maxRating = 5
	export let readonly = false

	function handleClick(index: number) {
		if (!readonly) {
			rating = index + 1
		}
	}
</script>

<div class="star-rating">
	{#each Array(maxRating) as _, i}
		<span
			onclick={() => handleClick(i)}
			class="star"
			class:filled={i < rating}
			aria-label={i < rating ? 'Filled star' : 'Empty star'}
			role="button"
			tabindex={readonly ? -1 : 0}
		>
			&#9733;
		</span>
	{/each}
</div>

<style lang="scss">
	.star-rating {
		display: inline-flex;
		.star {
			font-size: 3em;
			color: #ddd;
			cursor: pointer;
			&.filled {
				color: #ffd700;
			}

			&:hover {
				color: #ffd700;
			}

			&:focus {
				outline: none;
			}
		}
	}
</style>
