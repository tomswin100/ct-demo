import type { WorkflowStage } from "./workflowTypes";

export type StageDefinition = {
  id: WorkflowStage;
  stepNumber: number;
  navTitle: string;
  shortTitle: string;
  diagramTitle: string;
  explanation: string;
  doesNotDo: string[];
  inputLabel: string;
  outputLabel: string;
  readyStatus: string;
};

export const HERO_COPY =
  "This demo is designed to show workflow thinking. It takes a messy email thread and separates the process into source material, extraction, structured JSON, memo drafting and PDF rendering. The tool does not decide the law. It organises the work so a lawyer can review faster and more confidently.";

export const WORKFLOW_STAGES: StageDefinition[] = [
  {
    id: "generate-email-thread",
    stepNumber: 1,
    navTitle: "Generate Email Thread",
    shortTitle: "Generate Email Thread",
    diagramTitle: "Email Thread",
    explanation:
      "This stage creates fictional source material. It does not extract facts, classify issues or provide advice.",
    doesNotDo: [
      "Extract facts",
      "Classify issues",
      "Draft a memo",
      "Provide advice",
    ],
    inputLabel: "User action: Generate email thread",
    outputLabel: "Fictional source material for a transaction matter",
    readyStatus: "Source generated",
  },
  {
    id: "extract-only",
    stepNumber: 2,
    navTitle: "Extract Only",
    shortTitle: "Extract Only",
    diagramTitle: "Extraction Layer",
    explanation:
      "The extraction layer is intentionally narrow. It extracts key facts, instructions, legal issues and time constraints only. It does not provide advice, apply law or reach conclusions.",
    doesNotDo: [
      "Provide legal analysis",
      "Apply law",
      "Reach conclusions",
      "Draft the memo directly",
    ],
    inputLabel: "Generated email thread",
    outputLabel:
      "Key facts, instructions, legal issues and time constraints only",
    readyStatus: "Extraction only",
  },
  {
    id: "json-schema",
    stepNumber: 3,
    navTitle: "JSON Schema",
    shortTitle: "JSON Schema",
    diagramTitle: "JSON Source of Truth",
    explanation:
      "The JSON object is the source of truth. The memo and PDF are rendered from the same structured data, making the workflow easier to audit, edit and reuse.",
    doesNotDo: [
      "Add new facts",
      "Add unsupported conclusions",
      "Alter source material",
      "Create final legal advice",
    ],
    inputLabel: "Extracted workflow data",
    outputLabel: "Structured JSON with shared memo and PDF inputs",
    readyStatus: "JSON generated",
  },
  {
    id: "memo-preview",
    stepNumber: 4,
    navTitle: "Memo Preview",
    shortTitle: "Memo Preview",
    diagramTitle: "Memo Renderer",
    explanation:
      "The memo is a professional presentation layer generated from the JSON. It must not introduce new facts.",
    doesNotDo: [
      "Create content outside the JSON",
      "Change extracted facts",
      "Approve legal analysis",
      "Finalise advice",
    ],
    inputLabel: "JSON source of truth",
    outputLabel: "Internal memorandum preview for lawyer review",
    readyStatus: "Draft memo - lawyer review required",
  },
  {
    id: "pdf-form",
    stepNumber: 5,
    navTitle: "PDF Form",
    shortTitle: "PDF Form",
    diagramTitle: "PDF Form",
    explanation:
      "The PDF is the final presentation layer. It should not contain new information that is not already present in the structured JSON.",
    doesNotDo: [
      "Add information not present in JSON",
      "Alter memo content",
      "Approve the memo",
      "Replace human verification",
    ],
    inputLabel: "JSON source of truth",
    outputLabel: "PDF-style form rendered from the same structured data",
    readyStatus: "PDF rendered from JSON",
  },
];

export const STAGE_ORDER = WORKFLOW_STAGES.map((stage) => stage.id);
