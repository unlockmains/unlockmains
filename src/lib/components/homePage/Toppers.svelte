<script lang="ts">
	import Background from '../atoms/Background.svelte'
	import Button from '../atoms/Button.svelte'
</script>

<Background />
<section class="toppers">
	<div class="heading">
		<h1>Meet our Members and Toppers</h1>
		<h4>People who have excelled in the field</h4>
	</div>
	<div class="toppers-container">
		<div class="toppers-card">
			<img src="lib/topper1.png" alt="topper 1" />
			<div class="toppers-card-content">
				<h3>Topper 1</h3>
				<h4>AIR: 40</h4>
				<Button type="link" label="Testimony" />
			</div>
		</div>
		<div class="toppers-card">
			<img src="lib/topper1.png" alt="topper 1" />
			<div class="toppers-card-content">
				<h3>Topper 1</h3>
				<h4>AIR: 40</h4>
				<Button type="link" label="Testimony" />
			</div>
		</div>
		<div class="toppers-card">
			<img src="lib/topper1.png" alt="topper 1" />
			<div class="toppers-card-content">
				<h3>Topper 1</h3>
				<h4>AIR: 40</h4>
				<Button type="link" label="Testimony" />
			</div>
		</div>
		<div class="toppers-card">
			<img src="lib/topper1.png" alt="topper 1" />
			<div class="toppers-card-content">
				<h3>Topper 1</h3>
				<h4>AIR: 40</h4>
				<Button type="link" label="Testimony" />
			</div>
		</div>
	</div>
	<div style="width: 10em">
		<Button type="register" label="View All" />
	</div>
</section>

<style lang="scss">
	.toppers {
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		align-items: center;
		background: url('/lib/grid-topper.svg') no-repeat center center;
		position: relative;
		min-height: 80vh;
		width: 100%;
		margin-bottom: 1em;
		.heading {
			z-index: 10;
			font-family: Archivo, sans-serif;
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
		.toppers-container {
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			align-items: center;
			gap: 1em;
			margin-bottom: 5em;
			width: 100%;
			.toppers-card {
				border: 1px solid black;
				width: auto;
				height: 100%;
				z-index: 1;
				margin-bottom: 1em;
				display: flex;
				flex-direction: column;
				padding: 2em;
				gap: 2em;
				border-radius: 1em;
				background: var(--custom-bg-color);
				box-shadow: 0 10px 0 0 rgba(0, 0, 0, 1);
				width: 20%;
				align-items: center;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
				.toppers-card-content {
					display: flex;
					flex-flow: column;
					justify-content: center;
					align-items: center;
					gap: 0.5em;
					h3 {
						font-size: 1.5em;
						line-height: 1.2;
						font-weight: 500;
						letter-spacing: -0.02em;
						padding: 0;
						margin: 0;
					}
				}
			}
		}
	}
</style>
