<script lang="ts">
	import type { INewSubmissionType } from '$lib/types'
	import { onClickOutside } from '../../context/ComboboxContext.svelte'

	// export let disabled: boolean = false
	// export let label: string = ''
	// export let name: string
	// export let options: INewSubmissionType[] = []
	// export let placeholder: string | undefined = undefined
	// export let readonly: boolean = false
	// export let required: boolean = false
	// export let value: string | undefined = ''
	// export let style: string = ''
	// export let showRemainingCount: boolean = true
	let {
		disabled = false,
		label = '',
		name,
		options = [],
		placeholder,
		readonly = false,
		required = false,
		value = $bindable(),
		style = '',
		showRemainingCount = true
	}: {
		disabled: boolean | undefined
		label: string
		name: string
		options: INewSubmissionType[]
		placeholder: string | undefined
		readonly?: boolean
		required?: boolean
		value: string | undefined
		style: string
		showRemainingCount: boolean
	} = $props()
	let listElement: HTMLUListElement
	let inputElement: HTMLInputElement
	let list: INewSubmissionType[] = $state([])
	let isListOpen = $state(false)
	let selectedOption: INewSubmissionType

	let filter = (text: string) => {
		const sanitized = text.trim().toLowerCase()

		return options.reduce((a, o) => {
			let match: INewSubmissionType | undefined = undefined

			if (o.options) {
				const options = o.options.filter((o) => o.text.toLowerCase().includes(sanitized))

				if (options.length) {
					match = { ...o, options }
				}
			} else if (o.text.toLowerCase().includes(sanitized)) {
				match = o
			}

			match && a.push(match)

			return a
		}, [] as INewSubmissionType[])
	}

	function onInputKeyup(event: KeyboardEvent) {
		switch (event.key) {
			case 'Escape':
			case 'ArrowUp':
			case 'ArrowLeft':
			case 'ArrowRight':
			case 'Enter':
			case 'Tab':
			case 'Shift':
				break
			case 'ArrowDown':
				showList((event.target as HTMLInputElement).value)
				;(
					listElement.querySelector(
						`[role="option"]:not([aria-disabled="true"])`
					) as HTMLUListElement
				).focus()

				event.preventDefault()
				event.stopPropagation()
				break

			default:
				showList((event.target as HTMLInputElement)?.value)
		}
	}

	function onInputKeydown(event: KeyboardEvent) {
		let flag = false

		switch (event.key) {
			case 'Escape':
				hideList()
				flag = true
				break

			case 'Tab':
				hideList()
				break
		}

		if (flag) {
			event.preventDefault()
			event.stopPropagation()
		}
	}

	function onInputClick(event: MouseEvent) {
		showList((event.target as HTMLInputElement).value)
		// listElement.querySelector(`[role="option"][data-value="${value}"]`)?.scrollIntoView()
	}

	function onOptionClick(event: MouseEvent) {
		if (!(event.target as HTMLLIElement).matches(`[role="option"]:not([aria-disabled="true"])`))
			return

		selectOption(event.target as HTMLLIElement)
		hideList()
	}

	function onListKeyDown(event: KeyboardEvent) {
		let flag = false

		switch (event.key) {
			case 'ArrowUp':
				let prevOptionElement = (event.target as HTMLLIElement)
					.previousElementSibling as HTMLLIElement

				while (prevOptionElement) {
					if (prevOptionElement.matches(`[role="option"]:not([aria-disabled="true"])`)) break
					prevOptionElement = prevOptionElement.previousElementSibling as HTMLLIElement
				}

				prevOptionElement?.focus()
				flag = true
				break

			case 'ArrowDown':
				let nextOptionElement = (event.target as HTMLLIElement).nextElementSibling as HTMLLIElement

				while (nextOptionElement) {
					if (nextOptionElement.matches(`[role="option"]:not([aria-disabled="true"])`)) break
					nextOptionElement = nextOptionElement.nextElementSibling as HTMLLIElement
				}

				nextOptionElement?.focus()
				flag = true
				break

			case 'Enter':
				selectOption(event.target as HTMLLIElement)
				hideList()
				flag = true
				break

			case 'Escape':
				hideList()
				flag = true
				break

			case 'Tab':
				hideList()
				break

			default:
				inputElement.focus()
		}

		if (flag) {
			event.preventDefault()
			event.stopPropagation()
		}
	}

	function showList(inputValue: string) {
		const isExactMatch = options.some((o) =>
			o.options ? o.options.some((o) => o.text === inputValue) : o.text === inputValue
		)

		list = inputValue === '' || isExactMatch ? options : filter(inputValue)
		isListOpen = true
	}

	function hideList() {
		if (!isListOpen) return

		if (selectedOption) {
			inputElement.value = selectedOption.text
		}

		isListOpen = false
		inputElement.focus()
	}

	function selectOption(optionElement: HTMLLIElement) {
		value = optionElement.dataset.value

		selectedOption = {
			text: optionElement.dataset.text as string,
			value: optionElement.dataset.value as string
		}
	}
</script>

