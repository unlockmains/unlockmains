import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { avatars }, params }) => {
    const username = params.user
    const result = await avatars.getInitials(
        username,
        40,
        40,
    );
    return new Response(result, {
        headers: {
            'Content-Type': 'application/plain'
        }
    });
}