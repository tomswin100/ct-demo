# Email-to-Legal Memo Workflow — Project Constitution

## 1. Constitutional Purpose

This project exists to demonstrate practical legal engineering workflow design.

The product is a small, polished demo that shows how a messy email thread can be transformed into a structured, lawyer-reviewable internal memorandum.

The project must prove the following:

1. Legal work can be broken into clear workflow stages.
2. Source material should be separated from extracted information.
3. Extracted information should be separated from structured data.
4. Structured data should be the source of truth.
5. The memo and PDF should be presentation layers only.
6. Human lawyer review must remain the control point.
7. The tool supports legal work; it does not replace legal judgement.

The demo must be understandable within 60 seconds by a lawyer, partner, legal engineer, innovation manager, or legal operations professional.

---

## 2. Product Name

Working title:

**Email Thread to Legal Memo Workflow**

Alternative short title:

**Matter Memo Workflow**

One-line description:

> A structured workflow that turns messy matter correspondence into a JSON-backed, lawyer-reviewable internal legal memo and PDF form.

---

## 3. Core Design Principle

The core design principle is:

> The JSON is the source of truth. The memo and PDF are presentation layers.

This means:

- The email thread is the raw source material.
- The extraction layer identifies facts, instructions, legal issues and time constraints only.
- The JSON schema organises the extracted information.
- The memo renderer converts the JSON into a professional internal memorandum.
- The PDF renderer converts the same JSON into a downloadable PDF form.
- The lawyer review stage controls whether the output is ready for review.

The memo and PDF must not invent facts or legal conclusions that are not present in the JSON.

---

## 4. Non-Negotiable Guardrails

### 4.1 This is not a legal advice generator

The app must never claim to provide final legal advice.

Do not use phrases such as:

- “Legal advice complete”
- “Approved advice”
- “Compliant”
- “Legally correct”
- “Final answer”
- “Automated legal opinion”

Use phrases such as:

- “Draft — lawyer review required”
- “Ready for lawyer review”
- “Workflow-generated first draft”
- “Internal memo preview”
- “Requires verification”

### 4.2 Extraction must be narrow

The extraction stage may only extract:

1. Key facts
2. Instructions
3. Legal issues
4. Time constraints

It must not:

- Provide legal analysis
- Apply legislation
- Reach conclusions
- Recommend final advice
- Invent missing facts
- Draft the memo directly

### 4.3 Human review must remain visible

Every major output must show that lawyer review is required.

The final stage must include a review checklist.

The final status may only move from:

**Draft — lawyer review required**

to:

**Ready for lawyer review**

It must never move to “approved” or “final advice”.

### 4.4 The memo template is structural only

The attached internal memorandum template may be used only for structural inspiration:

- Internal memorandum heading
- To / From / Subject / File Number / Date
- Background section
- Numbered paragraphs
- Issue headings
- Practical recommendations

Do not copy semantic content from the template.

Do not copy the property facts, building condition issue, sewage easement issue, parties, dates, or legal content.

---

## 5. Recommended Technology Stack

### 5.1 Core application stack

Use:

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React**
- **Zod**
- **pdf-lib** or browser print-to-PDF
- **Vercel** for deployment

### 5.2 Optional future stack

Optional later additions:

- **OpenAI Structured Outputs** for real extraction into a strict JSON schema
- **n8n** for workflow orchestration
- **Supabase / Postgres** for persistence
- **Resend** for sending memo drafts
- **PostHog** for usage analytics

### 5.3 n8n position

n8n should not be the primary user interface.

The lawyer-facing product should be a clean Next.js application.

n8n may be used later as a background workflow layer:

```text
Outlook / Gmail email thread
→ n8n webhook
→ extraction service
→ JSON validation
→ memo renderer
→ PDF renderer
→ document management system / email draft
→ lawyer review
```

For the demo, the main product should work without n8n.

---

## 6. Workflow Architecture

The application must follow this exact workflow:

```text
Generate Email Thread
→ Extract Key Inputs Only
→ Create JSON Source of Truth
→ Render Professional Memo
→ Render PDF Form
→ Lawyer Review
```

