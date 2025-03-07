import { PUBLIC_APPWRITE_BUCKET, PUBLIC_APPWRITE_EVALUATED_FILES_BUCKET } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { supabase }, request }) => {
    const req = await request.json();
    const fileId = req.fileId;
    const type = req.type;
    const storageBucket = type === 'evaluation' ? "evaluations" : "submissions";
    const { data, error } = await supabase.storage.from(storageBucket).download(fileId);
    if (error) {
        console.error("error", error)
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