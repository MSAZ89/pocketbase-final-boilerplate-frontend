<script lang="ts">
	import type { AppUser } from '$lib/types.js';
	export let data: { user: AppUser | null };
	import { logout } from '$lib/pocketbase.svelte';

	let user = data?.user;
</script>

<div class="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
	<div class="mb-4 flex items-center justify-center">
		<h1 class="text-2xl font-semibold tracking-wide text-primary">
			<span class="text-base-content">
				Welcome back, {user?.name ?? 'Guest'}.
			</span>
		</h1>
	</div>

	<div class="mx-auto max-w-lg rounded-lg bg-base-100 p-6 shadow-lg">
		{#if user}
			<div class="text-center">
				<button class="btn btn-primary btn-sm" on:click={() => logout()}> Logout </button>
			</div>
		{:else}
			<p class="text-error">User data not available.</p>
		{/if}
	</div>
</div>
