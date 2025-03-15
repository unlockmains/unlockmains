import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabase } }) => {
    const { data, error } = await supabase.storage.from("sample_files").download("evaluator_assignment/Assignment_1.pdf");

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
    return new Response(data, {
        headers: {
            'Content-Type': 'application/octet-stream',
        }
    });
}