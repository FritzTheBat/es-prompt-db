<script lang="ts">

	
	import Home from "$lib/Home.svelte";
</script>

<svelte:head>
	<title>Prompt DB | RSM - ES</title>
	<meta name="description" content="RSM - ES Prompt DB" />
</svelte:head>

<section>
	<div class="w-full">
		<Home  />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}


	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
