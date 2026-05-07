# Project completion checklist

Work through this list to bring the **Email Thread to Legal Memo Workflow** demo in line with a small, reviewable quality bar—without redesigning the app. Status labels reflect the repo **as of the last edit** to this file.

**Legend:** `[x]` done / in good shape · `[ ]` still open · `[~]` partial

---

## 1. Clear folder structure

| Status | Item |
|--------|------|
| [x] | **App routes** live under `app/` (Next.js App Router). |
| [x] | **UI** lives under `components/`. |
| [x] | **Domain logic** lives under `lib/` (`memoSchema.ts`, `extractionRules.ts`, `workflowTypes.ts`, `constants.ts`, `pdfRenderer.ts`, email thread builders). |
| [x] | **Raw demo inputs** live under `data/acquisition-emails/` (numbered `.txt` files). |
| [x] | **Build / maintenance scripts** live under `scripts/` (`generateEmailThread.mjs`, `embedAcquisitionEmails.mjs`). |
| [ ] | **Optional cleanup:** Decide whether `lib/prompts/emailThreadExtraction.ts` is part of the shipped demo; if not, document it as experimental or relocate so `lib/` stays obviously “runtime” vs “draft prompts”. |
| [ ] | **Repo hygiene:** Confirm `.gitignore` excludes `.next/`, `node_modules/`, and generated artifacts you do not want committed; keep the tree clone-friendly. |

---

## 2. Clean README

| Status | Item |
|--------|------|
| [ ] | Add a **root `README.md`** (currently missing): one-line purpose, how to run (`npm install`, `npm run dev`), what the five workflow stages are, and pointer to `email_to_legal_memo_workflow_constitution.md` if that remains the normative spec. |
| [ ] | Document **`npm run generate:email-thread`** and **`npm run embed:acquisition-emails`**—when to use them and what files they update (e.g. `lib/acquisitionEmailRaw.generated.ts`). |
| [ ] | State clearly that output is **draft / lawyer review required**, not advice (matches copy already in the UI and memo). |

---

## 3. Simple schema

| Status | Item |
|--------|------|
| [x] | **Zod** validates extracted data and full memo JSON in `lib/memoSchema.ts` (`ExtractedWorkflowDataSchema`, `MemoJsonSchema`). |
| [x] | **TypeScript types** in `lib/workflowTypes.ts` describe the same shapes for the UI. |
| [ ] | **Reduce drift:** Types allow optional / alternate field names (`clientQuestions` vs `client_questions`, etc.) while Zod enforces snake_case in `MemoJson`—either document that as intentional “legacy flexibility” or narrow types to match the schema only. |
| [ ] | **Single place for “stage” semantics:** `WorkflowStage` and `WORKFLOW_STAGES` are aligned; keep new stages out unless the constitution and UI nav are updated together. |

---

## 4. Obvious workflow stages

| Status | Item |
|--------|------|
| [x] | Five stages are defined in `lib/constants.ts` and surfaced in **navigation**, **diagram**, and **stage explainer** (`StageNavigation`, `WorkflowDiagram`, `StageExplainer`). |
| [x] | Primary actions in `components/WorkflowShell.tsx` map to: generate thread → extract → create JSON (+ memo readiness) → PDF render. |
| [ ] | **Clarify “JSON vs memo preview”:** Creating JSON sets `current_stage` in JSON to `json-schema` and flags memo preview ready, but the **UI stage** may still be `json-schema` until the user clicks **Memo Preview**—verify this matches demo narrative (or auto-advance / add a short note in the explainer). |
| [ ] | **Reset behaviour:** `handleResetDemo` clears `emailThread` until the next `useEffect` repopulates it—confirm whether an empty flash is acceptable or thread should repopulate synchronously for demos. |

---

## 5. Comments explaining the logic

| Status | Item |
|--------|------|
| [ ] | **`lib/extractionRules.ts`:** Add a short file-level comment describing the **keyword / `includesAll` filter** model and that items are dropped when the normalised thread lacks triggers (intentional demo behaviour). |
| [ ] | **`lib/memoSchema.ts`:** Comment **why** `createMemoJson` composes sections from arrays (and where fallbacks apply) vs which memo fields are fixed template text. |
| [ ] | **`components/WorkflowShell.tsx`:** Optional brief comment on **state machine** expectations (what each handler clears and why PDF updates `workflow_stage.current_stage`). |

---

## 6. No broken UI

