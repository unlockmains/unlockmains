<script lang="ts">
	import Background from '$lib/components/atoms/Background.svelte'

	let formData = {
		name: '',
		rollNumber: '',
		phone: '',
		qualification: '',
		marksheet: null
	}

	const handleFileUpload = (event: any) => {
		formData.marksheet = event.target.files[0]
	}

	const handleSubmit = (event: any) => {
		event.preventDefault()
		console.log('Form Data:', formData)
		// Add your form submission logic here
	}
</script>

<Background />
<div class="evaluation-register">
	<h2>Student Details</h2>
	<form on:submit={handleSubmit}>
		<div class="form-group">
			<label for="name">Name</label>
			<input
				id="name"
				type="text"
				bind:value={formData.name}
				placeholder="Enter your name"
				required
			/>
		</div>

		<div class="form-group">
			<label for="rollNumber">Roll Number</label>
			<input
				id="rollNumber"
				type="text"
				bind:value={formData.rollNumber}
				placeholder="Enter your roll number"
				required
			/>
		</div>

		<div class="form-group">
			<label for="phone">Phone</label>
			<input
				id="phone"
				type="tel"
				bind:value={formData.phone}
				placeholder="Enter your phone number"
				required
			/>
		</div>

		<div class="form-group">
			<label for="qualification">Qualification</label>
			<select id="qualification" bind:value={formData.qualification} required>
				<option value="" disabled selected>Select your qualification</option>
				<option value="High School">High School</option>
				<option value="Bachelor's">Bachelor's</option>
				<option value="Master's">Master's</option>
				<option value="PhD">PhD</option>
			</select>
		</div>

		<div class="form-group">
			<label for="marksheet">Marksheet</label>
			<input
				id="marksheet"
				type="file"
				accept=".pdf,.jpg,.jpeg,.png"
				on:change={handleFileUpload}
				required
			/>
		</div>

		<button class="submit-button" type="submit">Submit</button>
	</form>
</div>

<style lang="scss">
	.evaluation-register {
		max-width: 500px;
		margin: 0 auto;
		padding: 20px;
		border: 1px solid #ccc;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		position: relative;

		h2 {
			text-align: center;
			margin-bottom: 20px;
		}
	}

	.form-group {
		margin-bottom: 15px;
	}

	.form-group label {
		display: block;
		margin-bottom: 5px;
		font-weight: bold;
	}

	.form-group input,
	.form-group select {
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 16px;
	}

	.form-group input[type='file'] {
		padding: 5px;
	}

	.submit-button {
		width: 100%;
		padding: 10px;
		background-color: #007bff;
		color: #fff;
		border: none;
		border-radius: 4px;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	.submit-button:hover {
		background-color: #0056b3;
	}
</style>
