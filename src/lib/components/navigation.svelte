<script>
	import { onMount } from 'svelte';
	import { auth, waitForAuth } from '$lib/pocketbase.svelte';
	import Themecontroller from './themecontroller.svelte';

	let isMenuOpen = $state(false);
	let authReady = $state(false);

	// Wait for auth to be fully initialized
	onMount(async () => {
		await waitForAuth();
		authReady = true;
	});

	// Close mobile menu when clicking a link
	const closeMenu = () => {
		isMenuOpen = false;
	};
</script>

<nav
	class="w-full border-b border-primary bg-primary shadow-md"
	class:opacity-0={auth.isLoading}
	class:opacity-100={!auth.isLoading}
	style="transition: opacity 0.15s ease-in-out;"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<a href="/" class="flex-shrink-0" aria-label="Home">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						class="stroke-primary-content"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<circle cx="12" cy="12" r="3"></circle>
					</svg>
				</a>
			</div>

			<!-- Mobile menu button -->
			<div class="flex items-center md:hidden">
				<button
					class="hover:bg-primary-focus inline-flex items-center justify-center rounded-md p-2 text-primary-content focus:outline-none focus:ring-2 focus:ring-primary-content"
					onclick={() => (isMenuOpen = !isMenuOpen)}
					aria-label="Toggle menu"
					aria-expanded={isMenuOpen}
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if !isMenuOpen}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						{:else}
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						{/if}
					</svg>
				</button>
			</div>

			<!-- Desktop menu -->
			<div class="hidden md:flex md:items-center md:space-x-4">
				{#if !authReady}
					<!-- Loading skeleton for navigation -->
					<div class="flex space-x-4">
						<div class="h-8 w-16 animate-pulse rounded bg-primary-content/20"></div>
						<div class="h-8 w-20 animate-pulse rounded bg-primary-content/20"></div>
					</div>
				{:else if !auth.isAuthenticated}
					<a
						href="/login"
						class="hover:bg-primary-focus rounded-md px-3 py-2 text-sm font-medium text-primary-content transition-colors"
						aria-label="Login"
					>
						Login
					</a>
					<a
						href="/register"
						class="hover:bg-primary-focus rounded-md px-3 py-2 text-sm font-medium text-primary-content transition-colors"
						aria-label="Register"
					>
						Register
					</a>
				{:else}
					<a
						href="/dashboard"
						class="hover:bg-primary-focus rounded-md px-3 py-2 text-sm font-medium text-primary-content transition-colors"
						aria-label="Dashboard"
					>
						Dashboard
					</a>
					<span class="text-sm text-primary-content/70">
						Welcome, {auth.user?.email}
					</span>
				{/if}
				<Themecontroller />
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="md:hidden">
			<div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
				{#if !authReady}
					<!-- Loading skeleton for mobile menu -->
					<div class="space-y-2">
						<div class="h-8 w-full animate-pulse rounded bg-primary-content/20"></div>
						<div class="h-8 w-full animate-pulse rounded bg-primary-content/20"></div>
					</div>
				{:else if !auth.isAuthenticated}
					<a
						href="/login"
						class="hover:bg-primary-focus block rounded-md px-3 py-2 text-base font-medium text-primary-content transition-colors"
						aria-label="Login"
						onclick={closeMenu}
					>
						Login
					</a>
					<a
						href="/register"
						class="hover:bg-primary-focus block rounded-md px-3 py-2 text-base font-medium text-primary-content transition-colors"
						aria-label="Register"
						onclick={closeMenu}
					>
						Register
					</a>
				{:else}
					<a
						href="/dashboard"
						class="hover:bg-primary-focus block rounded-md px-3 py-2 text-base font-medium text-primary-content transition-colors"
						aria-label="Dashboard"
						onclick={closeMenu}
					>
						Dashboard
					</a>
					<div class="px-3 py-2 text-sm text-primary-content/70">
						Welcome, {auth.user?.email}
					</div>
				{/if}
				<div class="px-3 py-2">
					<Themecontroller />
				</div>
			</div>
		</div>
	{/if}
</nav>
