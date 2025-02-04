<script lang="ts">
	let {
		options,
		label,
		userSelected = $bindable(),
		name,
		style
	} = $props<{
		options: { value: string | boolean; label: string }[]
		label: string
		userSelected: string | boolean
		name: string
		style?: string
	}>()

	const uniqueID = `radio-${name}-${Math.random().toString(36).substring(2)}`

	const slugify = (str = '', index: number) =>
		`${name}-${str.toLowerCase().replace(/ /g, '-').replace(/\./g, '')}-${index}`
</script>

<label class="radio-label" id={`label-${uniqueID}`} {style}>{label}</label>
<div
	role="radiogroup"
	class="group-container"
	aria-labelledby={`label-${uniqueID}`}
	id={`group-${uniqueID}`}
>
	{#each options as { value, label }, index}
		{@const id = slugify(label, index)}
		<input
			class="sr-only"
			type="radio"
			{id}
			{name}
			bind:group={userSelected}
			{value}
			aria-checked={userSelected === value}
		/>
		<label for={id}> {label} </label>
	{/each}
</div>

<style lang="scss">
	.radio-label {
		--label-size: 0.8em;
		text-transform: capitalize;
		display: block;
		margin: 5px 0;
		color: var(--custom-color-secondary);
		font-size: var(--label-size);
	}
	.group-container {
		--accent-color: var(--custom-color-brand);
		--gray: #ccc;
		border-radius: 2px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		min-width: 10em;
		font-size: 1em;

		label {
			user-select: none;
			line-height: 1.2em;
		}
		.sr-only {
			position: absolute;
			clip: rect(1px, 1px, 1px, 1px);
			padding: 0;
			border: 0;
			height: 1px;
			width: 1px;
			overflow: hidden;
		}

		input[type='radio'] {
			position: absolute;
		}

		input[type='radio'] + label {
			display: block;
			position: relative;
			text-align: left;
		}

		input[type='radio'] + label::before {
			content: '';
			position: relative;
			display: inline-block;
			margin-right: 0.5em;
			width: 1em;
			height: 1em;
			background: transparent;
			border: 1px solid var(--gray, #ccc);
			border-radius: 50%;
			top: 0.2em;
		}

		input[type='radio']:checked + label::before {
			border: 1px solid var(--gray, #ccc);
			border-radius: 50%;
		}

		input[type='radio'] + label::after {
			content: '';
			position: absolute;
			display: inline-block;
			width: 0.5em;
			height: 0.5em;
			top: 0.45em;
			left: 0.25em;
			background: var(--accent-color, #282828);
			border: 1px solid var(--accent-color, #282828);
			border-radius: 50%;
			transform: scale(0);
		}

		input[type='radio']:checked + label::after {
			opacity: 1;
			transform: scale(1);
		}

		input[type='radio']:focus + label::before {
			box-shadow: 0 0 0 1px var(--accent-color, #282828);
			border-radius: 50%;
		}

		input[type='radio']:disabled + label {
			color: var(--color-zinc-800);
		}

		input[type='radio']:disabled + label::before {
			background: var(--gray, #ccc);
		}

		input[type='radio'] + label::before {
			transition: background 0.3s ease-out;
		}

		input[type='radio']:checked + label::before {
			transition: background 0.3s ease-in;
		}

		input[type='radio'] + label::after {
			transition: transform 0.2s ease-out;
		}

		input[type='radio']:checked + label::after {
			transition: transform 0.2s ease-in;
		}

		input[type='radio']:focus + label::before {
			box-shadow: 0 0px 8px var(--accent-color, #282828);
			border-radius: 50%;
		}
	}
</style>
