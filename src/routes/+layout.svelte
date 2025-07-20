<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/navigation.svelte';
	let { children } = $props();
</script>

<main class="flex flex-col items-center justify-center bg-base-200">
	<div
		class="container mx-auto flex min-h-screen w-full flex-col items-center justify-start bg-primary-content"
	>
		<Navigation />
		{@render children()}
	</div>
</main>
