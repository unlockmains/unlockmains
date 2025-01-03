<script lang="ts">
	let tabs = [
		{
			title: 'section 1'
		},
		{
			title: 'section 2'
		},
		{
			title: 'section 3'
		}
	]
	let { activeTab, handleTabClick } = $props()
</script>

<div class="tabs-container">
	<div class="tabs">
		{#each tabs as tab, index}
			<button class={activeTab === index ? 'active' : ''} onclick={() => handleTabClick(index)}>
				{tab.title}
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.tabs-container {
		width: 50%;
		padding: 1em;
		margin: 1em;
		.tabs {
			display: flex;
			flex-flow: row;
			justify-content: space-between;
			align-items: center;
			height: 4em;
			gap: 1em;

			button {
				width: 33%;
				height: 100%;
				outline: 0;
				border: 0;
				background-color: var(--color-white-900);
				cursor: pointer;
				transition: all 01s ease;
				border-radius: 1em;
				box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

				&.active {
					background-color: var(--color-cyan-700);
				}
			}
		}
	}
</style>
