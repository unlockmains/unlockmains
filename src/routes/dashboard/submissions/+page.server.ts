import { redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import type { ISubmission } from "$lib/types";

export const ssr = false

export const load: PageServerLoad = async ({ locals: { pocketbase }, url }) => {
    const user = pocketbase.authStore.model;
   
    if (!user) {
        redirect(303, '/')
    }
    const query = url.searchParams.get('query');
    let submissions: ISubmission[] = [];
    if(query === 'all') {
        submissions = await pocketbase.collection('student_submissions').getFullList().catch(() => []) as ISubmission[];
    } else if(query === 'evaluated') {
        submissions = await pocketbase.collection('student_submissions').getFullList({
            filter: `status = "Evaluated"`
        }); 
    } else if(query === 'pending') {
        submissions = await pocketbase.collection('student_submissions').getFullList({
            filter: `status != "Evaluated"`
        });
    }
    submissions = submissions.map(submission => ({
        ...submission,
        submissionDate: new Date(submission.submissionDate).toLocaleDateString() + " " + new Date(submission.submissionDate).toLocaleTimeString(),
        pyq: submission.isPyq ? "Yes" : "No",
        submittedFileName: submission.submittedFile[0]
    }))
    return { user, submissions }
}