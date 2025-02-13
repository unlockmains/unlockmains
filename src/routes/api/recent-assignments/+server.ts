import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_PROFILE_DB, PUBLIC_APPWRITE_EVALUATOR_REMARK_DB, PUBLIC_APPWRITE_STUDENT_SUBMISSION_DB, PUBLIC_APPWRITE_SUBMITTED_FILES_DB } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';
import { getRecentAssignments } from '../recent-assignment-sse/server';

export const GET: RequestHandler = async ({ locals: { user, databases } }) => {
    return getRecentAssignments(databases, user?.profile.$id);
}