Each stage must have:

- A clear title
- A short explanation
- A visible input
- A visible output
- A status badge
- A statement of what the stage does not do

---

## 7. Stage Definitions

## Stage 1 — Generate Email Thread

### Purpose

Create a realistic but fictional email thread that simulates how a commercial legal matter may begin.

### Input

User clicks:

**Generate email thread**

### Output

A fictional email thread involving:

- A proposed acquisition
- A partner instruction
- A client concern
- Missing documents
- Possible legal issues
- A deadline

### This stage does not

- Extract facts
- Classify issues
- Draft a memo
- Provide advice

### Required status badge

**Source generated**

---

## Stage 2 — Extract Key Inputs Only

### Purpose

Separate the raw email thread into narrow workflow categories.

### Inputs

The generated email thread.

### Outputs

Four separate groups:

1. Key facts
2. Instructions
3. Legal issues
4. Time constraints

### This stage does not

- Draft the memo
- Provide legal analysis
- Apply law
- Reach conclusions
- Create recommendations beyond identifying issues

### Required status badge

**Extraction only**

### Required explanation

> The extraction layer is intentionally narrow. It extracts key facts, instructions, legal issues and time constraints only. It does not provide advice, apply law or reach conclusions.

---

## Stage 3 — Create JSON Source of Truth

### Purpose

Convert the extracted material into a structured, validated JSON object.

### Inputs

The extracted key facts, instructions, legal issues and time constraints.

### Outputs

A JSON object containing:

- Memo metadata
- Workflow stage
- Extracted inputs
- Memo content
- PDF form fields
- Review status
- Limitations

### This stage does not

- Add new facts
- Add unsupported conclusions
- Alter source material
- Create final legal advice

### Required status badge

**JSON generated**

### Required explanation

> The JSON object is the source of truth. The memo and PDF are rendered from the same structured data, making the workflow easier to audit, edit and reuse.

---

## Stage 4 — Render Professional Memo

### Purpose

Render a professional internal legal memorandum from the JSON.

### Inputs

The JSON source of truth.

### Outputs

A memo preview using this structure:

```text
INTERNAL MEMORANDUM

TO:
FROM:
SUBJECT:
FILE NUMBER:
DATE:
STATUS:

Background

1.
2.
3.

Issue heading

4.
5.
6.

Recommended actions

Review note
```

### This stage does not

- Create new content outside the JSON
- Change extracted facts
- Approve legal analysis
- Finalise advice

### Required status badge

**Draft memo — lawyer review required**

---

## Stage 5 — Render PDF Form

### Purpose

Render the memo into a PDF-style form from the JSON.

### Inputs

The JSON source of truth.

### Outputs

A PDF preview and optional downloadable PDF.

### This stage does not

- Add information not present in JSON
- Alter the memo content
- Approve the memo

### Required status badge

**PDF rendered from JSON**

### Required explanation

> The PDF is the final presentation layer. It should not contain new information that is not already present in the structured JSON.

---

## Stage 6 — Lawyer Review

### Purpose

Make human review the final control point.

### Inputs

The memo and PDF generated from JSON.

### Outputs

A review checklist and status update.

### Required checklist

- Confirm email thread accurately reflects source material.
- Verify extracted facts against original emails.
- Remove or correct any assumptions.
- Review underlying transaction documents.
- Confirm legal issue classification.
- Amend memo wording where legal judgement is required.
- Approve PDF for internal circulation or partner briefing.

### Status transition

The user may click:

**Mark ready for lawyer review**

This changes the status from:

**Draft — lawyer review required**

To:

**Ready for lawyer review**

### This stage does not

- Mark advice as final
- Confirm legal correctness
- Replace partner review
- Replace client advice

---

## 8. Demo Email Thread

Use the following fictional thread as the base demo input:

