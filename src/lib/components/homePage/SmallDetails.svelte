<script>
	import Background from '../atoms/Background.svelte'
	import LottieAnimation from '../atoms/LottieAnimation.svelte'
</script>

<Background />
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
			border-radius: var(--custom-border-radius);
			display: flex;
			padding: 1em;
			border-style: solid;
			border-width: 1px;
			border-color: #050505;
			border-radius: 12px;
			background-color: #050505;
			color: #fff;
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
				border-right: 1px solid #8f8f8f;
			}
		}

		.header {
			font-size: 0.875em;
			font-weight: 700;
			color: #8f8f8f;
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
					border-bottom: 1px solid #8f8f8f;
					padding-right: 0em;
				}
			}
		}
	}
</style>
