import type { Models } from "node-appwrite";
import type { EEvaluationStatus, ESubmissionStatus } from "./enums";

export type IToast = {
    id: string;
    type: 'success' | 'error' | 'info';
    dismissible: boolean;
    timeout: number;
    message: string;
}

export type INewSubmissionType = {
    text: string;
    value: string;
    disabled?: boolean;
    options?: INewSubmissionType[],
    count?: number;
}

export type ISubmission = {
    collectionId: string,
    collectionName: string,
    id: string,
    isPyq: boolean,
    name: string,
    noOfQuestions: number,
    questionType: string,
    status: ESubmissionStatus,
    submissionDate: string,
    submittedFile: string[]
}

type AnnotateObject = {
    fontSize: number;
    fontWeight: "normal" | "bold" | "bolder" | "lighter" | number;
    fontFamily: string;
    fontStyle: "normal" | "italic" | "oblique";
    lineHeight: number;
    text: string;
    charSpacing: number;
    textAlign: "left" | "center" | "right" | "justify";
    styles: any[];
    pathStartOffset: number;
    pathSide: "left" | "right" | "center";
    pathAlign: "baseline" | "middle" | "top" | "bottom";
    underline: boolean;
    overline: boolean;
    linethrough: boolean;
    textBackgroundColor: string;
    direction: "ltr" | "rtl";
    type: "IText" | 'Path' | 'Rect';
    version: string;
    originX: "left" | "center" | "right";
    originY: "top" | "center" | "bottom";
    left: number;
    top: number;
    width: number;
    height: number;
    fill: string;
    stroke: string | null;
    strokeWidth: number;
    strokeDashArray: number[] | null;
    strokeLineCap: "butt" | "round" | "square";
    strokeDashOffset: number;
    strokeLineJoin: "miter" | "round" | "bevel";
    strokeUniform: boolean;
    strokeMiterLimit: number;
    scaleX: number;
    scaleY: number;
    angle: number;
    flipX: boolean;
    flipY: boolean;
    opacity: number;
    shadow: any | null;
    visible: boolean;
    backgroundColor: string;
    fillRule: "nonzero" | "evenodd";
    paintFirst: "fill" | "stroke";
    globalCompositeOperation: string;
    skewX: number;
    skewY: number;
    path: [string | number][];
    objects: AnnotateObject[];
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};


export type IAnnotation = {
    type: string
    data: AnnotateObject
}

export interface IPageAnnotations {
    [pageNumber: number]: IAnnotation[]
}

export type IEvaluatorOnBoardStep1Data = {
    name: string
    phoneNumber: string
    prelimsAttempts: number | undefined
    mainsAttempts: number | undefined
    interviewsAppeared: number | undefined
    optionalSubject: string
    hasRank: boolean
    existingUser: "Yes" | "No"
    existingUserEmail: string
    marksheet: File | null,
}

export type IEvaluatorOnBoardStep2Data = {
    evaluationLanguage: string
    experience: string,
    evaluateGeneralStudies: string[],
    evaluateEssay: boolean,
    evaluateOptional: boolean,
}

export type IUser = (Models.User<Models.Preferences> & { team: Models.Team<Models.Preferences> } & { profile: Models.Document }) | undefined

interface ISubmittedFile {
    file_id: string;
    $id: string;
}

interface IEvaluation {
    remarks: string | null;
    $id: string;
    evaluatedFiles: string[];
}

export interface IRecentEvaluation {
    status: string;
    question_type_lvl1: string;
    question_type_lvl2: string;
    question_type_lvl3: string;
    total_questions: number;
    is_pyq: boolean;
    $id: string;
    $updatedAt: string;
    submittedFiles: ISubmittedFile[];
    evaluations: IEvaluation[];
}

export interface IRecentAssignments {
    $id: string;
    assignment_date: string;
    status: EEvaluationStatus;
    submittedFiles: ISubmittedFile[];
    student_submissions: {
        '$id': string,
        '$databaseId': string,
        '$collectionId': string
    }
    submissionDetails: {
        status: string;
        question_type_lvl1: string;
        question_type_lvl2: string;
        question_type_lvl3: string;
        total_questions: number;
        is_pyq: boolean;
    }
}