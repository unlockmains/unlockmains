<script lang="ts">
	import Card from '../atoms/Card.svelte'
</script>

<section class="pricing">
	<div class="heading">
		<h1 class="heading">Our Plans</h1>
		<h4 class="sub-heading">All affordable plans. Choose the one that suits you best.</h4>
	</div>
	<Card />
</section>

<style lang="scss">
	.pricing {
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		align-items: center;
		min-height: 100vh;
		background: url('lib/grid-gradient.svg') no-repeat center center;
		background-size: contain;

		.heading {
			z-index: 20;
			font-family: Archivo, sans-serif;
			line-height: 1.2;
			font-weight: 500;
			letter-spacing: -0.02em;
			text-align: center;

			h1 {
				font-size: 3em;
				margin-bottom: 0.3em;
			}

			h4 {
				font-size: 1em;
				margin-bottom: 1em;
			}
		}
	}
</style>
