import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
export const prerender = false;
export const actions = {
	async default({ locals: { supabase }}) {
		await supabase.auth.signOut();
		throw redirect(303, '/');
	}
} satisfies Actions;