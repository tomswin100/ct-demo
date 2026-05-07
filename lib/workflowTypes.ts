export type WorkflowStage =
  | "generate-email-thread"
  | "extract-only"
  | "json-schema"
  | "memo-preview"
  | "pdf-form";

export type EmailThread = {
  matterName: string;
  subject: string;
  rawText: string;
  emails: Array<{
    id: string;
    from: string;
    to: string;
    body: string;
    cc?: string;
    date?: string;
    subject?: string;
  }>;
};

export type ConfidenceLevel = "high" | "medium" | "low";

export type SeverityLevel = "high" | "medium" | "low";

type ExtractedItemBase = {
  id?: string;
  text: string;
  source: string;
  confidence?: ConfidenceLevel;
  category?: string;
  reviewRequired: boolean;
};

export type ExtractedFact = ExtractedItemBase;

export type ExtractedInstruction = ExtractedItemBase & {
  priority?: "high" | "medium" | "low";
};

export type ExtractedLegalIssue = ExtractedItemBase & {
  severity?: SeverityLevel;
  workstream?: string;
};

export type ExtractedTimeConstraint = ExtractedItemBase & {
  deadlineType?: "deadline" | "timing" | "request";
};

export type ExtractedWorkflowData = {
  keyFacts?: ExtractedFact[];
  instructions: ExtractedInstruction[];
  legalIssues: ExtractedLegalIssue[];
  timeConstraints: ExtractedTimeConstraint[];
  facts?: ExtractedFact[];
  limitations?: string[];
};

export type MemoMetadata = {
  document_type?: string;
  to: string;
  from: string;
  subject: string;
  file_number?: string;
  date: string;
  status: string;
  source_material?: string;
  documentType?: string;
  fileNumber?: string;
  sourceMaterial?: string;
};

export type MemoSection = {
  heading: string;
  points?: string[];
  paragraphs?: string[];
};

export type PdfFormState = {
  form_title?: string;
  status: "not-rendered" | "rendered-from-json";
  fields: Array<{
    label: string;
    value: string;
  }>;
  formTitle?: string;
};

export type ReviewState = {
  status: "draft-lawyer-review-required";
  checklist: string[];
  reviewer_required?: boolean;
  reviewerRequired?: boolean;
};

export type MemoJson = {
  memo_metadata: MemoMetadata;
  workflow_stage: {
    current_stage: WorkflowStage;
    human_review_required: boolean;
    limitations: string[];
  };
  extracted_inputs: {
    key_facts?: ExtractedFact[];
    instructions: ExtractedInstruction[];
    legal_issues: ExtractedLegalIssue[];
    time_constraints: ExtractedTimeConstraint[];
  };
  memo: {
    background: string[];
    sections: MemoSection[];
    client_questions?: string[];
    recommended_next_steps?: string[];
    review_note?: string;
    clientQuestions?: string[];
    recommendedNextSteps?: string[];
    reviewNote?: string;
  };
  pdf_form: PdfFormState;
  review: ReviewState;
};
