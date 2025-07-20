import PocketBase from 'pocketbase';
import type { RecordModel } from 'pocketbase';
import { browser } from '$app/environment';

// Create a reactive state object
export const auth = $state({
	user: null as RecordModel | null,
	isAuthenticated: false,
	isLoading: true
});

// Initialize PocketBase client
const pb = new PocketBase('http://127.0.0.1:8090');

// Initialize auth state from cookie if in browser
const initializeAuth = () => {
	if (!browser) {
		auth.isLoading = false;
		return;
	}

	// Check if we have a valid auth cookie
	const authCookie = document.cookie.split('; ').find((row) => row.startsWith('pb_auth='));

	if (authCookie) {
		try {
			const authData = JSON.parse(decodeURIComponent(authCookie.split('=')[1]));
			pb.authStore.save(authData.token, authData.model);

			if (pb.authStore.isValid) {
				auth.user = pb.authStore.model;
				auth.isAuthenticated = true;
			}
		} catch (error) {
			console.error('Failed to parse auth cookie:', error);
			// Clear invalid cookie
			document.cookie = 'pb_auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
	}

	auth.isLoading = false;
};

// Call initialization immediately
initializeAuth();

// Listen for auth changes
pb.authStore.onChange((_, model) => {
	auth.user = model;
	auth.isAuthenticated = !!model;

	// Update cookie when auth changes
	if (browser) {
		if (model) {
			const authData = {
				token: pb.authStore.token,
				model: pb.authStore.model
			};
			document.cookie = `pb_auth=${encodeURIComponent(JSON.stringify(authData))}; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`;
		} else {
			document.cookie = 'pb_auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		}
	}
});

export const login = async (email: string, password: string) => {
	try {
		const authData = await pb.collection('users').authWithPassword(email, password);
		console.log('Login Success:', authData);
		return authData;
	} catch (error) {
		console.error('Login failed:', error);
		throw error;
	}
};

export const signup = async (email: string, password: string) => {
	try {
		const record = await pb.collection('users').create({
			email: email,
			password: password,
			passwordConfirm: password
		});

		const authData = await pb.collection('users').authWithPassword(email, password);
		return authData;
	} catch (error) {
		console.error('Signup failed:', error);
		throw error;
	}
};

export const logout = async () => {
	try {
		pb.authStore.clear();
		// Cookie will be cleared automatically via onChange listener
		window.location.href = '/login';
	} catch (error) {
		console.error('Logout failed:', error);
	}
};

export const waitForAuth = () =>
	new Promise((resolve) => {
		const check = () => {
			if (!auth.isLoading) resolve(null);
			else setTimeout(check, 10);
		};
		check();
	});

export default pb;
