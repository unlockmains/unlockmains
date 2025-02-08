import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_SUBMISSION_DB } from '$env/static/public';
import { ESubmissionStatus } from '$lib/types/enums';
import type { RequestHandler } from '@sveltejs/kit';
import { Query } from 'node-appwrite';

export const GET: RequestHandler = async ({ locals: { user, databases } }) => {

    //all student submissions -> student_submissions -> submitted by user.$id + status == Evaluated or Completed

    const submissions = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_SUBMISSION_DB, [
        Query.equal('users_profile', user?.profile.$id),
        Query.equal('status', [ESubmissionStatus.EVALUATED, ESubmissionStatus.COMPLETED]),
        Query.orderDesc('$updatedAt')
    ])

    console.log(submissions)


    return new Response(null);
}