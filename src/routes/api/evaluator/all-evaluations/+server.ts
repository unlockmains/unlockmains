import { error } from '@sveltejs/kit';
import { getRecentAssignments } from '../../recent-assignment-sse/server';

export async function GET({ locals: { user, supabase } }) {
    const userId = user?.id;
    if (!userId) {
        throw error(400, 'Missing userId');
    }

    return await getRecentAssignments(supabase, userId, false);
};
