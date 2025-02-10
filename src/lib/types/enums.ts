export enum EUserType {
    STUDENT = "STUDENT",
    TEACHER = "TEACHER",
    ADMIN = "ADMIN",
}

export enum EQuestionTypes {
    GENERAL_STUDIES = "General Studies",
    OPTIONAL = "Optional",
    ESSAY = "Essay",
}

export enum ESubmissionStatus {
    DRAFT = "Draft",
    SUBMITTED = "Submitted",
    EVALUATOR_ASSIGNED = "Evaluator Assigned",
    UNDER_EVALUATION = "Under Evaluation",
    EVALUATED = "Evaluated",
    COMPLETED = "Completed"
}

export enum EEvaluationStatus {
    PENDING_EVALUATION = "Pending Evaluation",
    EVALUATED = "Evaluated",
    UNDER_EVALUATION = "Under Evaluation",
}

export enum AuthErrorCode {
    INVALID_PARAMETERS = 'INVALID_PARAMETERS',
    INVALID_TOKEN = 'INVALID_TOKEN',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    SESSION_CREATION_FAILED = 'SESSION_CREATION_FAILED',
    NETWORK_ERROR = 'NETWORK_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}