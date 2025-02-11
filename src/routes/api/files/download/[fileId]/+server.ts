import { PUBLIC_APPWRITE_BUCKET } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals: { storage }, params }) => {
    const fileId = params.fileId!;
    const fileData = await storage.getFileDownload(PUBLIC_APPWRITE_BUCKET, fileId)
    return new Response(fileData, {
        headers: {
            'Content-Type': 'attachment',
            'Content-Disposition': `attachment; filename="${fileId}.pdf"`
        }
    });
}