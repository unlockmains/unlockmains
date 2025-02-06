<script lang="ts">
	export let currentStep: number
</script>

<div class="timeline">
	<div class="step {currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}">
		<div class="step-number">1</div>
		<div>Basic Info</div>
	</div>
	<div class="step {currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}">
		<div class="step-number">2</div>
		<div>Preference</div>
	</div>
	<div class="step {currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : ''}">
		<div class="step-number">3</div>
		<div>Assignment 1</div>
	</div>
	<div class="step {currentStep === 4 ? 'active' : currentStep > 4 ? 'completed' : ''}">
		<div class="step-number">4</div>
		<div>Assignment 2</div>
	</div>
	<div class="step {currentStep === 5 ? 'active' : currentStep > 5 ? 'completed' : ''}">
		<div class="step-number">5</div>
		<div>Complete</div>
	</div>
</div>

<style lang="scss">
	.timeline {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.step {
		text-align: center;
		flex: 1;
		position: relative;
	}

	.step::before {
		content: '';
		position: absolute;
		top: 20px;
		left: 0;
		right: 0;
		height: 2px;
		background: #ccc;
		z-index: -1;
	}

	.step:first-child::before {
		left: 50%;
	}

	.step:last-child::before {
		right: 50%;
	}

	.step.active::before {
		background: #007bff;
	}

	.step.completed::before {
		background: var(--color-green-700);
	}

	.step-number {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #ccc;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto 10px;
		color: #fff;
	}

	.step.active .step-number {
		background: #007bff;
	}
	.step.completed .step-number {
		background: var(--color-green-700);
	}
</style>
