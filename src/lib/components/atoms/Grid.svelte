<script lang="ts">
	export let data: any[] = []
	export let columns: { key: string; title: string }[] = []

	let sortedData = [...data]
	let sortKey: string | null = null
	let sortDirection: 'asc' | 'desc' = 'asc'
	let filterText = ''

	$: {
		let filtered = [...data]
		if (filterText) {
			filtered = data.filter((item) =>
				Object.values(item).some((val) =>
					String(val).toLowerCase().includes(filterText.toLowerCase())
				)
			)
		}

		if (sortKey) {
			filtered.sort((a, b) => {
				const aVal = a[sortKey!]
				const bVal = b[sortKey!]

				if (typeof aVal === 'string' && typeof bVal === 'string') {
					return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
				}

				return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
			})
		}

		sortedData = filtered
	}

	function handleSort(key: string) {
		if (sortKey === key) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'
		} else {
			sortKey = key
			sortDirection = 'asc'
		}
	}
</script>

<div class="grid-container">
	<div class="filter-container">
		<input type="text" bind:value={filterText} placeholder="Search..." class="filter-input" />
	</div>

	<table class="grid-table">
		<thead>
			<tr>
				{#each columns as column}
					<th
						on:click={() => handleSort(column.key)}
						class:sorted={sortKey === column.key}
						class:asc={sortKey === column.key && sortDirection === 'asc'}
						class:desc={sortKey === column.key && sortDirection === 'desc'}
					>
						{column.title}
						{#if sortKey === column.key}
							<span class="sort-indicator">
								{sortDirection === 'asc' ? '↑' : '↓'}
							</span>
						{/if}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each sortedData as row}
				<tr>
					{#each columns as column}
						<td>{row[column.key]}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	.grid-container {
		width: 100%;
		overflow-x: auto;
	}

	.filter-container {
		margin-bottom: 1rem;
	}

	.filter-input {
		padding: 0.5rem;
		border: 1px solid var(--color-zinc-300);
		border-radius: 4px;
		width: 200px;
	}

	.grid-table {
		width: 100%;
		border-collapse: collapse;
		background-color: var(--custom-bg-color);

		th,
		td {
			padding: 0.75rem;
			text-align: left;
			border-bottom: 1px solid var(--color-zinc-300);
		}

		th {
			background-color: var(--color-white-800);
			font-weight: 600;
			cursor: pointer;
			user-select: none;
			position: relative;
			text-transform: uppercase;
			font-size: 0.675em;

			&:hover {
				background-color: var(--color-zinc-300);
			}

			&.sorted {
				background-color: var(--color-zinc-300);
			}
		}

		tr:hover {
			background-color: var(--color-white-800);
		}
	}

	.sort-indicator {
		display: inline-block;
	}
</style>
