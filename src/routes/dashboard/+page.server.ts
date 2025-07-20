import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { createServerPB } from '$lib/pocketbase.server';
import type { AppUser } from '$lib/types';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('pb_auth');
	if (!token) throw redirect(303, '/login');

	const pb = createServerPB(`pb_auth=${token}`);

	try {
		await pb.collection('users').authRefresh();
	} catch {
		throw redirect(303, '/login');
	}

	const model = pb.authStore.model;
	if (!model) throw redirect(303, '/login');

	const user: AppUser = {
		id: model.id,
		email: model.email,
		name: model.name || ''
	};

	return { user };
};
