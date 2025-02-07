import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_SUBMISSION_DB } from '$env/static/public';
import type { RequestHandler } from '@sveltejs/kit';
import { Query } from 'node-appwrite';

export const POST: RequestHandler = async ({ request, locals: { user, databases } }) => {
    const { } = await request.json();

    //all student submissions -> student_submissions -> submitted by user.$id + status == Evaluated or Completed

    const submissions = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_SUBMISSION_DB, [
        Query.equal('user_profile', user?.profile.$id),
        Query.equal('submission_status', ['EVALUATED', 'COMPLETED']),
        Query.orderDesc('$updatedAt')
    ])

    console.log(submissions)


    return new Response(null);
}