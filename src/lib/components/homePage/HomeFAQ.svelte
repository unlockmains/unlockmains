<script lang="ts">
</script>

<section class="home-faq">
	<div class="heading">
		<h1>Frequently Asked Questions</h1>
		<h4>Answers to the most frequently asked questions.</h4>
	</div>
	<div class="faq-container">
		<details class="faq-card">
			<summary class="faq-question">
				<h3>What is Unlock Mains?</h3>
			</summary>
			<p class="faq-answer">
				Unlock Mains is a platform that connects students with mentors and faculty to help them
				achieve their goals. It is a community-driven platform where students can access resources,
				advice, and support to help them succeed in their academic pursuits.
			</p>
		</details>
		<details class="faq-card">
			<summary class="faq-question">
				<h3>How does it work?</h3>
			</summary>
			<p class="faq-answer">
				Unlock Mains is a platform that connects students with mentors and faculty to help them
				achieve their goals. It is a community-driven platform where students can access resources,
				advice, and support to help them succeed in their academic pursuits.
			</p>
		</details>
		<details class="faq-card">
			<summary class="faq-question">
				<h3>Who can use Unlock Mains?</h3>
			</summary>
			<p class="faq-answer">
				Anyone who wants to improve their academic performance and achieve their goals. Whether it's
				a student, a teacher, or a parent, Unlock Mains can help you unlock your full potential.
			</p>
		</details>
		<details class="faq-card">
			<summary class="faq-question">
				<h3>Who can use Unlock Mains?</h3>
			</summary>
			<p class="faq-answer">
				Anyone who wants to improve their academic performance and achieve their goals. Whether it's
				a student, a teacher, or a parent, Unlock Mains can help you unlock your full potential.
			</p>
		</details>
		<details class="faq-card">
			<summary class="faq-question">
				<h3>Who can use Unlock Mains?</h3>
			</summary>
			<p class="faq-answer">
				Anyone who wants to improve their academic performance and achieve their goals. Whether it's
				a student, a teacher, or a parent, Unlock Mains can help you unlock your full potential.
			</p>
		</details>
	</div>
</section>

<style lang="scss">
	.home-faq {
		display: flex;
		flex-flow: column;
		align-items: center;
		background: url('lib/grid-gradient-3.svg') no-repeat center center;
		position: relative;
		margin-bottom: 5em;
		top: 0;
		right: 0;

		.heading {
			z-index: 10;
			font-family: Archivo, sans-serif;
			line-height: 1.2;
			font-weight: 500;
			letter-spacing: -0.02em;
			text-align: center;
			margin-bottom: 5em;

			h1 {
				font-size: 3em;
				margin-bottom: 0.3em;
			}

			h4 {
				font-size: 1em;
				margin-bottom: 1em;
			}
		}

		.faq-container {
			display: flex;
			flex-flow: row wrap;
			justify-content: center;
			align-items: center;
			gap: 1em;
			margin-bottom: 5em;
			width: 100%;

			& > details {
				transition: all 0.3s;
			}

			& > details[open] {
				scale: 1.1;
				margin-top: 0.5em;
				background-color: var(--color-yellow-300);
			}

			.faq-card {
				border: 1px solid black;
				width: 60%;
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

				.faq-question {
					display: flex;
					flex-direction: column;
					gap: 0.5em;
					cursor: pointer;
					user-select: none;

					h3 {
						font-size: 1.5em;
						line-height: 1.2;
						font-weight: 500;
						letter-spacing: -0.02em;
						padding: 0;
						margin: 0;
					}
				}
				.faq-answer {
					font-size: 1.2em;
					line-height: 1.5;
					letter-spacing: -0.02em;
					color: var(--color-zinc-500);
					margin-bottom: 2em;
				}
			}
		}
	}
</style>
