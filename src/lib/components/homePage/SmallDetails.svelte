<section class="more-details">
	<div class="left-bg" />
	<div class="flex row flex-start items-start">
		<div class="col-4 flex flex-start items-start column right-border">
			<span class="header">Expert Faculty</span>
			<p class="text">
				Our skilled evaluators guarantee that the quality of the assessments remains flawless.
			</p>
		</div>
		<div class="divider" />
		<div class="col-4 flex flex-start items-start column right-border">
			<span class="header">Quick Evaluation</span>
			<p class="text">
				Receive your answers evaluated within 48 hours (up to 5 questions / 1 essay).
			</p>
		</div>
		<div class="col-4 flex flex-start items-start column right-border">
			<span class="header">Budget Friendly</span>
			<p class="text">
				All our subscriptions are carefully priced, keeping the needs of students in mind.
			</p>
		</div>
		<div class="col-4 flex flex-start items-start column">
			<span class="header">Tailored dashboard</span>
			<p class="text">
				Having all your answers in one place allows you to track your progress and boost your
				learning.
			</p>
		</div>
	</div>
	<div class="right-bg" />
</section>

<style lang="scss">
	.more-details {
		position: relative;
		padding: 5%;

		.left-bg {
			background: url('/lib/shapes.svg') center center;
			background-size: cover;
			position: absolute;
			height: 50%;
			width: 20%;
			left: 2%;
			z-index: 20;
		}
		.right-bg {
			background: url('/lib/shapes.svg') center center;
			background-size: cover;
			position: absolute;
			height: 50%;
			width: 20%;
			right: 2%;
			top: 5em;
			z-index: 20;
			transform: scale(-1);
		}

		.row {
			position: relative;
			width: 100%;
			max-width: 1140px;
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
				z-index: 20;
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
			font-size: 0.75em;
			font-weight: 700;
			color: #8f8f8f;
			text-transform: uppercase;
		}
		.text {
			font-size: 1em;
			font-weight: 300;
			line-height: 1.2;
			letter-spacing: -0.02em;
		}
	}
</style>
