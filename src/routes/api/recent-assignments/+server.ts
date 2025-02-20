import type { RequestHandler } from '@sveltejs/kit';
import { getRecentAssignments } from '../recent-assignment-sse/server';

export const GET: RequestHandler = async ({ locals: { user, databases } }) => {
    return getRecentAssignments(databases, user?.profile.$id);
}