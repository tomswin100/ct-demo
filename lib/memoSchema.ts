import { z } from "zod";
import type { ExtractedWorkflowData, MemoJson } from "./workflowTypes";

const REVIEW_NOTE =
  "This memo is a workflow-generated first draft based on email correspondence only. It is not legal advice. A lawyer must verify the extracted facts, review the underlying documents and approve any analysis before the memo is relied on.";

const WORKFLOW_LIMITATIONS = [
  "This memo is generated from email correspondence only.",
  "No underlying documents have been reviewed by the system.",
  "All extracted facts and issues require lawyer verification.",
  "This is not legal advice.",
] as const;

const REVIEW_CHECKLIST = [
  "Confirm email thread accurately reflects source material.",
  "Verify extracted facts against original emails.",
  "Review underlying customer contracts, privacy materials and transaction documents.",
  "Confirm the legal issue categories, severity and workstream allocation.",
  "Check whether any missing diligence documents alter the scope of issues identified.",
  "Approve any analysis before the memo is relied on or circulated.",
  "Confirm the final memo and PDF match the JSON source of truth.",
] as const;

const ExtractedItemSchema = z
  .object({
    text: z.string().min(1),
    source: z.string().min(1),
    confidence: z.enum(["high", "medium", "low"]),
    category: z.string().min(1),
    reviewRequired: z.literal(true),
  })
  .strict();

const LegalIssueSchema = ExtractedItemSchema.extend({
  severity: z.enum(["high", "medium", "low"]),
  workstream: z.string().min(1),
}).strict();

export const ExtractedWorkflowDataSchema = z
  .object({
    keyFacts: z.array(ExtractedItemSchema),
    instructions: z.array(ExtractedItemSchema),
    legalIssues: z.array(LegalIssueSchema),
    timeConstraints: z.array(ExtractedItemSchema),
  })
  .strict();

const MemoMetadataSchema = z
  .object({
    document_type: z.string().min(1),
    to: z.string().min(1),
    from: z.string().min(1),
    subject: z.string().min(1),
    file_number: z.string().min(1),
    date: z.string().min(1),
    status: z.string().min(1),
    source_material: z.string().min(1),
  })
  .strict();

const WorkflowStageSchema = z
  .object({
    current_stage: z.enum([
      "generate-email-thread",
      "extract-only",
      "json-schema",
      "memo-preview",
      "pdf-form",
    ]),
    human_review_required: z.literal(true),
    limitations: z.array(z.string().min(1)).length(4),
  })
  .strict();

const MemoSectionSchema = z
  .object({
    heading: z.string().min(1),
    points: z.array(z.string().min(1)).min(1),
  })
  .strict();

const MemoSchema = z
  .object({
    background: z.array(z.string().min(1)).min(1),
    sections: z.array(MemoSectionSchema).min(1),
    client_questions: z.array(z.string().min(1)).min(1),
    recommended_next_steps: z.array(z.string().min(1)).min(1),
    review_note: z.literal(REVIEW_NOTE),
  })
  .strict();

const PdfFormSchema = z
  .object({
    form_title: z.string().min(1),
    status: z.enum(["not-rendered", "rendered-from-json"]),
    fields: z
      .array(
        z
          .object({
            label: z.string().min(1),
            value: z.string().min(1),
          })
          .strict(),
      )
      .min(1),
  })
  .strict();

const ReviewSchema = z
  .object({
    status: z.literal("draft-lawyer-review-required"),
    checklist: z.array(z.string().min(1)).min(1),
    reviewer_required: z.literal(true),
  })
  .strict();

export const MemoJsonSchema = z
  .object({
    memo_metadata: MemoMetadataSchema,
    workflow_stage: WorkflowStageSchema,
    extracted_inputs: z
      .object({
        key_facts: z.array(ExtractedItemSchema),
        instructions: z.array(ExtractedItemSchema),
        legal_issues: z.array(LegalIssueSchema),
        time_constraints: z.array(ExtractedItemSchema),
      })
      .strict(),
    memo: MemoSchema,
    pdf_form: PdfFormSchema,
    review: ReviewSchema,
  })
  .strict();

function getTextByCategory(
  items: Array<{ category: string; text: string }>,
  category: string,
  fallback: string,
) {
  return items.find((item) => item.category === category)?.text ?? fallback;
}