```text
From: Sarah Chen, Partner
To: Corporate Team
Subject: Potential acquisition — North Harbour Data Centres

Team, we have been asked to give an initial view on Auckland Infrastructure Holdings Limited’s proposed acquisition of North Harbour Data Centres Limited. The target operates AI-enabled software that optimises energy usage across data centre sites. The buyer wants an early diligence view before signing exclusivity.

From: James Patel, Senior Associate
To: Sarah Chen, Corporate Team

Initial documents received: draft SPA, top 10 customer contracts, privacy policy, and a high-level product overview. We do not yet have AI vendor terms, data processing addenda, or cyber incident records.

From: Emma Roberts, General Counsel, Auckland Infrastructure Holdings Limited
To: Sarah Chen

A few points from our side: we are concerned about change of control clauses in customer contracts. We also want to know if any confidential customer data has been uploaded into third-party AI tools. Timeline is tight — we need an initial briefing by Friday 4pm before deciding whether to proceed to exclusivity.

From: Liam O’Connor, Associate
To: James Patel

I noticed that two large customers account for approximately 55% of recurring revenue. Several customer contracts include termination for convenience, and one contract appears to require consent to assignment or change of control. The privacy policy is generic and does not explain AI-related data processing.
```

---

## 9. Extraction Output Requirements

The extraction layer must output only the following.

### 9.1 Key Facts

- Auckland Infrastructure Holdings Limited is considering acquiring North Harbour Data Centres Limited.
- The target operates AI-enabled software for data centre energy optimisation.
- The buyer wants an early diligence view before signing exclusivity.
- The team has received the draft SPA, top 10 customer contracts, privacy policy and product overview.
- AI vendor terms, data processing addenda and cyber incident records have not been received.
- Two major customers account for approximately 55% of recurring revenue.
- Some customer contracts include termination for convenience.
- One contract may require consent to assignment or change of control.
- The privacy policy appears generic and does not explain AI-related data processing.

### 9.2 Instructions

- Prepare an initial view on the proposed acquisition.
- Identify key diligence issues before exclusivity.
- Address the client’s concerns about change of control and use of confidential customer data in third-party AI tools.
- Prepare an initial briefing for the client or partner.

### 9.3 Legal Issues

- Change of control / assignment consent under material customer contracts.
- Termination rights in customer contracts.
- Customer concentration risk.
- Use of confidential customer data in third-party AI tools.
- Missing AI vendor terms.
- Missing data processing addenda.
- Missing cyber incident records.
- Adequacy of privacy disclosures for AI-related processing.
- Potential competition scoping, depending on buyer market position.

### 9.4 Time Constraints

- Initial briefing required by Friday 4pm.
- Buyer wants early diligence view before signing exclusivity.
- Missing documents should be requested urgently.

---

## 10. JSON Schema Requirements

The JSON schema must contain these top-level keys:

```json
{
  "memo_metadata": {},
  "workflow_stage": {},
  "extracted_inputs": {},
  "memo": {},
  "pdf_form": {},
  "review": {}
}
```

### 10.1 `memo_metadata`

Must include:

- document_type
- to
- from
- subject
- file_number
- date
- status
- source_material

### 10.2 `workflow_stage`

Must include:

- current_stage
- human_review_required
- limitations

### 10.3 `extracted_inputs`

Must include:

- key_facts
- instructions
- legal_issues
- time_constraints

Each item should include, where possible:

- text
- source
- confidence
- priority or severity
- review_required

### 10.4 `memo`

Must include:

- background
- sections
- client_questions
- recommended_next_steps
- review_note

### 10.5 `pdf_form`

Must include:

- form_title
- fields
- status

### 10.6 `review`

Must include:

- status
- checklist
- reviewer_required

---

## 11. Component Architecture

Use this component structure:

```text
/components
  WorkflowShell.tsx
  StageNavigation.tsx
  WorkflowDiagram.tsx
  EmailThreadGenerator.tsx
  ExtractionPanel.tsx
  JsonSchemaViewer.tsx
  MemoPreview.tsx
  PdfFormPreview.tsx
  LawyerReviewChecklist.tsx
  StatusBadge.tsx
  SeverityBadge.tsx
  ConfidenceBadge.tsx

/lib
  demoEmailThread.ts
  extractionRules.ts
  memoSchema.ts
  memoRenderer.ts
  pdfRenderer.ts
  constants.ts
```

