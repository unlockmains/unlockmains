import { PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATION_FILES_DB, PUBLIC_APPWRITE_EVALUATOR_PROFILE_DB, PUBLIC_APPWRITE_EVALUATOR_REMARK_DB, PUBLIC_APPWRITE_STUDENT_SUBMISSION_DB, PUBLIC_APPWRITE_SUBMITTED_FILES_DB } from "$env/static/public"
import { EEvaluationStatus } from "$lib/types/enums"
import { Query, type Databases } from "node-appwrite"

export const getRecentAssignments = async (databases: Databases, userId: string, onlyCompleted: boolean = true) => {
    const evaluatorProfile = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_PROFILE_DB, [
        Query.equal('users_profile', userId),
        Query.select(['$id']),
        Query.limit(1),
    ])
    const newEvaluationAssignments = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_REMARK_DB, [
        Query.equal('evaluator_profile', evaluatorProfile.documents[0].$id),
        Query.select(['$id', 'assignment_date', 'status', 'student_submissions.$id']),
        ...onlyCompleted ? [Query.equal('status', [EEvaluationStatus.PENDING_EVALUATION])] : [],
        Query.orderDesc('$updatedAt')
    ])

    const assignmentWithSubFiles = await Promise.all(newEvaluationAssignments.documents.map(async (evaluation) => {
        const submissionDetails = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_STUDENT_SUBMISSION_DB, [
            Query.equal('$id', evaluation.student_submissions.$id),
            Query.select(['question_type_lvl1', 'question_type_lvl2', 'question_type_lvl3', 'total_questions', 'is_pyq']),
        ])
        const subfile = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_SUBMITTED_FILES_DB, [
            Query.equal('student_submission', evaluation.student_submissions.$id),
            Query.select(['$id', 'file_id']),
        ])
        const evaluationRemarks = await databases.listDocuments(PUBLIC_APPWRITE_DATABASE, PUBLIC_APPWRITE_EVALUATOR_REMARK_DB, [
            Query.equal('student_submissions', evaluation.student_submissions.$id),
            Query.select(['$id', 'remarks', 'evaluation_start', 'evaluation_end']),
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
            ...evaluation,
            submittedFiles: subfile.documents,
            submissionDetails: submissionDetails.documents[0],
            evaluations
        }
    }))

    return new Response(JSON.stringify(assignmentWithSubFiles), {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}