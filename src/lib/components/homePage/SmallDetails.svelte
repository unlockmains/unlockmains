<script>
	import LottieAnimation from '../atoms/LottieAnimation.svelte'
</script>

<section class="more-details">
	<div class="left-bg"></div>
	<div class="flex row flex-start items-start container">
		<div class="col-4 flex flex-start items-center column right-border">
			<span class="header">Expert Faculty</span>
			<div class="animation" style="width: 6em;">
				<LottieAnimation src="/lib/lottie/expert.json" loop={true} autoplay={true} />
			</div>
			<p class="text">
				Our skilled evaluators guarantee that the quality of the assessments remains flawless.
			</p>
		</div>
		<div class="divider"></div>
		<div class="col-4 flex flex-start items-center column right-border">
			<span class="header">Quick Evaluation</span>
			<div class="animation">
				<LottieAnimation src="/lib/lottie/evaluation.json" loop={true} autoplay={true} />
			</div>
			<p class="text">
				Receive your answers evaluated within 48 hours (up to 5 questions / 1 essay).
			</p>
		</div>
		<div class="col-4 flex flex-start items-center column right-border">
			<span class="header">Budget Friendly</span>
			<div class="animation">
				<LottieAnimation src="/lib/lottie/budget.json" loop={true} autoplay={true} />
			</div>
			<p class="text">
				All our subscriptions are carefully priced, keeping the needs of students in mind.
			</p>
		</div>
		<div class="col-4 flex flex-start items-center column">
			<span class="header">Tailored dashboard</span>
			<div class="animation">
				<LottieAnimation src="/lib/lottie/dashboard.json" loop={true} autoplay={true} />
			</div>
			<p class="text">
				Having all your answers in one place allows you to track your progress and boost your
				learning.
			</p>
		</div>
	</div>
	<div class="right-bg"></div>
</section>

<style lang="scss">
	.more-details {
		position: relative;
		padding: 5%;

		.container {
			max-width: 100%;
		}

		.left-bg {
			background: url('/lib/shapes.svg') center center;
			background-size: cover;
			position: absolute;
			height: 8em;
			width: 2em;
			left: 5%;
			z-index: 10;
		}
		.right-bg {
			background: url('/lib/shapes.svg') center center;
			background-size: cover;
			position: absolute;
			height: 8em;
			width: 2em;
			right: 5%;
			top: 55%;
			z-index: 10;
			transform: scale(-1);
		}

		.row {
			position: relative;
			width: 100%;
			margin-right: auto;
			margin-left: auto;
			display: flex;
			padding: 1em;
			border-style: solid;
			border-width: 1px;
			border-color: var(--color-black-500);
			border-radius: 1em;
			background-color: var(--color-black-500);
			color: var(--color-white-900);
			min-height: 10em;

			.column {
				z-index: 10;
				height: 100%;
				gap: 1em;
				padding-right: 2em;
				min-height: 10em;

				&:first-child {
					padding-left: 2em;
				}
			}
			.right-border {
				border-right: 1px solid var(--color-black-500);
			}
		}

		.header {
			font-size: 0.875em;
			font-weight: 700;
			color: var(--color-zinc-100);
			text-transform: uppercase;
		}
		.animation {
			width: 8em;
			height: 8em;
			align-self: center;
		}
		.text {
			font-size: 1em;
			line-height: 1.8;
			letter-spacing: -0.02em;
		}

		@media only screen and (max-width: 768px) {
			.right-bg {
				top: calc(100% - 10em);
			}
			.row {
				flex-direction: column;
				gap: 0.5em;
				.column {
					&:first-child {
						padding-left: 0;
					}
					&:last-child {
						padding-right: 0;
					}
				}
				.right-border {
					border-right: 0;
					border-bottom: 1px solid var(--color-black-500);
					padding-right: 0em;
				}
			}
		}
	}
</style>
