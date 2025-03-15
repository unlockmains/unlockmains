import type { RequestHandler } from '@sveltejs/kit';
import { getRecentAssignments } from '../recent-assignment-sse/server';

export const GET: RequestHandler = async ({ locals: { user, supabase } }) => {
    return getRecentAssignments(supabase, user?.id!);
}