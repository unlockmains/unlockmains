<script lang="ts">
	let tabs = [
		{
			title: 'section 1',
			content: 'content 1'
		},
		{
			title: 'section 2',
			content: 'content 2'
		},
		{
			title: 'section 3',
			content: 'content 3'
		}
	]
	let { activeTab, handleTabClick } = $props()
</script>

<div>
	<div class="flex border-b border-gray-200">
		{#each tabs as tab, index}
			<button
				class=" {activeTab === index ? 'text-blue-500 border-b-2 border-blue-500' : ''}"
				onclick={() => handleTabClick(index)}
			>
				{tab.title}
			</button>
		{/each}
	</div>
	<div class="p-6">
		{#if tabs[activeTab]}
			{tabs[activeTab].content}
		{/if}
	</div>
</div>