| Status | Item |
|--------|------|
| [ ] | **Smoke test:** Fresh clone → `npm install` → `npm run dev` → click through all five stages; no console errors; no empty layouts where content should exist. |
| [ ] | **`npm run build`:** Ensures production build passes (catch missing imports, type errors). |
| [ ] | **Edge cases:** Empty extraction groups (if thread text ever mismatches filters)—`ExtractionPanel` should still render sensible empty group states if arrays are empty. |
| [ ] | **PDF path:** Confirm **Download PDF** / print path on target browsers; `PdfFormPreview` already surfaces a fallback message when preview cannot open. |

---

## 7. No hallucinated output (aligned with constitution)

| Status | Item |
|--------|------|
| [x] | Extraction layer is **rule-based** and tied to thread snippets; items include **source** strings (`lib/extractionRules.ts`). |
| [ ] | **Memo `client_questions` and `recommended_next_steps`** in `createMemoJson` are **hardcoded narrative**, not derived from extracted fields—per the constitution (“memo must not invent facts”), either: **(a)** derive them only from extracted JSON, **(b)** move them to clearly labelled static “illustrative template” excluded from “extracted truth”, or **(c)** add explicit provenance in the JSON/UI for each bullet. |
| [ ] | **Fallback strings** in `createMemoJson` (e.g. when lists are empty) should read as **verification prompts**, not as new facts—review wording once more with that lens. |

---

## 8. Source mapping back to emails

| Status | Item |
|--------|------|
| [x] | Each extracted item exposes **`source`** (e.g. “Email 7 — …”) in **`ExtractionPanel`**. |
| [ ] | **Tighten references:** Where “Email N” is used, optionally align with **`email.id`** or numbered files under `data/acquisition-emails/` so reviewers can jump from JSON to file. |
| [ ] | **Memo / PDF layers:** If memo bullets mix extracted and non-extracted content (see §7), ensure the **UI or JSON** shows which paragraphs are extraction-sourced vs template. |

---

## 9. Sensible error messages

| Status | Item |
|--------|------|
| [x] | PDF flow: user-facing message when print preview fails (`PdfFormPreview`). |
| [ ] | **`createMemoJson` / Zod:** If parsing fails at runtime (unexpected data), avoid a raw stack trace in the UI—catch in `WorkflowShell` (or boundary) and show a short **“Validation failed—reset or regenerate”** message with optional dev detail. |
| [ ] | **Buttons:** Disabled states already imply ordering; optional `title` tooltips on disabled primary actions (“Run extraction first”) for accessibility and demos. |

---

## 10. Example input and output

| Status | Item |
|--------|------|
| [x] | **Input:** Thread assembled from `data/acquisition-emails/*.txt` via embed script / `createAcquisitionEmailThread()`. |
| [ ] | **Checked-in artefact:** Add `examples/` (or a README subsection) with **one** small `memo.json` (redacted ok) produced by the happy path, plus a pointer to which email set version was used. |
| [ ] | Optionally export **“Copy JSON”** from `JsonSchemaViewer` if not already trivial for demos—only if it stays simple. |

---

## 11. Basic tests or validation checks

| Status | Item |
|--------|------|
| [ ] | Add **one** minimal automated check, e.g.: given the **frozen demo `rawText`**, `extractWorkflowData` returns data that **`ExtractedWorkflowDataSchema.parse`** accepts, and `createMemoJson` returns data that **`MemoJsonSchema.parse`** accepts. (Vitest/Jest/node:test—pick one; keep the footprint small.) |
| [ ] | Add **`npm test`** (or `npm run validate`) to `package.json` and run it in CI if applicable. |
| [ ] | Optional second check: **golden snapshot** of `keyFacts.length` / category list for the default thread—guards accidental prompt/data drift. |

---

## Quick reference — where things live

| Concern | Location |
|--------|----------|
| Stage copy and navigation metadata | `lib/constants.ts` |
| Extraction + source strings | `lib/extractionRules.ts` |
| JSON validation + `createMemoJson` | `lib/memoSchema.ts` |
| Types | `lib/workflowTypes.ts` |
| Orchestration UI | `components/WorkflowShell.tsx` |
| PDF / print | `lib/pdfRenderer.ts`, `components/PdfFormPreview.tsx` |
| Email source files | `data/acquisition-emails/` |
| Normative product rules | `email_to_legal_memo_workflow_constitution.md` |

---

When every item above is `[x]`, the demo matches the intended structure: **clear tree, documented entrypoint, validated JSON, obvious stages, explained rules, trustworthy sourcing, honest memo boundaries, friendly failures, reproducible examples, and a thin safety net of tests.**
