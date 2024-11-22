<script lang="ts">
	import Quotes from '../atoms/Quotes.svelte'
	export let quotes
</script>

<section class="landing-page">
	<div class="rocket-container">
		<h1>launch your mains dream through us</h1>
		<div class="home-page-rocket">
			<div class="rocket" />
			<div class="rocket-fire" />
		</div>
	</div>
	<div class="main-details">
		<div class="main-title">Answer writing made easy with Unlock Mains</div>
		<Quotes {quotes} />
		<h2 class="header">Get your ability validated and verified by interview appeared faculty.</h2>
	</div>
	<div class="more-details">
		<div class="flex row flex-center items-center">
			<div class="col-4 bordered flex flex-center items-center column">
				<span class="header">Expert Faculty</span>
				<span
					>Our skilled evaluators guarantee that the quality of the assessments remains flawless.</span
				>
			</div>
			<div class="col-4 bordered flex flex-center items-center column">
				<span class="header">Quick Evaluation</span>
				<span>Receive your answers evaluated within 48 hours (up to 5 questions / 1 essay).</span>
			</div>
			<div class="col-4 bordered flex flex-center items-center column">
				<span class="header">Budget Friendly</span>
				<span
					>All our subscriptions are carefully priced, keeping the needs of students in mind.</span
				>
			</div>
			<div class="col-4 bordered flex flex-center items-center column">
				<span class="header">Tailored dashboard</span>
				<span
					>Having all your answers in one place allows you to track your progress and boost your
					learning.</span
				>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.landing-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		min-height: 100vh;
		position: relative;
		user-select: none;
		top: 5em;

		.rocket-container {
			position: absolute;
			top: 10%;
			right: 10%;
			h1 {
				position: absolute;
				font-family: fantasy;
				font-size: 0.9em;
				width: 70%;
				left: -40%;
			}
			.home-page-rocket {
				width: 128px;
				height: 128px;

				.rocket {
					background: url('/lib/rocket.svg') no-repeat center center;
					height: 100%;
					width: 100%;
				}

				.rocket-fire {
					position: absolute;
					z-index: 0;
					top: 78%;
					right: 55%;
					width: 140px;
					height: 90px;
					background: url('/lib/rocket-fire-1.svg') no-repeat center center;
					transform: rotate(-48deg);
					animation: fire 0.25s steps(3) infinite;

					@keyframes fire {
						0% {
							background-position: 0px;
						}
						100% {
							background-position: -420px;
						}
					}
				}
			}
		}

		.main-details {
			margin-top: 12em;
			.main-title {
				font-size: 2em;
				font-weight: 700;
				position: relative;
				color: var(--custom-color-brand);
				text-align: center;
			}
		}

		.more-details {
			height: 20vh;
			background-color: var(--custom-color-brand);

			.row {
				gap: 1em;
			}

			.header {
				font-size: 1.5em;
				font-weight: 700;
				color: var(--color-orange-700);
			}
		}
	}
</style>
