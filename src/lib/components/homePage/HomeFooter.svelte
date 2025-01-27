<script>
	const quickLinks = [
		{ text: 'Home', href: '/' },
		{ text: 'About', href: '/about' },
		{ text: 'Terms of Service', href: '/terms-of-service' },
		{ text: 'Refund Polciy', href: '/refund-policy' }
	]

	const companyLinks = [
		{ text: 'Pricing', href: '/pricing' },
		{ text: 'Contact', href: '/contact' }
	]

	const accountLinks = [
		{ text: 'Login', href: '/login' },
		{ text: 'Register', href: '/register' },
		{ text: 'Careers', href: '/careers' }
	]

	const socialLinks = [
		{ platform: 'Facebook', href: '#', icon: 'facebook' },
		{ platform: 'Twitter', href: '#', icon: 'twitter' },
		{ platform: 'Instagram', href: '#', icon: 'instagram' }
	]
</script>

<footer class="footer">
	<div class="footer-content">
		<div class="footer-brand">
			<div class="brand-header">
				<svg class="brand-logo" viewBox="0 0 24 24" fill="currentColor">
					<rect width="20" height="20" x="2" y="2" rx="2" />
				</svg>
				<span class="brand-name">Members</span>
			</div>
			<p class="brand-description">Unlock Mains</p>
			<a href="mailto:hello@members.com" class="brand-email">unlockmains@gmail.com</a>

			<div class="members-count">
				<div class="avatar-stack">
					{#each Array(3) as _, i}
						<div class="avatar" />
					{/each}
				</div>
				<span class="members-text">many people joining us</span>
			</div>
		</div>

		<div class="footer-nav">
			<h3 class="nav-title">Quick Links</h3>
			<ul class="nav-list">
				{#each quickLinks as link}
					<li>
						<a href={link.href} class="nav-link">{link.text}</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Company Links -->
		<div class="footer-nav">
			<h3 class="nav-title">Company</h3>
			<ul class="nav-list">
				{#each companyLinks as link}
					<li>
						<a href={link.href} class="nav-link">{link.text}</a>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Account Links -->
		<div class="footer-nav">
			<h3 class="nav-title">Account</h3>
			<ul class="nav-list">
				{#each accountLinks as link}
					<li>
						<a href={link.href} class="nav-link">{link.text}</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<!-- Footer Bottom -->
	<div class="footer-bottom">
		<p class="copyright">© UTTARMANTR EDSOLUTION (OPC) PVT. LTD.</p>

		<!-- Social Links -->
		<div class="social-links">
			{#each socialLinks as social}
				<a href={social.href} class="social-link" aria-label={social.platform}>
					<span class="sr-only">{social.platform}</span>
					{#if social.icon === 'facebook'}
						<svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
							<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
						</svg>
					{:else if social.icon === 'twitter'}
						<svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5 0-.28-.03-.56-.08-.83A7.72 7.72 0 0 0 23 3z"
							/>
						</svg>
					{:else if social.icon === 'instagram'}
						<svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M16 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4Z"
							/>
							<path
								d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
							/>
						</svg>
					{/if}
				</a>
			{/each}
		</div>
	</div>
</footer>

<style>
	.footer {
		margin: auto;
		padding: 1rem;
		margin-top: 5rem;
		position: relative;
		background-color: white;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.footer-content {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 2rem;
	}

	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.brand-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.brand-logo {
		width: 1.5rem;
		height: 1.5rem;
	}

	.brand-name {
		font-size: 1.25rem;
		font-weight: 600;
	}

	.brand-description {
		color: #666;
		margin: 0;
	}

	.brand-email {
		color: #6366f1;
		text-decoration: none;
	}

	.brand-email:hover {
		text-decoration: underline;
	}

	.members-count {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.avatar-stack {
		display: flex;
		margin-right: 0.5rem;
	}

	.avatar {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		border: 2px solid white;
		background-color: #e5e7eb;
		margin-left: -0.5rem;
	}

	.avatar:first-child {
		margin-left: 0;
	}

	.members-text {
		color: #666;
	}

	.footer-nav {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.nav-title {
		font-size: 1rem;
		font-weight: 600;
		margin: 0;
	}

	.nav-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.nav-link {
		color: #666;
		text-decoration: none;
		transition: color 0.2s;
	}

	.nav-link:hover {
		color: #000;
	}

	.footer-bottom {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid #e5e7eb;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.copyright {
		color: #666;
		font-size: 0.875rem;
		margin: 0;
	}

	.social-links {
		display: flex;
		gap: 1rem;
	}

	.social-link {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		border: 1px solid #e5e7eb;
		color: #666;
		transition: all 0.2s;
	}

	.social-link:hover {
		border-color: #9ca3af;
		color: #000;
	}

	.social-icon {
		width: 1.25rem;
		height: 1.25rem;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}

	@media (max-width: 768px) {
		.footer-content {
			grid-template-columns: 1fr;
		}

		.footer-bottom {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}
	}
</style>
