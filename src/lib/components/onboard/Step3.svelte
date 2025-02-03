<script lang="ts">
	export let formData: any
	export let nextStep: () => void
	export let prevStep: () => void

	function validate() {
		if (!formData.name || !formData.phoneNumber) {
			alert('Please fill out all required fields.')
			return false
		}
		return true
	}
</script>

<div class="form-group">
	<label for="name">Name</label>
	<input type="text" id="name" bind:value={formData.name} />
</div>

<div class="form-group">
	<label for="phoneNumber">Phone Number</label>
	<input type="text" id="phoneNumber" bind:value={formData.phoneNumber} />
</div>

<!-- Add other fields here -->

<button on:click={() => validate() && nextStep()}>Next</button>
<button on:click={() => validate() && prevStep()}>Back</button>

<style lang="scss">
	.form-group {
		margin-bottom: 15px;
	}

	label {
		display: block;
		margin-bottom: 5px;
	}

	input,
	select {
		width: 100%;
		padding: 8px;
		box-sizing: border-box;
	}
</style>
