<script lang="ts">
	let {
		options,
		label,
		userSelected = $bindable(),
		name,
		style
	} = $props<{
		options: { value: string; label: string }[]
		label: string
		userSelected: string[]
		name: string
		style: string
	}>()

	const uniqueID = `radio-${name}-${Math.random().toString(36).substring(2)}`

	const slugify = (str = '', index: number) =>
		`${name}-${str.toLowerCase().replace(/ /g, '-').replace(/\./g, '')}-${index}`

	function handleChange(value: string, checked: boolean) {
		if (checked) {
			userSelected = [...userSelected, value]
		} else {
			userSelected = userSelected.filter((v: string) => v !== value)
		}
	}
</script>

<div class="checkbox-group-container" {style}>
	<p class="checkbox-label" id={`label-${uniqueID}`}>{label}</p>
	<div
		role="group"
		class="group-container"
		aria-labelledby={`label-${uniqueID}`}
		id={`group-${uniqueID}`}
	>
		{#each options as { value, label }, index}
			{@const id = slugify(label, index)}
			<div>
				<input
					class="sr-only"
					type="checkbox"
					{id}
					{name}
					{value}
					checked={userSelected.includes(value)}
					onchange={(e) => handleChange(value, e.currentTarget.checked)}
				/>
				<label for={id}> {label} </label>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.checkbox-group-container {
		--label-size: 0.8em;
		display: flex;
		flex-direction: column;
		width: 100%;
		.checkbox-label {
			text-transform: capitalize;
			display: block;
			margin: 5px 0;
			color: var(--custom-color-secondary);
			font-size: var(--label-size);
		}
		.group-container {
			--accent-color: var(--custom-color-brand);
			--gray: var(--color-zinc-200);
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

			input[type='checkbox'] {
				position: absolute;
			}

			input[type='checkbox'] + label {
				display: block;
				position: relative;
				text-align: left;
			}

			input[type='checkbox'] + label::before {
				content: '';
				position: relative;
				display: inline-block;
				margin-right: 0.5em;
				width: 1em;
				height: 1em;
				background: transparent;
				border: 1px solid var(--gray, --color-zinc-200);
				border-radius: 2px;
				top: 0.2em;
			}

			input[type='checkbox']:checked + label::before {
				border: 1px solid var(--gray, --color-zinc-200);
				border-radius: 2px;
			}

			input[type='checkbox'] + label::after {
				content: '';
				position: absolute;
				display: inline-block;
				width: 0.5em;
				height: 0.5em;
				top: 0.45em;
				left: 0.25em;
				background: var(--accent-color, --color-black-700);
				border: 1px solid var(--accent-color, --color-black-700);
				border-radius: 1px;
				transform: scale(0);
			}

			input[type='checkbox']:checked + label::after {
				opacity: 1;
				transform: scale(1);
			}

			input[type='checkbox']:focus + label::before {
				box-shadow: 0 0 0 1px var(--accent-color, --color-black-700);
				border-radius: 2px;
			}

			input[type='checkbox']:disabled + label {
				color: var(--color-zinc-800);
			}

			input[type='checkbox']:disabled + label::before {
				background: var(--gray, --color-zinc-200);
			}

			input[type='checkbox'] + label::before {
				transition: background 0.3s ease-out;
			}

			input[type='checkbox']:checked + label::before {
				transition: background 0.3s ease-in;
			}

			input[type='checkbox'] + label::after {
				transition: transform 0.2s ease-out;
			}

			input[type='checkbox']:checked + label::after {
				transition: transform 0.2s ease-in;
			}

			input[type='checkbox']:focus + label::before {
				box-shadow: 0 0px 8px var(--accent-color, --color-black-700);
				border-radius: 2px;
			}
		}
	}
</style>
