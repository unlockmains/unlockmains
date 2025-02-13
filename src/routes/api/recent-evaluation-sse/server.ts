import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATION_FILES_DB, PUBLIC_APPWRITE_EVALUATOR_REMARK_DB, PUBLIC_APPWRITE_STUDENT_PROFILE_DB, PUBLIC_APPWRITE_STUDENT_SUBMISSION_DB, PUBLIC_APPWRITE_SUBMITTED_FILES_DB } from "$env/static/public"
import { ESubmissionStatus } from "$lib/types/enums"
import { Query, type Databases } from "node-appwrite"

export const getRecentEvaluations = async (databases: Databases, userId: string) => {
    const studentProfile = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_PROFILE_DB, [
        Query.equal('users_profile', userId),
        Query.select(['$id']),
        Query.limit(1),
    ])
    const submissions = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_SUBMISSION_DB, [
        Query.equal('student_profile', studentProfile.documents[0].$id),
        Query.select(['$id', '$updatedAt', 'status', 'question_type_lvl1', 'question_type_lvl2', 'question_type_lvl3', 'total_questions', 'is_pyq']),
        Query.equal('status', [ESubmissionStatus.EVALUATED, ESubmissionStatus.COMPLETED]),
        Query.orderDesc('$updatedAt')
    ])

    const submissionWithFiles = await Promise.all(submissions.documents.map(async (submission) => {
        const subfile = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_SUBMITTED_FILES_DB, [
            Query.equal('student_submission', submission.$id),
            Query.select(['$id', 'file_id']),
        ])
        const evaluationRemarks = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_REMARK_DB, [
            Query.equal('student_submissions', submission.$id),
            Query.select(['$id', 'remarks']),
        ])

        const evaluations = await Promise.all(evaluationRemarks.documents.map(async (evaluationRemark) => {
            const file = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATION_FILES_DB, [
                Query.equal('evaluation_remark', evaluationRemark.$id),
                Query.select(['$id', 'file_id']),

            ])
            return {
                ...evaluationRemark,
                evaluatedFiles: file.documents
            }
        }))
        return {
            ...submission,
            submittedFiles: subfile.documents,
            evaluations
        }
    }))

    return new Response(JSON.stringify(submissionWithFiles), {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}