---

## 12. Data Flow Rules

### 12.1 Email thread generation

`demoEmailThread.ts` returns the fictional email string.

### 12.2 Extraction

`extractionRules.ts` receives the email string and returns:

```ts
{
  keyFacts: ExtractedFact[];
  instructions: Instruction[];
  legalIssues: LegalIssue[];
  timeConstraints: TimeConstraint[];
}
```

### 12.3 JSON generation

`memoSchema.ts` receives the extracted data and returns a validated memo JSON object.

Use Zod to validate the schema.

### 12.4 Memo rendering

`memoRenderer.ts` receives the JSON and returns formatted memo sections.

It must not generate new facts.

### 12.5 PDF rendering

`pdfRenderer.ts` receives the same JSON and generates a PDF preview or downloadable PDF.

It must not generate new facts.

---

## 13. Visual Design Rules

The product should feel like a professional internal legal technology tool.

Use:

- White background
- Slate text
- Soft blue accents
- Rounded cards
- Subtle shadows
- Clear stage labels
- Professional typography
- Calm spacing
- Minimal animation

Do not use:

- Robot icons
- “Magic” language
- Neon colours
- Overly playful copy
- Fake law firm branding
- Chapman Tripp branding

---

## 14. Required UI Copy

Place this near the top:

> This demo is designed to show workflow thinking. It takes a messy email thread and separates the process into source material, extraction, structured JSON, memo drafting, PDF rendering and lawyer review. The tool does not decide the law. It organises the work so a lawyer can review faster and more confidently.

Place this near extraction:

> The extraction layer is intentionally narrow. It extracts key facts, instructions, legal issues and time constraints only. It does not provide advice, apply law or reach conclusions.

Place this near JSON:

> The JSON object is the source of truth. The memo and PDF are rendered from the same structured data, making the workflow easier to audit, edit and reuse.

Place this near PDF:

> The PDF is the final presentation layer. It should not contain new information that is not already present in the structured JSON.

Place this near lawyer review:

> Human review is the control point. A lawyer must verify the extracted facts, review documents and approve the memo before it is relied on.

---

## 15. MVP Scope

The MVP must include:

1. Generate email thread button.
2. Email thread display.
3. Extract workflow data button.
4. Extraction-only cards.
5. JSON schema viewer.
6. Copy JSON button.
7. Memo preview rendered from JSON.
8. PDF preview rendered from JSON.
9. Download PDF button, if feasible.
10. Lawyer review checklist.
11. Status change to “Ready for lawyer review”.

The MVP does not need:

- Authentication
- Database
- Real email integration
- Real Outlook/Gmail API
- n8n integration
- Live AI extraction
- Matter management integration
- Document management integration

---

## 16. Future Enhancement Path

Future version could add:

1. Upload `.eml`, `.msg`, `.txt` or pasted email threads.
2. OpenAI Structured Outputs for extraction.
3. n8n workflow automation.
4. Outlook/Gmail integration.
5. Document management integration.
6. Version history.
7. Source-to-output citation links.
8. Lawyer annotation layer.
9. Firm-specific memo templates.
10. Client/matter metadata mapping.

---

## 17. Acceptance Criteria

The demo is successful if a viewer can understand within 60 seconds:

1. The starting point is a messy email thread.
2. The tool extracts facts, instructions, legal issues and time constraints only.
3. The extracted data becomes a JSON source of truth.
4. The memo is rendered from JSON.
5. The PDF is rendered from JSON.
6. Human lawyer review remains mandatory.
7. The system is about workflow design, not replacing lawyers.
8. The product reflects a professional internal legal memorandum style.

The demo should communicate:

> I understand legal workflows, not just AI.

> I understand how to separate source material, extraction, structured data, generated work product and review.

> I understand that legal judgement remains with lawyers.

> I can build simple, useful tools that improve day-to-day legal work.

---

## 18. Final Constitutional Rule

If any implementation choice creates conflict between technical impressiveness and workflow clarity, choose workflow clarity.

The purpose of this demo is not to show the most complex stack.

The purpose is to show disciplined legal engineering thinking.

