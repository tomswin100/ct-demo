/**
 * LLM extraction layer: email thread → ExtractedWorkflowData (see memoSchema.ExtractedWorkflowDataSchema).
 * Use with OpenAI Structured Outputs (`response_format.type: "json_schema"`, `strict: true`)
 * and model `o4` / `o3`, or any model your account exposes that supports json_schema.
 */

/** JSON Schema (draft 2020-12) aligned with ExtractedWorkflowDataSchema for strict API responses. */
export const extractionLayerJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["keyFacts", "instructions", "legalIssues", "timeConstraints"],
  properties: {
    keyFacts: {
      type: "array",
      items: { $ref: "#/$defs/extractedItem" },
    },
    instructions: {
      type: "array",
      items: { $ref: "#/$defs/extractedItem" },
    },
    legalIssues: {
      type: "array",
      items: { $ref: "#/$defs/legalIssueItem" },
    },
    timeConstraints: {
      type: "array",
      items: { $ref: "#/$defs/extractedItem" },
    },
  },
  $defs: {
    extractedItem: {
      type: "object",
      additionalProperties: false,
      required: ["text", "source", "confidence", "category", "reviewRequired"],
      properties: {
        text: { type: "string", minLength: 1 },
        source: { type: "string", minLength: 1 },
        confidence: { type: "string", enum: ["high", "medium", "low"] },
        category: {
          type: "string",
          minLength: 1,
          description:
            "Short machine-friendly slug grouping this row (e.g. matter-overview, bank-consent).",
        },
        reviewRequired: { type: "boolean", enum: [true] },
      },
    },
    legalIssueItem: {
      type: "object",
      additionalProperties: false,
      required: [
        "text",
        "source",
        "confidence",
        "category",
        "reviewRequired",
        "severity",
        "workstream",
      ],
      properties: {
        text: { type: "string", minLength: 1 },
        source: { type: "string", minLength: 1 },
        confidence: { type: "string", enum: ["high", "medium", "low"] },
        category: {
          type: "string",
          minLength: 1,
          description: "Slug for issue type (e.g. privacy-data, financing).",
        },
        reviewRequired: { type: "boolean", enum: [true] },
        severity: { type: "string", enum: ["high", "medium", "low"] },
        workstream: {
          type: "string",
          minLength: 1,
          description:
            "Diligence or legal workstream label (e.g. data-privacy, commercial-contracts).",
        },
      },
    },
  },
} as const;

export const EMAIL_THREAD_EXTRACTION_SYSTEM_PROMPT = `You are an extraction component in a legal workflow demo. Your only job is to read an email thread and return structured extraction rows. You do not practise law.

## What you MUST extract

Split content from the thread into exactly these four buckets:

1. **keyFacts** — Verifiable factual statements about the transaction, parties, assets, obligations, incidents, numbers, dates, or circumstances that appear in the thread. Operational context counts as fact if asserted (e.g. who said what they will do).

2. **instructions** — Direct asks, mandates, process rules, drafting requests, confidentiality rules, preferred memo structure, or “we need X by Y” style instructions aimed at advisers or internal legal. Questions that are clearly instructions for the lawyers count here.

3. **legalIssues** — Topics that would typically require legal analysis or lawyer judgement (risk areas, structuring choices, regulatory compliance matters, contractual consent points, liability themes). Phrase each as the *issue identified from correspondence*, not as advice or conclusions. Every legalIssues row MUST include severity and workstream.

4. **timeConstraints** — Dates, deadlines, “by Friday”, board pack timings, meetings scheduled, windows for offers, or any time pressure described in the thread (including soft timing).

## What you MUST NOT do

- Do not analyse, apply statute, or recommend a legal position.
- Do not say something is “compliant”, “legal”, “approved”, or “final”.
- Do not invent facts or deadlines not fairly supported by the thread. If something is unclear, either omit it or use lower confidence and neutral wording that reflects uncertainty.
- Do not draft memo prose, executive summaries, or a full issues memorandum here—only atomic extracted rows.
- Do not merge distinct points; prefer several precise rows over one vague paragraph.

## Row format rules

Each row (except the array keys) uses the same base shape:

- **text**: One clear standalone sentence or tight clause a lawyer can scan. No bullet markers in the string.
- **source**: Which email(s) support it—e.g. "Email 3 — Name, Role" or "Emails 2 and 5 — …". If the thread has no numbered emails, use sender + date or subject line.
- **confidence**: "high" if explicit in the text; "medium" if strongly implied; "low" if thin or ambiguous.
- **category**: A short kebab-case slug unique within its bucket for grouping (e.g. board-deadline, ip-software).
- **reviewRequired**: Always true (boolean).

For **legalIssues** only, also set:

- **severity**: "high" | "medium" | "low" — importance/urgency of the issue for deal or legal review, from the thread’s emphasis and commercial risk signals, not from your legal opinion.
- **workstream**: A short kebab-case label for who would usually handle it (e.g. transaction-structure, data-privacy, employment).

## Output

Return only JSON matching the provided schema. Use empty arrays when a category has nothing supportable. Every string field must be non-empty where the schema requires it.`;

export function buildEmailThreadExtractionUserMessage(emailThreadRawText: string): string {
  return `## Email thread (source material)

${emailThreadRawText}

---

Extract per the system instructions. Output JSON only, conforming to the schema.`;
}
