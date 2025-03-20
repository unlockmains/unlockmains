import { ESubmissionStatus } from "$lib/types/enums"
import type { SupabaseClient } from "@supabase/supabase-js"

export const getRecentEvaluations = async (supabase: SupabaseClient, userId: string, onlyCompleted: boolean = true) => {
    const { data: studentProfile } = await supabase.from("student_profile").select("id").eq("user_id", userId).single();
    let query = supabase
        .from("student_submissions")
        .select("*")
        .eq("student_profile", studentProfile?.id);

    if (onlyCompleted) {
        query = query.in("status", [ESubmissionStatus.EVALUATED, ESubmissionStatus.COMPLETED]);
    }
    const { data: submissions } = await query.order("created_at", { ascending: false });
    const submissionWithFiles = submissions ? await Promise.all(submissions.map(async (submission) => {
        const { data: subfile } = await supabase.from("student_submission_files").select("file_id, id, full_path, path").eq("student_submissions", submission.id);
        const { data: evaluationRemarks } = await supabase.from("evaluator_remarks").select("id, remarks, evaluation_start, evaluation_end").eq("student_submissions", submission.id);

        const evaluations = evaluationRemarks ? await Promise.all(evaluationRemarks.map(async (evaluationRemark) => {
            const { data: file } = await supabase.from("evaluation_files").select("file_id, id").eq("evaluation_remarks", evaluationRemark.id);
            return {
                ...evaluationRemark,
                evaluatedFiles: file
            }
        })) : []

        return {
            ...submission,
            submittedFiles: subfile,
            evaluations
        }
    })) : []

    return new Response(JSON.stringify(submissionWithFiles), {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}