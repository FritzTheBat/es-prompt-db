import { supabase } from '$lib/db.js';

export async function load({ params }) {

    const {data} = await supabase.from("prompt_subjects").select("*").eq("id", parseInt(params.slug)).single()
	return {
		subject: data!
	}
}