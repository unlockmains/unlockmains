<script lang="ts">
	import Button from './Button.svelte'
	const pricingData = [
		{
			id: 1,
			name: 'Free Membership',
			color: '#c7eeb4',
			price: '1700',
			duration: 'month',
			features: [
				{
					id: 1,
					icon: '/lib/feature-yes.svg',
					title: 'Unlimited'
				},
				{
					id: 2,
					icon: '/lib/feature-yes.svg',
					title: 'No Credit Card Required'
				},
				{
					id: 3,
					icon: '/lib/feature-no.svg',
					title: '24/7 Support',
					strikethrough: true
				}
			]
		},
		{
			id: 2,
			name: '1 month Membership',
			color: '#fbee9d',
			price: '10000',
			duration: 'month',
			features: [
				{
					id: 1,
					icon: '/lib/feature-yes.svg',
					title: 'Unlimited'
				},
				{
					id: 2,
					icon: '/lib/feature-yes.svg',
					title: 'No Credit Card Required'
				},
				{
					id: 3,
					icon: '/lib/feature-yes.svg',
					title: '24/7 Support',
					strikethrough: false
				},
				{
					id: 4,
					icon: '/lib/feature-yes.svg',
					title: 'Unlimited'
				},
				{
					id: 5,
					icon: '/lib/feature-yes.svg',
					title: 'No Credit Card Required'
				},
				{
					id: 6,
					icon: '/lib/feature-no.svg',
					title: '24/7 Support',
					strikethrough: true
				}
			]
		},
		{
			id: 3,
			name: 'Mains 2026 Pack',
			color: '#cce2eb',
			price: '17000',
			duration: 'One Time',
			features: [
				{
					id: 1,
					icon: '/lib/feature-yes.svg',
					title: 'Unlimited'
				},
				{
					id: 2,
					icon: '/lib/feature-yes.svg',
					title: 'No Credit Card Required'
				},
				{
					id: 3,
					icon: '/lib/feature-yes.svg',
					title: '24/7 Support',
					strikethrough: false
				},
				{
					id: 4,
					icon: '/lib/feature-yes.svg',
					title: 'Unlimited'
				},
				{
					id: 5,
					icon: '/lib/feature-yes.svg',
					title: 'No Credit Card Required'
				},
				{
					id: 6,
					icon: '/lib/feature-yes.svg',
					title: '24/7 Support',
					strikethrough: false
				},
				{
					id: 7,
					icon: '/lib/feature-yes.svg',
					title: '2026 Support',
					strikethrough: false
				}
			]
		}
	]
</script>

<div class="cards">
	{#each pricingData as { id, name, color, price, duration, features }}
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
