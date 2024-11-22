<script lang="ts">
	export let bannerText: string = 'This space can be used for banner.'
</script>

<div class="banner">
	<div class="left-banner-img" />
	{bannerText}
	<div class="right-banner-img" />
</div>

<style lang="scss">
	.banner {
		background-color: #151514;
		color: white;
		height: 3.5em;
		text-align: center;
		align-content: center;
		font-size: 0.9em;
		padding: 1em 5%;
		position: fixed;
		width: 100%;
		z-index: 10;

		.left-banner-img {
			position: absolute;
			left: 0;
			top: 0;
			width: 25%;
			height: 100%;
			background: url('/lib/banner-bg.svg') no-repeat center center;
			background-size: cover;
		}

		.right-banner-img {
			position: absolute;
			right: 0;
			top: 0;
			width: 25%;
			height: 100%;
			background: url('/lib/banner-bg.svg') no-repeat center center;
			background-size: cover;
			transform: scaleX(-1);
		}
	}
</style>
