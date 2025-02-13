import type { RequestHandler } from '@sveltejs/kit';
import { getRecentEvaluations } from '../recent-evaluation-sse/server';

export const GET: RequestHandler = async ({ locals: { user, databases } }) => {
    return await getRecentEvaluations(databases, user?.profile.$id);
}