<script lang="ts">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import Button from './Button.svelte'

	let { pricingCardData, selectedOption, afterAuth = false } = $props()

	const currentYear = new Date().getFullYear()
	const nextYear = currentYear + 1

	const selectPlan = (planCode: string) => {
		if (afterAuth) {
			browser && sessionStorage.setItem('plan', planCode)
			goto(`/dashboard/profile`)
		}
		browser && sessionStorage.setItem('plan', planCode)
	}
</script>

<div class="cards">
	{#each pricingCardData as { name, color, currentPrice, originalPrice, duration, features, planCode, popular }}
		<div class="card">
			{#if popular}
				<div class="most-popular-plan">Most Popular Plan</div>
			{/if}
			<div class="plan-code">{planCode}</div>
			<div class="pricing-name" style={`--bg-color: ${color}`}>
				{name
					.replace('{year}', currentYear)
					.replace('{year+1}', nextYear)
					.replace('{option}', selectedOption)}
			</div>
			<div>
				<div class="pricing-price">
					<span class="rupee">₹</span><span class="money">{currentPrice}</span>
					<span class="duration">/ {duration}</span>
				</div>
				<div class="original-price">
					<span class="discount"
						>{(((originalPrice - currentPrice) / originalPrice) * 100).toFixed(0)}% OFF</span
					>
					<span class="rupee">₹</span><span class="money">{originalPrice}</span>
					<span class="duration">/ {duration}</span>
				</div>
			</div>
			<div class="pricing-divider"></div>
			<div class="pricing-features">
				<div class="title">Features</div>
				{#each features as feature}
					<div class="feature">
						<img src={`${afterAuth ? '../' : ''}lib/feature-yes.svg`} alt="icon" />
						<span>{feature.replace('{year}', currentYear).replace('{year+1}', nextYear)}</span>
					</div>
				{/each}
			</div>
			<Button type="home-register" label="Select Plan" onClick={() => selectPlan(planCode)} />
		</div>
	{/each}
</div>

<style lang="scss">
	.cards {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: flex-start;
		width: 100%;
		gap: 2em;

		.card {
			border: 1px solid black;
			width: 30%;
			height: 100%;
			z-index: 1;
			margin-bottom: 1em;
			display: flex;
			flex-direction: column;
			padding: 1em;
			gap: 2em;
			border-radius: 1em;
			background: var(--custom-bg-color);
			box-shadow: 0 10px 0 0 rgba(0, 0, 0, 1);
			position: relative;

			.most-popular-plan {
				color: white;
				font-weight: bold;
				display: inline-block;
				font-size: 0.8em;
				height: 2em;
				padding: 0.2em 0.5em;
				position: absolute;
				top: -1em;
				left: 0.5em;
				border-radius: 0.5em;
				background: rgb(2, 0, 36);
				background: linear-gradient(
					90deg,
					rgba(2, 0, 36, 0.5788690476) 0%,
					rgb(216 48 78 / 91%) 35%,
					rgb(57 13 13 / 83%) 100%
				);
				animation: change-color 1s ease-in-out infinite;
				background-size: 400% 400%;

				@keyframes change-color {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}
			}

			.plan-code {
				background: #ffd700;
				color: black;
				text-align: center;
				font-size: 0.8em;
				height: 2em;
				padding: 0 1em;
				position: absolute;
				top: -1em;
				right: 0.5em;
				border-radius: 0.5em;
				clip-path: polygon(0% 0%, 5% 50%, 0% 100%, 100% 100%, 95% 50%, 100% 0%);
				display: flex;
				align-items: center;
			}

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
				gap: 0.5em;

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

			.original-price {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				gap: 0.5em;
				color: var(--color-zinc-500);
				font-style: italic;

				.discount {
					font-style: normal;
					color: var(--color-green-700);
					font-weight: bolder;
				}

				.rupee {
					font-size: 1em;
					font-weight: 600;
				}

				.money {
					text-decoration: line-through;
					font-size: 1em;
					font-weight: 600;
				}

				.duration {
					font-size: 0.8em;
					color: var(--primary-color);
					text-transform: uppercase;
				}
			}

			.pricing-divider {
				height: 1px;
				margin-top: 0.5em;
				margin-bottom: 0;
				background-color: var(--color-white-600);
			}

			.pricing-features {
				display: flex;
				flex-direction: column;
				gap: 0.5em;

				.title {
					font-size: 0.8em;
					font-weight: 600;
					margin-bottom: 0.5em;
				}

				.feature {
					display: flex;
					gap: 1em;
					align-items: center;
					font-size: 0.75em;
				}
			}
		}

		@media only screen and (max-width: 768px) {
			overflow-x: scroll;
			padding-top: 1em;
			.card {
				min-width: 80%;
			}
		}
	}
</style>
