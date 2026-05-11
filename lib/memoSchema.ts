import { z } from "zod";
import type { EmailThread, ExtractedWorkflowData, MemoJson } from "./workflowTypes";

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

function buildDealSummary(emailThread?: EmailThread) {
  if (!emailThread) {
    return {
      subject:
        "Harbour Foods Group Limited — Proposed acquisition of Southern Valley Organics Limited",
      fileNumber: "DEMO-2026-SVO",
      memoDate: "2026-05-10",
      sourceMaterial: "Generated transaction email thread",
      backgroundFallback:
        "The client is assessing a proposed transaction; confirm all extracted facts against the source emails.",
      matterField:
        "Harbour Foods Group Limited / Southern Valley Organics Limited",
      clientQuestion:
        "Which third-party consents, financing approvals and diligence items must be resolved before the proposed transaction can proceed?",
    };
  }

  if (emailThread.matterCategory === "general" || !emailThread.transactionType) {
    return {
      subject:
        emailThread.subject || `${emailThread.matterName} — Initial file note`,
      fileNumber: emailThread.fileNumber ?? "DEMO-2026-GENERAL",
      memoDate: emailThread.memoDate ?? "2026-05-10",
      sourceMaterial: "Installed email thread",
      backgroundFallback: `${emailThread.matterName}; confirm all extracted facts against the source emails.`,
      matterField: emailThread.matterName,
      clientQuestion:
        "What factual gaps, missing documents and practical response options should be highlighted before replying on the issue raised in the thread?",
    };
  }

  const relationshipLabel =
    emailThread.transactionType === "acquisition"
      ? `Proposed acquisition of ${emailThread.counterpartyName}`
      : `Proposed merger with ${emailThread.counterpartyName}`;
  const backgroundFallback =
    emailThread.transactionType === "acquisition"
      ? `${emailThread.clientName} is assessing the proposed acquisition of ${emailThread.counterpartyName}; confirm all extracted facts against the source emails.`
      : `${emailThread.clientName} is assessing a proposed merger with ${emailThread.counterpartyName}; confirm all extracted facts against the source emails.`;
  const matterField =
    emailThread.transactionType === "acquisition"
      ? `${emailThread.clientName} / ${emailThread.counterpartyName}`
      : `${emailThread.clientName} + ${emailThread.counterpartyName}`;
  const clientQuestion =
    emailThread.transactionType === "acquisition"
      ? "Which third-party consents, financing approvals and diligence items must be resolved before signing or completing the proposed acquisition?"
      : "Which third-party consents, financing approvals and integration conditions must be resolved before signing or implementing the proposed merger?";

  return {
    subject: `${emailThread.clientName} — ${relationshipLabel}`,
    fileNumber: emailThread.fileNumber,
    memoDate: emailThread.memoDate,
    sourceMaterial: "Generated transaction email thread",
    backgroundFallback,
    matterField,
    clientQuestion,
  };
}

export function createMemoJson(
  extractedData: ExtractedWorkflowData,
  emailThread?: EmailThread,
): MemoJson {
  const validatedData = ExtractedWorkflowDataSchema.parse(extractedData);
  const dealSummary = buildDealSummary(emailThread);
  const isGeneralThread =
    emailThread?.matterCategory === "general" || !emailThread?.transactionType;

  const deadlineText = getTextByCategory(
    validatedData.timeConstraints,
    "board-deadline",
    "Near-final board memorandum required ahead of the board pack cut-off (see correspondence from CFO).",
  );

  const background = mapFactTexts(
    validatedData.keyFacts.slice(0, 4),
    dealSummary.backgroundFallback,
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

  const clientQuestions = isGeneralThread
    ? [
        "What seems to have happened on the facts currently available in the emails?",
        "Which missing documents or confirmations matter most before responding?",
        dealSummary.clientQuestion,
      ]
    : [
        "Does the preferred structure allocate risk appropriately given the consent, property and historic liability issues raised in the emails?",
        dealSummary.clientQuestion,
        "What diligence best tests the privacy, regulatory, IP and management-retention points raised in the thread?",
      ];

  const recommendedNextSteps = isGeneralThread
    ? [
        "Confirm the signed booking form, final agreed terms, and any written approval trail for extra staffing or event changes.",
        "Pull together the venue policy, revised invoice, run sheet, and any call notes or follow-up emails about guest numbers and the upstairs bar.",
        "Frame the response around what was and was not clearly approved before the event, while reserving position until the missing documents are checked.",
        "Keep the partner reply practical and tied to the timing request raised in the emails.",
      ]
    : [
        "Confirm the key customer or supplier consent position and any other assignment or change-of-control restrictions against executed agreements.",
        "Request privacy notices, incident logs, vendor agreements and data-integration planning inputs from the counterparty advisers.",
        "Line up property consent requirements, lease mechanics and any unapproved works reviews for operational sites.",
        "Align board paper content with the CFO timing and ensure any offer language matches approvals and financing constraints.",
      ];

  const memoJson = {
    memo_metadata: {
      document_type: "Internal Memorandum",
      to: "Partner",
      from: "Junior Lawyer",
      subject: dealSummary.subject,
      file_number: dealSummary.fileNumber,
      date: dealSummary.memoDate,
      status: "Draft — lawyer review required",
      source_material: dealSummary.sourceMaterial,
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
      client_questions: clientQuestions,
      recommended_next_steps: recommendedNextSteps,
      review_note: REVIEW_NOTE,
    },
    pdf_form: {
      form_title: "Internal Memorandum Intake Snapshot",
      status: "not-rendered",
      fields: [
        {
          label: "Matter",
          value: dealSummary.matterField,
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
