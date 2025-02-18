import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: ['razorpay']
	},
	build: {
		commonjsOptions: {
			include: [/razorpay/, /node_modules/]
		}
	},
	ssr: {
		noExternal: ['razorpay']
	}
});
