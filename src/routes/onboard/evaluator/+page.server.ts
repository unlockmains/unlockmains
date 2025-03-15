import { fail, redirect, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { v4 as uuidv4 } from "uuid";
import { getFileWithUpdatedFileName } from '$lib/api/utils';

export const load: PageServerLoad = async ({ url, locals: { user, supabase } }) => {
  const { data: evaluatorLead } = await supabase.from("evaluator_lead").select("*").eq("user_id", user?.id).single();

  return { url: url.origin, userName: user?.user_metadata.name, evaluatorLead }
}

export const actions: Actions = {
  basicInfo: async (event) => {
    const {
      locals: { supabase, user }
    } = event;
    const formData = await event.request.formData()
    const error: { fieldName: string, message: string }[] = []

    const name = formData.get('name') as string
    if (!name) {
      error.push({ fieldName: 'name', message: 'Please enter your name' })
    }
    const phoneNumber = formData.get('phoneNumber') as string
    if (!phoneNumber) {
      error.push({ fieldName: 'phoneNumber', message: 'Please enter your phone number' })
    }
    const mainsAttempts = Number(formData.get('mainsAttempts'))
    if (!mainsAttempts) {
      error.push({ fieldName: 'mainsAttempts', message: 'Please enter the number of mains attempts' })
    }
    const prelimsAttempts = Number(formData.get('prelimsAttempts'))
    if (!prelimsAttempts) {
      error.push({ fieldName: 'prelimsAttempts', message: 'Please enter the number of prelims attempts' })
    }
    const interviewsAppeared = Number(formData.get('interviewsAppeared'))
    if (!interviewsAppeared) {
      error.push({ fieldName: 'interviewsAppeared', message: 'Please enter the number of interviews appeared' })
    }
    const optionalSubject = formData.get('optionalSubject') as string
    if (!optionalSubject) {
      error.push({ fieldName: 'optionalSubject', message: 'Please enter the optional subject' })
    }
    const hasRank = formData.get('hasRank') === "false" ? false : true
    const existingUser = formData.get('existingUser')
    const existingUserEmail = formData.get('existingUserEmail')
    if (existingUser === 'Yes' && !existingUserEmail) {
      error.push({ fieldName: 'existingUserEmail', message: 'Please existing user email' })
    }

    if (error.length) {
      return fail(400, { basicInfo: error })
    }

    const { data: evaluatorLead } = await supabase.from("evaluator_lead").select("*").eq("user_id", user?.id).single();

    const documentToCreateUpdate = {
      "name": name,
      "phone_number": phoneNumber,
      "mains_attempts": mainsAttempts,
      "prelims_attempts": prelimsAttempts,
      "interviews_appeared": interviewsAppeared,
      "optional_subject": optionalSubject,
      "has_rank": hasRank,
      "existing_user": existingUser,
      "existing_user_email": existingUser === 'Yes' ? existingUserEmail : null,
      "current_step": 2,
      "user_id": user?.id
    }

    const file = formData.get('marksheet') as File;
    const fileId = uuidv4();
    const fileToUpload = getFileWithUpdatedFileName({ file, fileId })

    const marksheetFile = await supabase.storage.from("new_evaluators").upload(`${user?.id}/${fileId}_${file.name}`, fileToUpload);
    await supabase.from("evaluator_lead").update({
      ...documentToCreateUpdate,
      "marksheet": marksheetFile?.data?.path,
    }).eq("id", evaluatorLead.id)

    return { "message": "success" }
  },
  preferences: async (event) => {
    const {
      locals: { supabase, user }
    } = event;
    const formData = await event.request.formData()
    const error: { fieldName: string, message: string }[] = []

    const evaluationLanguage = formData.get('evaluationLanguage') as string
    if (!evaluationLanguage) {
      error.push({ fieldName: 'evaluationLanguage', message: 'Please select Evaluation Language' })
    }
    const experience = formData.get('experience') as string
    if (!experience) {
      error.push({ fieldName: 'experience', message: 'Please enter your experience' })
    }
    const evaluateGeneralStudies = formData.getAll('evaluateGeneralStudies') as string[]
    if (evaluateGeneralStudies.length < 2) {
      error.push({ fieldName: 'evaluateGeneralStudies', message: 'Please select at least 2 general studies' })
    }
    const evaluateEssay = formData.get('evaluateEssay') === "false" ? false : true
    const evaluateOptional = formData.get('evaluateOptional') === "false" ? false : true

    if (error.length) {
      return fail(400, { basicInfo: error })
    }

    const { data: evaluatorLead } = await supabase.from("evaluator_lead").select("*").eq("user_id", user?.id).single();

    const documentToCreateUpdate = {
      "evaluation_language": evaluationLanguage,
      "experience": experience,
      "evaluate_general_studies": evaluateGeneralStudies,
      "evaluate_essay": evaluateEssay,
      "evaluate_optional": evaluateOptional,
      "current_step": 3
    }

    await supabase.from("evaluator_lead").update({
      ...documentToCreateUpdate,
    }).eq("id", evaluatorLead.id)
    return true;
  },
  assignment1: async (event) => {
    const {
      locals: { supabase, user }
    } = event;

    const formData = await event.request.formData()
    const error: { fieldName: string, message: string }[] = []

    const evaluatedFile1 = formData.get('evaluatedFile1') as File;

    if (!evaluatedFile1.size) {
      error.push({ fieldName: 'evaluatedFile1', message: 'Please upload the evaluated copy of assignment 1' })
    }

    if (error.length) {
      return fail(400, { assignment1: error })
    }

    const { data: evaluatorLead } = await supabase.from("evaluator_lead").select("*").eq("user_id", user?.id).single();

    const fileId = uuidv4();
    const updatedEvaluatedFile1 = getFileWithUpdatedFileName({ file: evaluatedFile1, fileId, additionalName: evaluatorLead.id })

    const assignment1File = await supabase.storage.from("new_evaluators").upload(`${user?.id}/${fileId}_${updatedEvaluatedFile1.name}`, updatedEvaluatedFile1);

    const documentToCreateUpdate = {
      "submitted_file_1": assignment1File.data?.path,
    }
    await supabase.from("evaluator_lead").update({
      ...documentToCreateUpdate,
    }).eq("id", evaluatorLead.id)

    return { success: true, assignment1: { message: "Assignment 1 submitted successfully" } }
  },
  assignment2: async (event) => {
    const {
      locals: { supabase, user }
    } = event;

    const formData = await event.request.formData()
    const error: { fieldName: string, message: string }[] = []

    const evaluatedFile2 = formData.get('evaluatedFile2') as File;

    if (!evaluatedFile2.size) {
      error.push({ fieldName: 'evaluatedFile2', message: 'Please upload the evaluated copy of assignment 2' })
    }

    if (error.length) {
      return fail(400, { assignment2: error })
    }

    const { data: evaluatorLead } = await supabase.from("evaluator_lead").select("*").eq("user_id", user?.id).single();

    const fileId = uuidv4();
    const updatedEvaluatedFile2 = getFileWithUpdatedFileName({ file: evaluatedFile2, fileId, additionalName: evaluatorLead.id })

    const assignment1File = await supabase.storage.from("new_evaluators").upload(`${user?.id}/${fileId}_${updatedEvaluatedFile2.name}`, updatedEvaluatedFile2);

    const documentToCreateUpdate = {
      "submitted_file_2": assignment1File.data?.path,
    }
    await supabase.from("evaluator_lead").update({
      ...documentToCreateUpdate,
    }).eq("id", evaluatorLead.id)

    return { success: true, assignment1: { message: "Assignment 2 submitted successfully" } }
  },
  convertEvaluator: async (event) => {
    const {
      locals: { supabase, user }
    } = event;

    const { data: evaluatorLead } = await supabase.from("evaluator_lead").select("*").eq("user_id", user?.id).single();

    const evaluatorProfileToCreate = {
      "user_id": user?.id,
      "general_studies": evaluatorLead.evaluate_general_studies,
      "essay": evaluatorLead.evaluate_essay,
      "optional": evaluatorLead.evaluate_optional,
      "optional_subject": evaluatorLead.optional_subject,
      "evaluation_language": evaluatorLead.evaluation_language,
      "available": true,
      "gs_total_bw": 10,
      "gs_available_bw": 10,
      "optional_total_bw": evaluatorLead.evaluate_optional ? 2 : 0,
      "optional_available_bw": evaluatorLead.evaluate_optional ? 2 : 0,
      "essay_total_bw": evaluatorLead.evaluate_essay ? 2 : 0,
      "essay_available_bw": evaluatorLead.evaluate_essay ? 2 : 0,
    }
    await supabase.from("evaluator_profile").insert(evaluatorProfileToCreate);
    await supabase.from("user_profile").update({ "admin_approved": true }).eq("user_id", user?.id);
    throw redirect(303, "/dashboard");
  }
}