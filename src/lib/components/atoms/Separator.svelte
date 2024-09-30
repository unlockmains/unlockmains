<div class="separator">
	<span class="svg">
		<slot />
	</span>
</div>

<style lang="scss">
	.separator {
		--_line-thickness: 3px;
		--_color: var(--color-black-900);
		--_size: 3.5rem;
		--radius-full: 9999px;
		display: block;
		height: 3px;
		margin: clamp(3rem, 0.7777777777777777rem + 7.4074074074074066vw, 6rem) auto;
		position: relative;

		&::before,
		&::after {
			--_from-center: calc(50% + var(--_size));
			background: var(--_color);
			border-radius: var(--radius-full);
			content: '';
			height: 100%;
			position: absolute;
			width: min(35%, 30rem);
		}

		&::before {
			right: var(--_from-center);
		}

		&::after {
			left: var(--_from-center);
		}

		.svg {
			color: var(--_color);
			display: block;
			height: 3.5rem;
			left: calc(50% - var(--_size) / 2);
			position: absolute;
			top: calc((var(--_size) / 2) * -1 + var(--_line-thickness) / 2);
			width: 3.5rem;
		}
	}
</style>
