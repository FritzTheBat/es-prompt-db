<script>
	import { page } from '$app/stores';
	import { isAdmin, user } from "$lib/user";
	import { supabase } from "$lib/db";
	import { base } from "$app/paths";

</script>

<header>
	<div class="corner">

	</div>

	<nav>

		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="{base}/">Home</a>
			</li>

			{#if $user}
				<li class="ml-10 text-primary">
					<a href="#" on:click={async () => {
						const { error } = await supabase.auth.signOut();
						if (error) console.log("Error logging out:", error.message);
					}}>Logout</a>
				</li>
			{/if}
			 
 

		</ul>

	</nav>

	<div class="corner">

	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;

	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
