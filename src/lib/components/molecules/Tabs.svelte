<script lang="ts">
	let { items, activeTab, handleTabClick } = $props()

	let hoveredTab: number = $state(-1)

	function handleHover(index: number) {
		hoveredTab = index
	}

	function handleLeave() {
		hoveredTab = -1
	}
</script>

<div class="tabs-container">
	<div class="tabs">
		{#each items as tab, index}
			<button
				class:active={activeTab === index}
				class:hovered={hoveredTab === index}
				class:disabled={tab.disabled}
				on:click={() => !tab.disabled && handleTabClick(index)}
				on:mouseenter={() => handleHover(index)}
				on:mouseleave={handleLeave}
			>
				{tab.sectionName}
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

		.tabs {
			display: flex;
			flex-flow: row;
			justify-content: space-between;
			align-items: center;
			height: 3em;
			gap: 1em;
			position: relative;

			button {
				width: 100%;
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
				white-space: nowrap;

				&:hover {
					transform: translateY(-2px);
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
				}

				&.disabled {
					cursor: not-allowed;
					opacity: 0.5;
				}

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
						background: var(--color-indigo-400);
						animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
					}
				}

				&:active {
					transform: translateY(0);
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
				}
			}
		}

		@media only screen and (max-width: 768px) {
			width: 100%;
			font-size: 0.75em;
			padding: 0;

			.tabs {
				height: 4em;
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
