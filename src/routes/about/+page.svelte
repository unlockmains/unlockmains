<script>
	import Background from '$lib/components/atoms/Background.svelte'
	import HomeFooter from '$lib/components/homePage/HomeFooter.svelte'
</script>

<Background />
<div class="about-us">
	<h1>About Us</h1>
	<p>
		We're passionate about giving Quality Evaluation and dedicated to providing relevant quick to
		inculcate feedback in your Answer.
	</p>
	<p>
		Our mission is to Unlock Mains, empowering Aspirants to achieve his/her Goal to become Officers.
	</p>
	<p>
		With the Evaluators themselves clearing Mains, we've honed our expertise to deliver what fresher
		or competent Aspirants desires to be one.
	</p>
	<p>Get to know the team behind the innovation or Join us on our journey to Unlock your Mains.</p>
	<h4>This website is operated by UTTARMANTR EDSOLUTION (OPC) PVT. LTD.</h4>
</div>

<HomeFooter />

<style lang="scss">
	.about-us {
		max-width: 1200px;
		line-height: 1.2;
		font-weight: 500;
		letter-spacing: -0.02em;
		padding: 5%;
		margin: 0 auto;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5em;

		h1 {
			font-size: 3em;
			margin-bottom: 0.3em;
		}

		h4 {
			font-size: 1em;
			margin-bottom: 1em;
		}

		p {
			line-height: 1.5;
			letter-spacing: 0.02em;
		}
	}
</style>
