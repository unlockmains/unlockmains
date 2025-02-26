<script lang="ts">
	export let data: any[] = []
	export let columns: {
		key: string
		title: string
		size?: string
		type?: string
		onClick?: (data: string) => void
	}[] = []

	export let onRowClick: (id: string) => void = () => {}

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
						onclick={() => handleSort(column.key)}
						class:sorted={sortKey === column.key}
						class:asc={sortKey === column.key && sortDirection === 'asc'}
						class:desc={sortKey === column.key && sortDirection === 'desc'}
						style={column.size ? `width: ${column.size}` : ''}
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
				<tr onclick={() => onRowClick?.(row.$id)} class:rowClick={!!onRowClick}>
					{#each columns as column}
						{#if column.type === 'link' && row[column.key]}
							<td><a class="link" onclick={() => column.onClick?.(row[column.key])}>View</a></td>
						{:else}
							<td>{row[column.key]}</td>
						{/if}
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
			font-size: 0.8em;
			text-align: center;
		}
		td {
			.link {
				color: var(--custom-color-brand);
				cursor: pointer;
			}
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

		tr.rowClick:hover {
			background-color: var(--color-purple-300);
			cursor: pointer;
		}
	}

	.sort-indicator {
		display: inline-block;
	}
</style>
