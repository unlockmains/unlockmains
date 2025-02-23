<script lang="ts">
	import Combobox from '../atoms/Combobox.svelte'
	import PricingCards from '../atoms/PricingCards.svelte'
	import Tabs from '../molecules/Tabs.svelte'
	let { pricingPbData, afterAuth = false } = $props()
	let activeTab: number = $state(0)
	let selectedOption: string = $state(pricingPbData[1].options[0])

	const handleTabClick = (index: number) => {
		activeTab = index
	}

	const pricingSections = pricingPbData.map(
		(section: { sectionName: string; disabled: boolean }) => ({
			sectionName: section.sectionName,
			disabled: section.disabled
		})
	)

	const getDropdownOptions = (options: string[], disabledOptions: string[]) =>
		options.map((option) => ({
			text: option,
			value: option,
			disabled: disabledOptions.includes(option)
		}))
</script>

<section class="pricing">
	{#if !afterAuth}
		<div class="heading">
			<h1>Our Plans</h1>
			<h4>All affordable plans. Choose the one that suits you best.</h4>
		</div>
	{/if}
	<Tabs items={pricingSections} {activeTab} {handleTabClick} />
	{#if pricingPbData[activeTab].options.length}
		<form class="subject-select">
			<Combobox
				options={getDropdownOptions(
					pricingPbData[activeTab].options,
					pricingPbData[activeTab].disabledOptions
				)}
				name="subject"
				bind:value={selectedOption}
				showRemainingCount={false}
				style="--accent-color: var(--color-cyan-700);--list-option-padding:0.2em 1em;--border-radius:0.5em;--height:2em;"
				disabled={false}
				label=""
				placeholder=""
			/>
		</form>
	{/if}
	<div class="pricing-divider"></div>
	<PricingCards pricingCardData={pricingPbData[activeTab].pricings} {selectedOption} {afterAuth} />
	<div class="pricing-note">
		<h3><i><b>Note:</b></i></h3>
		<ul>
			<li><b>Pricing</b>: All listed prices above are inclusive of GST.</li>
			<li>
				<b>Evaluation Timelines</b>: For up to 5 questions or 1 essay, evaluations will typically be
				completed within 24 working hours. Full-length evaluations require 5–7 days.
			</li>
			<li><b>Working Hours Definition</b>: A working day consists of 9 hours.</li>
			<li>
				<b>Timeline Variability</b>: The 24 working hours is an estimated timeline. Since evaluation
				is a human-driven process, strict deadlines cannot be guaranteed.
			</li>
			<li>
				<b>Unlimited Plan Policy</b>: The Unlimited Evaluation Plan concludes 10 days before the
				first Mains examination. In this period, only previously submitted copies will be evaluated;
				new submissions will not be accepted.
			</li>
		</ul>
	</div>
</section>

<style lang="scss">
	.pricing {
		display: flex;
		flex-flow: column;
		align-items: center;
		background: url('/lib/grid-home.svg') no-repeat center center;
		position: relative;
		margin-bottom: 5em;
		gap: 0.5em;
		padding: 5%;
		width: 100%;

		.heading {
			z-index: 10;
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

		.pricing-note {
			margin-top: 2em;
			font-size: 0.8em;
			color: var(--color-zinc-500);

			h3 {
				color: var(--color-magenta-700);
			}

			ul {
				padding-left: 1em;
				margin-bottom: 1em;

				li {
					margin-bottom: 0.5em;
					line-height: 1.5;
				}
			}
		}

		@media only screen and (max-width: 768px) {
			.heading {
				h1 {
					font-size: 2em;
				}
				h4 {
					font-size: 0.8em;
				}
			}
			.pricing-note {
				font-size: 0.7em;
			}
		}
	}
</style>
