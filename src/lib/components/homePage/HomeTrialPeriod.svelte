<script>
	import { goto } from '$app/navigation'
	import Button from '../atoms/Button.svelte'
</script>

<section class="trial-details">
	<h1>Worried it might be a waste of money?</h1>
	<div>We have a completely free trial period for 2 GS Question Submissions.</div>
	<div>
		<span class="bold-italic">Login</span>, <span class="bold-italic">upload</span> your files and
		<span class="bold-italic">submit</span> your questions.
	</div>
	<div>Get the <span class="bold-italic">evaluations</span> back in 24 hours.</div>
	<div>Make the life changing <span class="bold-italic">decision</span>. Simple as that.</div>
	<Button label="Start Trial" type="next" onClick={() => goto('/login')} />
</section>

<style lang="scss">
	.trial-details {
		margin-bottom: 5em;
		max-width: 80%;
		width: 100%;
		margin-right: auto;
		margin-left: auto;
		border-radius: 1em;
		padding: 1.5em;
		background-color: var(--color-cyan-000);

		color: var(--color-black-900);
		min-height: 10em;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;

		h1 {
			margin-top: 0;
		}

		.bold-italic {
			font-weight: bold;
			font-style: italic;
		}

		@media only screen and (max-width: 768px) {
			max-width: 100%;
		}
	}
</style>
