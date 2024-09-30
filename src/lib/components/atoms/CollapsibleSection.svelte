<script lang="ts">
	import CollapsibleCaretIcon from '../icons/CollapsibleCaretIcon.svelte'
	export let headerText: string = ''
	let expanded = false
    export let noOfLinks: number = 0;
</script>

<div class="collapsible">
	<a class:selected={expanded} on:click={() => (expanded = !expanded)} role="button">
		{headerText}
		<CollapsibleCaretIcon {expanded} />
	</a>
	<div class="contents" class:show={expanded} style={`height: ${expanded ? noOfLinks * 33 : 0}px`}>
		<slot />
	</div>
</div>

<style lang="scss">
	.collapsible {
		width: 100%;
		user-select: none;

		a {
			background-color: transparent;
			display: flex;
			justify-content: space-between;
			width: 100%;
			border: none;
			margin: 0 0 0.5em 0;
			padding: 1em 1em;
			font-size: 0.75em;
			font-weight: 700;
			text-transform: uppercase;
			list-style-type: lower-alpha;
			cursor: pointer;

			border-bottom: 2px solid var(--color-black-600);

			&:hover {
				background-color: var(--color-gold-400);
				border-radius: 8px;
			}

			&.selected {
				background-color: var(--color-zinc-400);
				border-radius: 8px;
			}
		}
		.contents {
			transition: height 0.2s;
			height: 0px;
			overflow: hidden;

			&.show {
				height: auto;
				overflow: visible;
			}
		}
	}
</style>
