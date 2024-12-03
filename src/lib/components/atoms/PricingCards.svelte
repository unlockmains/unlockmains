<script lang="ts">
	import Button from './Button.svelte'

	export let pricingCardData

	console.log('pricingCardData', pricingCardData)
</script>

<div class="cards">
	{#each pricingCardData as { name, color, price, duration, features }}
		<div class="card">
			<div class="pricing-name" style={`--bg-color: ${color}`}>{name}</div>
			<div class="pricing-price">
				<span class="rupee">₹</span><span class="money">{price}</span>
				<span class="duration">/ {duration}</span>
			</div>
			<div class="pricing-divider" />
			<div class="pricing-features">
				<div class="title">Features</div>
				{#each features as { icon, title, strikethrough }}
					<div class="feature">
						<img src={icon} alt="icon" />
						<span style={strikethrough ? 'text-decoration: line-through;' : ''}>{title}</span>
					</div>
				{/each}
			</div>
			<Button type="home-register" label="Register" />
		</div>
	{/each}
</div>

<style lang="scss">
	.cards {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-evenly;
		align-items: flex-start;
		width: 100%;

		.card {
			border: 1px solid black;
			width: auto;
			height: 100%;
			z-index: 1;
			margin-bottom: 1em;
			display: flex;
			flex-direction: column;
			padding: 2em;
			gap: 2em;
			border-radius: 1em;
			background: var(--custom-bg-color);
			box-shadow: 0 10px 0 0 rgba(0, 0, 0, 1);

			.pricing-name {
				border: 1px solid black;
				font-size: 0.8em;
				font-weight: 500;
				padding: 0.5em 1em;
				text-align: center;
				background: var(--bg-color);
				text-transform: uppercase;
				border-radius: 9999px;
				width: fit-content;
			}

			.pricing-price {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				gap: 1em;

				.rupee {
					font-size: 2.4em;
					font-weight: 600;
				}

				.money {
					font-size: 2.4em;
					font-weight: 600;
				}

				.duration {
					font-size: 1em;
					color: var(--primary-color);
					text-transform: uppercase;
				}
			}

			.pricing-divider {
				height: 1px;
				margin-top: 0.5em;
				margin-bottom: 0;
				background-color: #ebebeb;
			}

			.pricing-features {
				display: flex;
				flex-direction: column;
				gap: 1em;

				.title {
					font-size: 0.8em;
					font-weight: 600;
					margin-bottom: 0.5em;
				}

				.feature {
					display: flex;
					gap: 1em;
					align-items: center;
				}
			}
		}
	}
</style>
