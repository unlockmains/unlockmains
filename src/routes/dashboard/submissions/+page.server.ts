import type { PageServerLoad } from "./$types"
import type { ISubmission } from "$lib/types";
import { redirect } from "@sveltejs/kit";

export const ssr = false

export const load: PageServerLoad = async ({ locals: { databases, user }, url }) => {   
    if (!user) {
        redirect(303, '/')
    }
    const query = url.searchParams.get('query');
    let submissions: ISubmission[] = [];
    // if(query === 'all') {
    //     submissions = await databases.listCollections('student_submissions').getFullList().catch(() => []) as ISubmission[];
    // } else if(query === 'evaluated') {
    //     submissions = await databases.listCollections('student_submissions').getFullList({
    //         filter: `status = "Evaluated"`
    //     }); 
    // } else if(query === 'pending') {
    //     submissions = await databases.listCollections('student_submissions').getFullList({
    //         filter: `status != "Evaluated"`
    //     });
    // }
    submissions = submissions.map(submission => ({
        ...submission,
        submissionDate: new Date(submission.submissionDate).toLocaleDateString() + " " + new Date(submission.submissionDate).toLocaleTimeString(),
        pyq: submission.isPyq ? "Yes" : "No",
        submittedFileName: submission.submittedFile[0]
    }))
    return { user: null, submissions }
}