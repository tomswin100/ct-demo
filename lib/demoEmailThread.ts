import type {
  EmailThread,
  ExtractedWorkflowData,
  MemoJson,
  ReviewState,
} from "./workflowTypes";
import { createAcquisitionEmailThread } from "./acquisitionEmailThread";

export const DEMO_EMAIL_THREAD: EmailThread = createAcquisitionEmailThread();

export const PLACEHOLDER_EXTRACTED_DATA: ExtractedWorkflowData = {
  facts: [
    {
      id: "fact-1",
      text: "Harbour Foods Group Limited is considering acquiring Southern Valley Organics Limited.",
      source: "Sarah McKenzie email",
      reviewRequired: true,
      confidence: "high",
    },
    {
      id: "fact-2",
      text: "Indicative consideration of approximately NZD $8.2m for 100% of the shares has been discussed.",
      source: "Sarah McKenzie email",
      reviewRequired: true,
      confidence: "high",
    },
    {
      id: "fact-3",
      text: "Key diligence themes include PantryPilot ownership, GreenFields consent, privacy/customer data, and bank consent over $5m acquisitions.",
      source: "Multiple emails",
      reviewRequired: true,
      confidence: "high",
    },
    {
      id: "fact-4",
      text: "Board timing pressures require a practical, board-friendly memo ahead of the pack cut-off.",
      source: "David Chen email",
      reviewRequired: true,
      confidence: "medium",
    },
  ],
  instructions: [
    {
      id: "instruction-1",
      text: "Prepare a legal issues memo for the board before the process advances.",
      source: "Sarah McKenzie email",
      reviewRequired: true,
      priority: "high",
    },
    {
      id: "instruction-2",
      text: "Do not contact the target until an NDA is executed.",
      source: "Sarah McKenzie email",
      reviewRequired: true,
      priority: "high",
    },
  ],
  legalIssues: [
    {
      id: "issue-1",
      text: "Share purchase versus asset purchase and related consent/liability issues.",
      source: "James Patel email",
      reviewRequired: true,
      severity: "high",
    },
    {
      id: "issue-2",
      text: "GreenFields change-of-control consent and supplier concentration.",
      source: "Mark Allen email",
      reviewRequired: true,
      severity: "high",
    },
    {
      id: "issue-3",
      text: "Privacy, sensitive customer data, and incident/billing records.",
      source: "Rachel Ngata email",
      reviewRequired: true,
      severity: "high",
    },
    {
      id: "issue-4",
      text: "Financing covenants and lender consent thresholds.",
      source: "David Chen email",
      reviewRequired: true,
      severity: "high",
    },
  ],
  timeConstraints: [
    {
      id: "time-1",
      text: "Near-final memo required by 10:30 AM Friday for inclusion in the board pack.",
      source: "David Chen email",
      reviewRequired: true,
      deadlineType: "deadline",
    },
    {
      id: "time-2",
      text: "Target CEO meeting with management scheduled for Thursday.",
      source: "Sarah McKenzie email",
      reviewRequired: true,
      deadlineType: "timing",
    },
  ],
  limitations: [
    "Extraction output is a workflow placeholder in this demo.",
    "Lawyer review is still required before the memo is relied on.",
  ],
};

export const PLACEHOLDER_REVIEW_STATE: ReviewState = {
  status: "draft-lawyer-review-required",
  checklist: [
    "Confirm email thread accurately reflects source material.",
    "Verify extracted facts against original emails.",
    "Remove or correct any assumptions.",
    "Review underlying transaction documents.",
    "Confirm legal issue classification.",
    "Amend memo wording where legal judgement is required.",
    "Approve PDF for internal circulation or partner briefing.",
  ],
  reviewerRequired: true,
};

export function createPlaceholderMemoJson(): MemoJson {
  return {
    memo_metadata: {
      documentType: "Internal memorandum",
      to: "Partner",
      from: "Junior Lawyer",
      subject: "Initial diligence workflow draft - Southern Valley Organics",
      fileNumber: "DEMO-2026-017",
      date: "06 May 2026",
      status: "Draft - lawyer review required",
      sourceMaterial: "Acquisition email example set",
    },
    workflow_stage: {
      current_stage: "json-schema",
      human_review_required: true,
      limitations: [
        "This JSON is a demo source of truth for later rendering modules.",
        "It organises extracted content but does not decide the law.",
      ],
    },
    extracted_inputs: {
      key_facts: PLACEHOLDER_EXTRACTED_DATA.facts,
      instructions: PLACEHOLDER_EXTRACTED_DATA.instructions,
      legal_issues: PLACEHOLDER_EXTRACTED_DATA.legalIssues,
      time_constraints: PLACEHOLDER_EXTRACTED_DATA.timeConstraints,
    },
    memo: {
      background: [
        "Harbour Foods Group Limited is assessing the acquisition of Southern Valley Organics Limited.",
        "Initial correspondence highlights IP, supplier, privacy, property, employment, regulatory and financing workstreams.",
        "Strict confidentiality and board timing constraints apply.",
      ],
      sections: [
        {
          heading: "Issues to verify",
          paragraphs: [
            "This placeholder memo preview is rendered from structured JSON rather than drafted directly from the email thread.",
            "The current JSON captures source material, extracted inputs, workflow limitations and review status for later modules to reuse.",
          ],
        },
        {
          heading: "Priority issues for review",
          paragraphs: [
            "Structuring, supplier consents and bank covenant compliance appear central and require document-level verification.",
            "Privacy, food regulatory and property diligence should be confirmed against underlying records before advice is relied on.",
          ],
        },
        {
          heading: "Recommended next steps",
          paragraphs: [
            "Validate extracted inputs against the full email set and transaction documents.",
            "Refine memo wording in the dedicated memo renderer module.",
          ],
        },
      ],
      clientQuestions: [
        "What structure best manages historic liability and third-party consents?",
        "What financier approvals are needed before proceeding to a binding position?",
      ],
      recommendedNextSteps: [
        "Verify extracted inputs against the source emails and transaction documents.",
        "Refine the professional memo wording in the dedicated memo renderer module.",
      ],
      reviewNote:
        "Workflow-generated first draft only. Lawyer review is required before internal circulation or reliance.",
    },
    pdf_form: {
      formTitle: "Internal memo cover form",
      status: "not-rendered",
      fields: [
        { label: "Matter", value: "Southern Valley Organics acquisition" },
        { label: "Client", value: "Harbour Foods Group Limited" },
        { label: "Status", value: "Draft - lawyer review required" },
        { label: "Deadline", value: "Board pack — memo by 10:30 AM Friday" },
      ],
    },
    review: PLACEHOLDER_REVIEW_STATE,
  };
}
