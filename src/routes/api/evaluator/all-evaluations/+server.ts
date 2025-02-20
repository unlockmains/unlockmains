import { error } from '@sveltejs/kit';
import { getRecentAssignments } from '../../recent-assignment-sse/server';

export async function GET({ locals: { user, databases } }) {
    const userId = user?.profile.$id;
    if (!userId) {
        throw error(400, 'Missing userId');
    }

    return await getRecentAssignments(databases, userId, false);
};
