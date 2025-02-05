<script>
	import Background from '$lib/components/atoms/Background.svelte'
	import HomeFooter from '$lib/components/homePage/HomeFooter.svelte'
</script>

<Background />
<div class="refund-policy">
	<h1>REFUND POLICY</h1>
	<h2>This website is operated by UTTARMANTR EDSOLUTION (OPC) PVT. LTD.</h2>
	<h4>FULL REFUND</h4>
	<p>
		Our policy lasts 2 days. If 2 days have gone by since your purchase, unfortunately, we can't
		offer you a full refund. To be eligible for a full refund, your Subscription should not have
		been utilized. (i.e., you should not have submitted single question for the evaluation)
	</p>
	<h4>PARTIAL REFUND</h4>
	<p>
		To be eligible for a partial refund of 50%, you should not have submitted more than 10 gs
		questions and 2 essays. You are not eligible for the partial refund after 10 days of the
		commencement of the plan. To complete your refund process, we require a receipt or proof of
		purchase.
	</p>
	<h4>LATE or MISSING REFUNDS</h4>
	<p>
		If you haven't received a refund yet, first check your bank account again. Then contact your
		credit card company, it may take some time before your refund is officially posted. Next,
		contact your bank. There is often some processing time before a refund is posted. If you have
		done all of this and you still have not received your refund yet, please contact us at
		UnlockMains on <a href="mailto:refund@unlockmains.com">refund@unlockmains.com</a>
	</p>
</div>
<HomeFooter />

<style lang="scss">
	.refund-policy {
		font-family: Archivo, sans-serif;
		line-height: 1.2;
		font-weight: 500;
		letter-spacing: -0.02em;
		padding: 2% 5%;
		position: relative;

		h1 {
			font-size: 3em;
			margin-bottom: 0.3em;
		}

		h4 {
			font-size: 1.5em;
			margin-bottom: 1em;
		}

		p {
			line-height: 1.5;
			letter-spacing: 0.02em;
		}

		@media only screen and (max-width: 768px) {
			h1 {
				font-size: 2em;
			}
			h4 {
				font-size: 1em;
			}
		}
	}
</style>
