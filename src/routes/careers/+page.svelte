<script>
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import Background from '$lib/components/atoms/Background.svelte'
	import Button from '$lib/components/atoms/Button.svelte'
	import HomeFooter from '$lib/components/homePage/HomeFooter.svelte'

	const evaluatorRoles = [
		{
			title: 'BPSC/UPSC Mains Paper Evaluator',
			description:
				'Contribute to the critical process of evaluating competitive examination answer sheets for civil service aspirants.',
			responsibilities: [
				'Systematically evaluate BPSC and UPSC mains examination answer papers',
				'Apply standardized marking criteria with precision and objectivity',
				'Provide detailed and fair assessment of candidate responses',
				'Maintain strict confidentiality of evaluation process'
			],
			requirements: [
				'Advanced degree in relevant discipline',
				'Exceptional subject matter expertise',
				'Strong analytical and critical evaluation skills',
				'Ability to maintain consistent and unbiased scoring',
				'Familiarity with BPSC and UPSC examination patterns'
			]
		}
	]
</script>

<Background />
<section class="careers-page">
	<h1>Careers in Unlock Mains</h1>
	<h4>
		We are always on the lookout for talented individuals to join our growing team. Please see our
		open vacancies below
	</h4>

	{#each evaluatorRoles as role}
		<div class="job-title">
			<div class="job-title-description">
				<h2 class="title">{role.title}</h2>
				<p class="description">{role.description}</p>

				<div class="job-responsibility">
					<div>
						<h3 class="job-re-title">Responsibilities:</h3>
						<ul class="job-re-points">
							{#each role.responsibilities as responsibility}
								<li>{responsibility}</li>
							{/each}
						</ul>
					</div>

					<div>
						<h3 class="job-re-title">Requirements:</h3>
						<ul class="job-re-points">
							{#each role.requirements as requirement}
								<li>{requirement}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>

			<div class="job-button">
				<Button
					type="register"
					label="Apply"
					onClick={() => {
						browser && localStorage.setItem('userType', 'evaluator')
						goto('/login')
					}}
				/>
			</div>
		</div>
	{/each}
</section>
<HomeFooter />

<style lang="scss">
	.careers-page {
		max-width: 1200px;
		margin: 0 auto;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1em;

		h1 {
			font-size: 3em;
		}

		.job-title {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1em;

			.job-title-description {
				display: flex;
				flex-direction: column;
				padding: 1em;

				.title {
					font-size: 1.5em;
					font-weight: bold;
					margin-bottom: 1em;
				}

				.description {
					margin-bottom: 1em;
				}

				.job-responsibility {
					display: grid;
					gap: 1.5rem;

					.job-re-title {
						font-weight: 600;
						margin-bottom: 0.5rem;
					}

					.job-re-points {
						list-style-type: disc;
						padding-left: 1.25rem;
					}
				}

				@media (min-width: 768px) {
					.job-responsibility {
						grid-template-columns: repeat(2, 1fr);
					}
				}
			}

			.job-button {
				width: 15em;
			}
		}
	}
</style>