function mapFactTexts(
  items: Array<{ text: string }>,
  emptyFallback: string,
): string[] {
  if (items.length === 0) {
    return [emptyFallback];
  }
  return items.map((item) => item.text);
}

export function createMemoJson(extractedData: ExtractedWorkflowData): MemoJson {
  const validatedData = ExtractedWorkflowDataSchema.parse(extractedData);

  const deadlineText = getTextByCategory(
    validatedData.timeConstraints,
    "board-deadline",
    "Near-final board memorandum required ahead of the board pack cut-off (see correspondence from CFO).",
  );

  const background = mapFactTexts(
    validatedData.keyFacts.slice(0, 4),
    "Harbour Foods Group Limited is assessing the proposed acquisition of Southern Valley Organics Limited; confirm all extracted facts against the source emails.",
  );

  const extraFacts = mapFactTexts(
    validatedData.keyFacts.slice(4),
    "No additional discrete facts were separated beyond the background summary; review the full thread for further commercial detail.",
  );

  const instructionPoints = mapFactTexts(
    validatedData.instructions,
    "No standalone instructions were extracted in this pass; review GC/CFM correspondence for deliverables.",
  );

  const issuePoints = mapFactTexts(
    validatedData.legalIssues,
    "No legal issues were classified automatically; lawyer review should identify issues from the underlying materials.",
  );

  const timePoints = mapFactTexts(
    validatedData.timeConstraints,
    "No explicit deadlines were extracted; confirm timing with the client team.",
  );

  const memoJson = {
    memo_metadata: {
      document_type: "Internal Memorandum",
      to: "Partner",
      from: "Junior Lawyer",
      subject:
        "Harbour Foods Group Limited — Proposed acquisition of Southern Valley Organics Limited",
      file_number: "DEMO-2026-SVO",
      date: "2026-05-10",
      status: "Draft — lawyer review required",
      source_material: "Acquisition email example set (.txt thread)",
    },
    workflow_stage: {
      current_stage: "json-schema",
      human_review_required: true,
      limitations: [...WORKFLOW_LIMITATIONS],
    },
    extracted_inputs: {
      key_facts: validatedData.keyFacts,
      instructions: validatedData.instructions,
      legal_issues: validatedData.legalIssues,
      time_constraints: validatedData.timeConstraints,
    },
    memo: {
      background,
      sections: [
        {
          heading: "Key Facts Extracted From Correspondence",
          points: extraFacts,
        },
        {
          heading: "Instructions and Questions To Be Addressed",
          points: instructionPoints,
        },
        {
          heading: "Legal Issues Requiring Lawyer Review",
          points: issuePoints,
        },
        {
          heading: "Time Constraints and Workflow Urgency",
          points: timePoints,
        },
      ],
      client_questions: [
        "Is a share purchase or asset purchase more appropriate given supplier consent, lease assignment and historic liability issues?",
        "What bank consents are required before any binding acquisition documentation or draw on facilities?",
        "What diligence confirms ownership of PantryPilot, privacy compliance, and food regulatory exposure?",
      ],
      recommended_next_steps: [
        "Confirm GreenFields change-of-control consent and any other supplier or customer assignment restrictions against executed agreements.",
        "Request privacy incident logs, vendor DPAs, and data integration planning inputs from the target advisers.",
        "Line up property landlord consent, lease renewal mechanics, and any unapproved works reviews.",
        "Align board paper content with CFO timing and ensure non-binding offer language matches approvals and financing constraints.",
      ],
      review_note: REVIEW_NOTE,
    },
    pdf_form: {
      form_title: "Internal Memorandum Intake Snapshot",
      status: "not-rendered",
      fields: [
        {
          label: "Matter",
          value: "Harbour Foods Group Limited / Southern Valley Organics Limited",
        },
        {
          label: "Workflow Stage",
          value: "JSON source of truth generated",
        },
        {
          label: "Status",
          value: "Draft — lawyer review required",
        },
        {
          label: "Deadline",
          value: deadlineText,
        },
      ],
    },
    review: {
      status: "draft-lawyer-review-required",
      checklist: [...REVIEW_CHECKLIST],
      reviewer_required: true,
    },
  };

  return MemoJsonSchema.parse(memoJson);
}
