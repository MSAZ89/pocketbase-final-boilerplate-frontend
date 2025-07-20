import PocketBase from 'pocketbase';

export const createServerPB = (cookie: string) => {
	const pb = new PocketBase('http://127.0.0.1:8090');
	pb.authStore.loadFromCookie(cookie);

	return pb;
};
