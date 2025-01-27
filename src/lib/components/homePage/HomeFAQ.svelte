<!-- FAQ.svelte -->
<script lang="ts">
	import { slide } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
	import Background from '../atoms/Background.svelte'

	interface FAQItem {
		question: string
		answer: string
		id: number
	}

	const faqItems: FAQItem[] = [
		{
			id: 1,
			question: 'What is Unlock Mains?',
			answer:
				'Unlock Mains is a platform that connects students with Interview appeared and faculty to help them achieve their goals. It is a platform where students can access resources, advice, and support to help them succeed in their academic pursuits.'
		},
		{
			id: 2,
			question: 'How does it work?',
			answer:
				'Unlock Mains is a platform where students write answers and upload them to the platform. The evaluator then evaluates the answers and provides feedback to the student to enrich it.'
		},
		{
			id: 3,
			question: 'Who can use Unlock Mains?',
			answer:
				'Anyone who wants to improve their mains answer writing skills to excel in UPSC, BPSC, UPPCS, MPPCS or any government exams. Unlock Mains can help you to unlock your full potential.'
		}
	]

	let activeId: number | null = null

	function toggleFaq(id: number) {
		activeId = activeId === id ? null : id
	}
</script>

<Background />
<section class="home-faq">
	<div class="background-gradient"></div>
	<div class="heading">
		<h1>Frequently Asked Questions</h1>
		<h4>Answers to the most frequently asked questions.</h4>
	</div>
	<div class="faq-container">
		{#each faqItems as faq}
			<div class="faq-card" class:active={activeId === faq.id}>
				<div
					class="faq-question"
					on:click={() => toggleFaq(faq.id)}
					on:keydown={(e) => e.key === 'Enter' && toggleFaq(faq.id)}
					tabindex="0"
					role="button"
					aria-expanded={activeId === faq.id}
					aria-controls="faq-answer-{faq.id}"
				>
					<h3>{faq.question}</h3>
					<span class="icon" aria-hidden="true">
						{activeId === faq.id ? '−' : '+'}
					</span>
				</div>
				{#if activeId === faq.id}
					<div
						class="faq-answer"
						id="faq-answer-{faq.id}"
						transition:slide={{ duration: 300, easing: quintOut }}
					>
						<p>{faq.answer}</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	.home-faq {
		display: flex;
		flex-flow: column;
		align-items: center;
		position: relative;
		margin-bottom: 5em;
		top: 0;
		right: 0;

		.background-gradient {
			position: absolute;
			height: 50em;
			width: 100%;
			background: url('/lib/grid-faq.svg') no-repeat center center;
			top: 0;
			left: 0;
		}

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
			flex-flow: column;
			align-items: center;
			gap: 2em;
			margin-bottom: 5em;
			width: 100%;
		}

		.faq-card {
			border: 1px solid black;
			width: 60%;
			z-index: 1;
			display: flex;
			flex-direction: column;
			padding: 1em;
			border-radius: 1em;
			background: var(--custom-bg-color);
			box-shadow: 0 10px 0 0 rgba(0, 0, 0, 1);
			transition: all 0.3s ease;

			&.active {
				scale: 1.05;
				margin-top: 0.5em;
				background-color: var(--color-yellow-300);
			}

			.faq-question {
				display: flex;
				justify-content: space-between;
				align-items: center;
				cursor: pointer;
				user-select: none;

				&:hover {
					opacity: 0.8;
				}

				&:focus-visible {
					outline: 2px solid var(--color-yellow-500);
					border-radius: 0.5em;
				}

				h3 {
					font-size: 1.5em;
					line-height: 1.2;
					font-weight: 500;
					letter-spacing: -0.02em;
					padding: 0;
					margin: 0;
				}

				.icon {
					font-size: 1.5em;
					font-weight: bold;
					transition: transform 0.3s ease;
				}
			}

			.faq-answer {
				padding: 1em 0.5em;

				p {
					font-size: 1.2em;
					line-height: 1.5;
					letter-spacing: -0.02em;
					color: var(--color-zinc-500);
					margin: 0;
				}
			}
		}
	}
</style>
