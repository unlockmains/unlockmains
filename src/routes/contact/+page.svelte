<script>
	import Background from '$lib/components/atoms/Background.svelte'
	import HomeFooter from '$lib/components/homePage/HomeFooter.svelte'
</script>

<svelte:head>
	<title>Contact Us - Unlock Mains</title>
	<meta
		name="description"
		content="Contact us to know more about Unlock Mains and you can take full advantage of the services."
	/>
	<meta property="og:title" content="Contact Us" />
	<meta
		property="og:description"
		content="Contact us to know more about Unlock Mains and you can take full advantage of the services."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://unlockmains.com/contact" />
</svelte:head>

<Background />
<div class="contact">
	<h1>Contact Us</h1>
	<h2>Get in Touch</h2>
	<h4>We're eager to hear from you!</h4>
	<h4>Choose your inquiry type:</h4>
	<ul>
		<li>For Quick Resolution Call on - <a href="tel:+919220252724">+919220252724</a></li>
		<li>
			General Question - <a href="https://unlockmains.com" target="_blank">UnlockMains</a>
		</li>
		<li>
			Telegram Channel - <a href="https://t.me/UnlockMains" target="_blank">Telegram Channel</a>
		</li>
		<li>
			Telegram Message - <a href="https://t.me/Unlock_Mains" target="_blank">Message on Telegram</a>
		</li>
		<li>
			Technical Support - <a href="mailto:support@unlockmains.com">support@unlockmains.com</a>
		</li>
		<li>
			Feedback/Suggestions - <a href="mailto:feedback@unlockmains.com">feedback@unlockmains.com</a>
		</li>
		<li>
			Simply Drop us an email at - <a href="mailto:contact@unlockmains.com"
				>contact@unlockmains.com</a
			>
		</li>
		<li>Meet us at - RZP 51B, Raj Nagar Part - 2, Palam, Dwarka Sector -8, New Delhi - 110077</li>
	</ul>
</div>
<HomeFooter />

<style lang="scss">
	.contact {
		max-width: 1200px;
		line-height: 1.2;
		font-weight: 500;
		letter-spacing: -0.02em;
		margin: 0 auto;
		padding: 5%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5em;

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

		@media only screen and (max-width: 768px) {
			padding: 1em 0.5em;
			h1 {
				font-size: 2em;
				margin-bottom: 0.5em;
			}
			h4 {
				font-size: 1em;
				margin-bottom: 0.5em;
			}
		}
	}
</style>
