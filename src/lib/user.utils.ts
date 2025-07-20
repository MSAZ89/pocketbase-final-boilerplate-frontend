import type { RecordModel } from 'pocketbase';
import pb from '$lib/pocketbase.svelte';

export async function updateUserField(userId: string, field: string, value: any) {
	return await pb.collection('users').update(userId, {
		[field]: value
	});
}
