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

	// Track hover state for each tab
	let hoveredTab = -1

	function handleHover(index: number) {
		hoveredTab = index
	}

	function handleLeave() {
		hoveredTab = -1
	}
</script>

<div class="tabs-container">
	<div class="tabs">
		{#each tabs as tab, index}
			<button
				class:active={activeTab === index}
				class:hovered={hoveredTab === index}
				on:click={() => handleTabClick(index)}
				on:mouseenter={() => handleHover(index)}
				on:mouseleave={handleLeave}
			>
				{tab.title}
				{#if activeTab === index}
					<div class="active-indicator" />
				{/if}
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
			position: relative;

			button {
				width: 33%;
				height: 100%;
				outline: 0;
				border: 0;
				background-color: var(--color-white-900);
				cursor: pointer;
				transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
				border-radius: 1em;
				box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
				position: relative;
				overflow: hidden;
				font-weight: 500;

				// Hover effect
				&:hover {
					transform: translateY(-2px);
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
				}

				// Active state
				&.active {
					background-color: var(--color-cyan-700);
					color: white;
					transform: translateY(-2px);
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

					.active-indicator {
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						height: 3px;
						background: black;
						animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
					}
				}

				// Click effect
				&:active {
					transform: translateY(0);
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				}
			}
		}
	}

	@keyframes slideIn {
		from {
			transform: translateX(-100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
</style>
