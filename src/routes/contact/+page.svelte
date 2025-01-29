<script>
	import Background from '$lib/components/atoms/Background.svelte'
	import HomeFooter from '$lib/components/homePage/HomeFooter.svelte'
</script>

<Background />
<div class="contact">
	<h1>Contact Us</h1>
	<h2>Get in Touch</h2>
	<h4>We're eager to hear from you!</h4>
	<h4>Choose your inquiry type:</h4>
	<ul>
		<li>
			General Question - <a href="https://t.me/SamanShamim" target="_blank">UnlockMains</a> /
			<a href="https://wa.me/+919470067051" target="_blank">+919470067051</a>
		</li>
		<li>Technical Support - <a href="mailto:unlockmains@gmail.com">unlockmains@gmail.com</a></li>
		<li>Feedback/Suggestions - <a href="mailto:unlockmains@gmail.com">Feedback UnlockMains</a></li>
		<li>
			Simply Drop us an email at - <a href="mailto:unlockmains@gmail.com">unlockmains@gmail.com</a>
		</li>
		<li>Meet us at - RZP 51B, Raj Nagar Part - 2, Palam, Dwarka Sector -8, New Delhi - 110077</li>
	</ul>
</div>
<HomeFooter />

<style lang="scss">
	.contact {
		font-family: Archivo, sans-serif;
		line-height: 1.2;
		font-weight: 500;
		letter-spacing: -0.02em;
		margin-bottom: 5em;
		padding: 5%;
		position: relative;

		h1 {
			font-size: 3em;
			margin-bottom: 0.3em;
		}

		h4 {
			font-size: 1.5em;
			margin-bottom: 1em;
		}

		ul {
			line-height: 1.5;
			letter-spacing: 0.02em;
		}
	}
</style>
