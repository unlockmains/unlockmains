import { PUBLIC_APPWRITE_EVALUATOR_LEAD_ASSIGNMENT } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';
import { Query } from 'node-appwrite';

export const POST: RequestHandler = async ({ locals: { storage } }) => {
    const assignment1 = await storage.listFiles(PUBLIC_APPWRITE_EVALUATOR_LEAD_ASSIGNMENT, [Query.equal("name", "Assignment_2.pdf")]);

    if (assignment1.total === 0) {
        return new Response('File not found', { status: 404 });
    }

    const fileData = await storage.getFileDownload(PUBLIC_APPWRITE_EVALUATOR_LEAD_ASSIGNMENT, assignment1.files[0].$id);

    return new Response(fileData, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="Assignment_2.pdf"'
        }
    });
}