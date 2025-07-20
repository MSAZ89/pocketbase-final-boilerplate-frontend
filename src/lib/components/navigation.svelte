<script>
	import { onMount } from 'svelte';
	import { auth, waitForAuth, logout } from '$lib/pocketbase.svelte';
	import Themecontroller from './themecontroller.svelte';

	let isDropdownOpen = $state(false);
	let authReady = $state(false);

	// Wait for auth to be fully initialized
	onMount(async () => {
		await waitForAuth();
		authReady = true;
	});

	// Close dropdown when clicking outside
	const closeDropdown = () => {
		isDropdownOpen = false;
	};

	// Handle dropdown toggle
	const toggleDropdown = () => {
		isDropdownOpen = !isDropdownOpen;
	};
</script>

<!-- Click outside to close dropdown -->
{#if isDropdownOpen}
	<button
		type="button"
		class="fixed inset-0 z-10 cursor-default bg-transparent"
		onclick={closeDropdown}
		onkeydown={(e) => e.key === 'Escape' && closeDropdown()}
		aria-label="Close dropdown menu"
	></button>
{/if}

<nav
	class="w-full border-b border-primary bg-primary shadow-md"
	class:opacity-0={auth.isLoading}
	class:opacity-100={!auth.isLoading}
	style="transition: opacity 0.15s ease-in-out;"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Left: App Icon -->
			<div class="flex items-center">
				<a href="/" class="flex-shrink-0" aria-label="Home">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="28"
						height="28"
						viewBox="0 0 24 24"
						fill="none"
						class="stroke-primary-content transition-colors hover:stroke-primary-content/80"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<circle cx="12" cy="12" r="3"></circle>
					</svg>
				</a>
			</div>

			<!-- Center: Pricing Builder Link -->
			<div class="flex items-center">
				<a
					href="/pricing-builder"
					class="text-lg font-semibold text-primary-content transition-colors hover:text-primary-content/80"
					aria-label="Pricing Builder"
				>
					Pricing Builder
				</a>
			</div>

			<!-- Right: User Dropdown & Theme Controller -->
			<div class="flex items-center space-x-4">
				<Themecontroller />

				<!-- User Dropdown -->
				<div class="relative">
					{#if !authReady}
						<!-- Loading skeleton -->
						<div class="h-8 w-8 animate-pulse rounded-full bg-primary-content/20"></div>
					{:else}
						<button
							class="flex items-center rounded-full p-2 text-primary-content transition-colors hover:bg-primary-content/10 focus:outline-none focus:ring-2 focus:ring-primary-content/50"
							onclick={toggleDropdown}
							aria-label="User menu"
							aria-expanded={isDropdownOpen}
						>
							<!-- User Icon -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								class="stroke-current"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
								<circle cx="12" cy="7" r="4"></circle>
							</svg>
						</button>

						<!-- Dropdown Menu -->
						{#if isDropdownOpen}
							<div
								class="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5"
							>
								<div class="py-1">
									{#if !auth.isAuthenticated}
										<a
											href="/login"
											class="block px-4 py-2 text-sm text-base-content transition-colors hover:bg-base-200"
											onclick={closeDropdown}
										>
											Login
										</a>
										<a
											href="/register"
											class="block px-4 py-2 text-sm text-base-content transition-colors hover:bg-base-200"
											onclick={closeDropdown}
										>
											Register
										</a>
									{:else}
										<div class="border-b border-base-300 px-4 py-2 text-xs text-base-content/60">
											{auth.user?.email}
										</div>
										<a
											href="/dashboard"
											class="block px-4 py-2 text-sm text-base-content transition-colors hover:bg-base-200"
											onclick={closeDropdown}
										>
											Dashboard
										</a>
										<button
											class="block w-full px-4 py-2 text-left text-sm text-base-content transition-colors hover:bg-base-200"
											onclick={() => {
												logout();
												closeDropdown();
											}}
										>
											Logout
										</button>
									{/if}
								</div>
							</div>
						{/if}
					{/if}
				</div>
			</div>
		</div>
	</div>
</nav>
