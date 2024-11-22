<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../styles.css'
	import Header from '$lib/components/molecules/Header.svelte'
	import { Toaster } from 'svelte-sonner'
	import Banner from '$lib/components/atoms/Banner.svelte'

	export let data

	let { user } = data
	$: ({ user } = data)
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
		rel="stylesheet"
	/>
	<title>Unlock Mains</title>
</svelte:head>

<Banner />
<div class="bg-container">
	<div class="bg-image">
		<svg xmlns="http://www.w3.org/2000/svg" width="1590" height="810" fill="none"
			><path
				d="M1589 16c0 438.514-355.49 794-794 794C356.486 810 1 454.514 1 16c0-5.011.046-10.011.139-15H1588.86c.09 4.989.14 9.989.14 15z"
				fill="#FAF4F3"
			/><path
				d="M2 1c5.97 97.064 14.068 195.128 51.733 291.191 35.248 89.896 63.24 188.932 135.303 254.166 96.382 102.003 127.344 119.444 234.79 176.116 81.579 43.028 126.348 54.035 210.913 70.046 95.507 18.082 190.933 15.357 240.759 7.004 57.627-9.66 143.262-19.847 194.992-39.025 39.8-14.753 98.07-35.789 138.29-58.038 44.96-24.875 125.26-113.347 164.15-146.096 61.69-72.047 103.4-140.696 130.33-182.119 24.06-37.016 63.67-162.107 74.62-214.141 8.6-40.89 16.41-110.072 6.46-159.104"
				stroke="#F8E3E0"
				stroke-linecap="round"
				stroke-linejoin="round"
			/><path
				d="M1589 1c-5.97 96.943-14.08 194.885-51.77 290.829-35.27 89.785-63.28 188.698-135.38 253.851-96.45 101.876-127.43 119.296-234.94 175.896-81.63 42.975-126.43 53.969-211.047 69.959-95.568 18.06-191.054 15.338-240.911 6.996-57.663-9.648-143.352-19.822-195.118-38.977-39.82-14.734-98.129-35.744-138.374-57.966-44.993-24.843-125.342-113.206-164.257-145.914-61.721-71.958-103.466-140.521-130.41-181.893C62.714 336.812 23.08 211.876 12.13 159.907 3.524 119.067-4.296 49.971 5.66 1"
				stroke="#F8E3E0"
				stroke-linecap="round"
				stroke-linejoin="round"
			/></svg
		>
	</div>
	<div class="bg-image-1" />
</div>
<Header user={user ?? null} banner={true} />
<slot />

<Toaster richColors closeButton />

<style lang="scss">
	.bg-container {
		height: 100%;
		pointer-events: none;
		position: absolute;
		top: 5em;
		left: 0;
		width: 100%;
		z-index: 0;
		opacity: 0.6;
		.bg-image {
			animation: rotate 20s linear infinite;

			@keyframes rotate {
				0%,
				50%,
				100% {
					transform: skewX(0deg);
				}
				25% {
					transform: skewX(-10deg);
				}
				75% {
					transform: skewX(10deg);
				}
			}
		}
		.bg-image-1 {
			background: url('/lib/grid-bg.svg');
			height: 100%;
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
</style>
