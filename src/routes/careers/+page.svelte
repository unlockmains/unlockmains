<script>
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

<div class="container mx-auto p-6">
	<h1 class="text-3xl font-bold mb-6 text-center">Careers in AI Evaluation</h1>

	{#each evaluatorRoles as role}
		<div class="bg-white shadow-md rounded-lg mb-6 overflow-hidden">
			<div class="p-6">
				<h2 class="text-2xl font-bold mb-4">{role.title}</h2>
				<p class="mb-4">{role.description}</p>

				<div class="grid md:grid-cols-2 gap-6">
					<div>
						<h3 class="font-semibold mb-2">Responsibilities:</h3>
						<ul class="list-disc pl-5">
							{#each role.responsibilities as responsibility}
								<li>{responsibility}</li>
							{/each}
						</ul>
					</div>

					<div>
						<h3 class="font-semibold mb-2">Requirements:</h3>
						<ul class="list-disc pl-5">
							{#each role.requirements as requirement}
								<li>{requirement}</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>

			<div class="p-6 bg-gray-50">
				<button
					class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
				>
					Apply Now
				</button>
			</div>
		</div>
	{/each}
</div>

<style>
	.container {
		max-width: 1200px;
	}
</style>
