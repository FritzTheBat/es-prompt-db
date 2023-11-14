<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';

	import logo from '../assets/logo-rsm.svg';
	import { page } from '$app/stores';
  	import Toaster from '$lib/Toaster.svelte';
	import { base } from "$app/paths";
	import { browser } from '$app/environment'
	import { _, locale } from "$lib/i18n";
  	import { user } from '$lib/user';
  	import Auth from '$lib/Auth.svelte';


</script>

<div class="app bg-gray-200 min-w-full min-h-screen">
	<Header />

	<main class="flex ">

		<div class="card w-125 bg-base-100 shadow-xl  mx-auto  max-width" >
			<div class="yellow-shadow">
				<figure class="">
					<div class=" p-5 m-5">
						<a href="{base}/"><img src={logo} alt="ES Logo" class="w-full mt-4 -mb-14 mx-auto "></a>
					</div>
				</figure>
				<div class="card-body">
					<div class=" text-xl font-bold  uppercase  text-center pb-10 mb-1 align-center w-full" >
						<div class="text-primary">
							Prompt DB
						</div>
					</div>

					{#if $user}
						<slot />
					{:else}
						<div class=" flex items-center justify-center w-full">
							<Auth />
						</div>
					{/if}

				</div>
			</div>
		</div>
	</main>

	<footer>
		<!-- <p>{$_("Besuchen Sie")} <a target="_blank" href="https://www.ebnerstolz.de/de/update-transparenzregister-358298.html">ebnerstolz.de</a>
			{$_("für mehr Informationen zum Transparanzregister")}</p> -->
	</footer>

	<Toaster />

</div>


<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		justify-content: space-between;
		background: linear-gradient(327deg, #a4adbd30, transparent);
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	.max-width{
		max-width: 900px;
	}
	

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
