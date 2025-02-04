<script>
	import SocialsIcon from '../icons/SocialsIcon.svelte'

	const quickLinks = [
		{ text: 'Home', href: '/' },
		{ text: 'Terms of Service', href: '/quick-links/terms-of-service' },
		{ text: 'Refund Policy', href: '/quick-links/refund-policy' },
		{ text: 'Privacy Policy', href: '/quick-links/privacy-policy' }
	]

	const companyLinks = [
		{ text: 'About', href: '/about' },
		{ text: 'Pricing', href: '/pricing' },
		{ text: 'Contact', href: '/contact' }
	]

	const accountLinks = [
		{ text: 'Login', href: '/login' },
		{ text: 'Careers', href: '/careers' }
	]

	const socialLinks = [
		{ platform: 'Youtube', href: 'https://www.youtube.com/@unlockMains', icon: 'youtube' },
		{
			platform: 'Linkedin',
			href: 'https://www.linkedin.com/in/unlock-mains-56839b329/',
			icon: 'linkedin'
		},
		{ platform: 'Instagram', href: 'https://www.instagram.com/unlockmains/', icon: 'instagram' }
	]
</script>

<footer class="footer">
	<div class="footer-content">
		<div class="footer-brand">
			<div class="brand-header">
				<img src="/um-main.png" alt="logo 1" style="height: 5em" />
				<img src="/um-text.png" alt="logo 1" style="height: 2em" />
			</div>

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
				<a href={social.href} class="social-link" aria-label={social.platform} target="_blank">
					<span class="sr-only">{social.platform}</span>
					<SocialsIcon type={social.icon} />
				</a>
			{/each}
		</div>
	</div>
</footer>

<style>
	.footer {
		max-width: 1200px;
		margin: auto;
		padding: 1% 5%;
		margin-top: 5rem;
		background-color: white;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		position: relative;
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
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.2em;
		background-color: var(--custom-color-brand);
		border-radius: 1em;
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
