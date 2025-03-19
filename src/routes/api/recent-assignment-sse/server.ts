import { EEvaluationStatus } from "$lib/types/enums"
import type { SupabaseClient } from "@supabase/supabase-js"

export const getRecentAssignments = async (supabase: SupabaseClient, userId: string, onlyCompleted: boolean = true) => {
    const { data: evaluatorProfile } = await supabase.from("evaluator_profile").select("id").eq("user_id", userId).single();
    let query = supabase
        .from("evaluator_remarks")
        .select("id, assignment_date, status, student_submissions")
        .eq("evaluator_profile", evaluatorProfile?.id);

    if (onlyCompleted) {
        query = query.eq("status", EEvaluationStatus.PENDING_EVALUATION);
    }

    const { data: newEvaluationAssignments } = await query.order("created_at", { ascending: false });

    const assignmentWithSubFiles = newEvaluationAssignments ? await Promise.all(newEvaluationAssignments.map(async (evaluation) => {
        const { data: submissionDetails } = await supabase.from("student_submissions").select("id, question_type_lvl1, question_type_lvl2, question_type_lvl3, total_questions, is_pyq, status").eq("id", evaluation.student_submissions);
        const { data: subFile } = await supabase.from("student_submission_files").select("file_id, id, full_path, path").eq("student_submissions", evaluation.student_submissions);
        const { data: evaluationRemarks } = await supabase.from("evaluator_remarks").select("id, remarks, evaluation_start, evaluation_end").eq("student_submissions", evaluation.student_submissions);

        const evaluations = evaluationRemarks ? await Promise.all(evaluationRemarks.map(async (evaluationRemark) => {
            const { data: file } = await supabase.from("evaluation_files").select("file_id, id, full_path, path").eq("evaluation_remark", evaluationRemark.id);
            return {
                ...evaluationRemark,
                evaluatedFiles: file?.[0]?.path
            }
        })) : []
        return {
            ...evaluation,
            submittedFiles: subFile?.[0].path,
            submissionDetails: submissionDetails?.[0],
            evaluations
        }
    })) : []

    return new Response(JSON.stringify(assignmentWithSubFiles), {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}