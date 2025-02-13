import { PUBLIC_APPWRITE_BUCKET, PUBLIC_APPWRITE_EVALUATED_FILES_BUCKET } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { storage }, params, url }) => {
    const fileId = params.fileId!;
    const type = url.searchParams.get('type');
    const storageBucket = type === 'evaluation' ? PUBLIC_APPWRITE_EVALUATED_FILES_BUCKET : PUBLIC_APPWRITE_BUCKET;
    const fileData = await storage.getFileView(storageBucket, fileId)
    return new Response(fileData, {
        headers: {
            'Content-Type': 'application/octet-stream',
        }
    });
}