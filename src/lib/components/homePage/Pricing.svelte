<script lang="ts">
	import Combobox from '../atoms/Combobox.svelte'
	import PricingCards from '../atoms/PricingCards.svelte'
	import Tabs from '../molecules/Tabs.svelte'
	let { pricingPbData } = $props()
	let activeTab: number = $state(0)
	let selectedOption: string = $state(pricingPbData[1].options[0])

	const handleTabClick = (index: number) => {
		activeTab = index
	}

	const pricingSections = pricingPbData.map(
		(section: { sectionName: string }) => section.sectionName
	)

	const getDropdownOptions = (options: string[], disabledOptions: string[]) =>
		options.map((option) => ({
			text: option,
			value: option,
			disabled: disabledOptions.includes(option)
		}))
</script>

<section class="pricing">
	<div class="heading">
		<h1>Our Plans</h1>
		<h4>All affordable plans. Choose the one that suits you best.</h4>
	</div>
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
	<PricingCards pricingCardData={pricingPbData[activeTab].pricings} {selectedOption} />
</section>

<style lang="scss">
	.pricing {
		display: flex;
		flex-flow: column;
		align-items: center;
		background: url('lib/grid-gradient.svg') no-repeat center center;
		position: relative;
		min-height: 100vh;
		margin-bottom: 5em;
		gap: 0.5em;

		.heading {
			z-index: 10;
			font-family: Archivo, sans-serif;
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
	}
</style>
