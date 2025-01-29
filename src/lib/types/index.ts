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

export enum INewSubmittedStatus {
    DRAFT = "Draft",
    SUBMITTED = "Submitted",
    UNDER_REVIEW = "Under Review",
    EVALUATED = "Evaluated",
    COMPLETED = "Completed"
}

export type ISubmission = {
    collectionId: string,
    collectionName: string,
    id: string,
    isPyq: boolean,
    name: string,
    noOfQuestions: number,
    questionType: string,
    status: INewSubmittedStatus,
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