<script lang="ts">
    let popoverContent: HTMLDivElement;
    let showPopoverContent: boolean = false;
    const showPopover = () => {
        showPopoverContent = !showPopoverContent
    }
</script>

<div class="popover">
	<img src="https://picsum.photos/200" alt="User" on:click={showPopover} />
	<div class="popover-content" bind:this={popoverContent} class:show={showPopoverContent}>
		<div class="arrow"></div>
		<ul>
			<li><a href="#account">Account</a></li>
			<li><a href="#profile">Profile</a></li>
			<li><a href="#logout">Logout</a></li>
		</ul>
	</div>
</div>

<style lang="scss">
	.popover {
		position: relative;
		float: right;

		img {
			cursor: pointer;
			width: 3em;
			height: 3em;
			border-radius: 50%;
		}

		.popover-content {
			display: none;
			position: absolute;
			top: 60px;
			left: 0;
			background-color: white;
			border: 1px solid #ccc;
			border-radius: 4px;
			box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
			z-index: 1000;
			opacity: 0;
			transform: translateY(10px);
			transition:
				opacity 0.2s ease,
				transform 0.2s ease;

			&.show {
				display: block;
				opacity: 1;
				transform: translate(-50px, 0);
			}

			.arrow {
				position: absolute;
				top: -10px;
				right: 0%;
				transform: translateX(-50%);
				width: 0;
				height: 0;
				border-left: 10px solid transparent;
				border-right: 10px solid transparent;
				border-bottom: 10px solid white;
			}

			ul {
				list-style: none;
				padding: 10px;
				margin: 0;

				li {
					padding: 5px 10px;

					a {
						text-decoration: none;
						color: black;
					}
					&:hover {
						background-color: #f0f0f0;
					}
				}
			}
		}
	}
</style>
