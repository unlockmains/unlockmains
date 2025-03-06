import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase }, params, url }) => {
    const fileId = params.fileId!;
    const type = url.searchParams.get('type');
    const storageBucket = type === 'evaluation' ? "evaluations" : "submissions";
    // const { data, error } = await supabase.storage.from(storageBucket).download(fileId);
    const { data, error } = await supabase.storage.from(storageBucket).download(fileId);
    if (error) {
        console.error("error", error)
        return new Response(JSON.stringify({ error: error.message }), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    return new Response(data);
}