<div class="combobox" {style}>
	{#if label}<label class="combobox__label">{label}</label>{/if}
	<div class="input-container" use:onClickOutside={hideList}>
		<slot name="icon-start" />
		<input
			bind:this={inputElement}
			bind:value
			on:focus
			on:blur
			on:input
			on:keyup={onInputKeyup}
			on:keydown={onInputKeydown}
			on:mousedown={onInputClick}
			class="combobox__input"
			{name}
			type="text"
			{disabled}
			autocapitalize="none"
			autocomplete="off"
			{readonly}
			{placeholder}
			spellcheck="false"
			role="combobox"
			aria-autocomplete="list"
			aria-expanded={isListOpen}
			aria-required={required ? 'true' : undefined}
			{style}
		/>
		<ul
			class="combobox__list"
			role="listbox"
			aria-label={label}
			hidden={!isListOpen}
			on:click={onOptionClick}
			on:keydown={onListKeyDown}
			bind:this={listElement}
		>
			{#each list as option}
				{#if option.options}
					<li class="list__option-heading">
						<slot name="group" group={option}>
							{option.text}
						</slot>
					</li>
					{#each option.options as childOption}
						<li
							class="list__option"
							class:disabled={childOption.disabled}
							role="option"
							tabindex={childOption.disabled ? undefined : -1}
							data-text={childOption.text}
							data-value={childOption.value}
							aria-selected={value === childOption.value}
							aria-disabled={childOption.disabled}
						>
							<slot name="option" {childOption}>
								{childOption.text}
							</slot>
							{#if childOption.value === value}
								<svg viewBox="0 0 24 24" class="icon">
									<polyline points="20 6 9 17 4 12"></polyline>
								</svg>
							{/if}
						</li>
					{/each}
				{:else}
					<li
						class="list__option"
						class:disabled={option.disabled}
						class:active={option.value === value}
						role="option"
						tabindex={option.disabled === true ? undefined : -1}
						data-text={option.text}
						data-value={option.value}
						aria-selected={value === option.value}
						aria-disabled={option.disabled}
					>
						<slot name="option" {option}>
							{option.text}
						</slot>
						{#if option.value === value && showRemainingCount}
							<svg viewBox="0 0 24 24" class="icon">
								<polyline points="20 6 9 17 4 12"></polyline>
							</svg>
						{/if}
						{#if showRemainingCount}
							<span style="font-size: 0.6em; height: 1em; width: 4em">Remaining {option.count}</span
							>
						{/if}
					</li>
				{/if}
			{:else}
				<li class="list__no-results">No results available</li>
			{/each}
		</ul>
		{#if showRemainingCount}
			<div class="visually-hidden" role="status" aria-live="polite">
				{list.length} results available.
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.combobox {
		--accent-color: var(--custom-color-brand);
		--background-color: var(--color-white-900);
		--border-radius: 1em;
		--combobox-width: 100%;
		--combobox-dropdown-width: 100%;
		--height: 4em;
		--font-size: 1em;
		--list-option-padding: 0.8rem 1rem;
		--list-gap: 0.5em;
		display: flex;
		flex-direction: column;
		gap: var(--list-gap);
		width: var(--combobox-width);

		.combobox__label {
			text-transform: capitalize;
			display: block;
			margin: 5px 0;
			color: var(--custom-color-secondary);
			font-size: 0.8rem;
		}

		.input-container {
			position: relative;

			.combobox__input {
				margin: 0;
				width: var(--combobox-width);
				padding: 1em;
				border: 2px solid var(--color-zinc-700);
				border-radius: var(--border-radius);
				font-size: var(--font-size);
				height: var(--height);

				&:focus {
					outline: none;
				}
			}

			.combobox__list {
				list-style: none;
				margin: 0;
				padding: 0.3rem;
				position: absolute;
				inset-inline-start: 0;
				inset-block-start: calc(100% + 0.3rem);
				min-width: var(--combobox-dropdown-width);
				max-height: 40vh;
				overflow-y: auto;
				-webkit-overflow-scrolling: touch;
				z-index: 100;
				background-color: var(--background-color);
				border-radius: 0.3em;
				border: 0.175rem solid var(--accent-color);
				box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

				.list__option-heading {
					font-size: 0.9em;
					padding-inline: 1rem;
					padding-block-start: 0.4rem;
					color: gray;
				}

				.list__no-results {
					padding: 0.8rem 1rem;
				}

				.list__option {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: var(--list-option-padding);
					border: 0.2rem solid transparent;
					border-radius: 0.3rem;

					& > :global(*) {
						pointer-events: none;
					}

					&.disabled {
						pointer-events: none;
						opacity: 0.4;
					}

					&:focus,
					&:not([aria-disabled='true']):hover {
						outline: none;
						cursor: pointer;
						background-color: rgba(0, 0, 0, 0.1);
					}

					&.active {
						cursor: pointer;
						outline: none;
						color: white;
						background-color: var(--accent-color) !important;
					}

					&:focus :global(svg),
					&:hover :global(svg) {
						--icon-color: white !important;
					}
				}
			}
		}

		&:focus-within .combobox__input {
			border-color: var(--accent-color);
		}
	}
</style>
