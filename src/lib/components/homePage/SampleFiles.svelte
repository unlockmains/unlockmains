<script lang="ts">
	import Button from '../atoms/Button.svelte'
	import PdfIcon from '../icons/PDFIcon.svelte'
	export let sampleFilesToShow
</script>

<section class="sample-files">
	<div class="heading">
		<h1>Take a peek at our Sample Evaluation</h1>
		<h4>We provide the best evaluation quality in the industry</h4>
	</div>
	<div class="sample-files-container">
		{#each sampleFilesToShow as file}
			<div class="sample-files-card">
				<PdfIcon height={64} width={64} color="#d74e09" />
				<h3>{file.name}</h3>
				<a href={file.url} target="_blank">
					<Button type="submit" label="View" />
				</a>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	.sample-files {
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		align-items: center;
		position: relative;
		min-height: 40vh;
		width: 100%;
		background: url('/lib/grid-file.svg') no-repeat center center;
		margin-bottom: 2em;
		border-radius: 1em;
		padding: 5%;

		.heading {
			z-index: 10;
			line-height: 1.2;
			font-weight: 500;
			letter-spacing: -0.02em;
			text-align: center;
			margin-bottom: 5em;

			h1 {
				font-size: 3em;
				margin-bottom: 0.3em;
			}

			h4 {
				font-size: 1em;
				margin-bottom: 1em;
			}
		}
		.sample-files-container {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-evenly;
			align-items: center;
			gap: 1em;
			margin-bottom: 5em;
			width: 100%;

			.sample-files-card {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				a {
					text-decoration: none;
				}
			}
		}

		@media only screen and (max-width: 768px) {
			.heading {
				margin-bottom: 2.5em;
				h1 {
					font-size: 2em;
				}

				h4 {
					font-size: 0.8em;
				}
			}
			.sample-files-container {
				.sample-files-card {
					flex-direction: row;
					gap: 1em;

					h3 {
						font-size: 0.9em;
					}
				}
			}
		}
	}
</style>
