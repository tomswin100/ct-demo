import type { MemoJson } from "./workflowTypes";

type PdfMemoField = {
  label: string;
  value: string;
};

type PdfMemoSection = {
  heading: string;
  paragraphs: string[];
};

export type PdfMemoViewModel = {
  title: string;
  statusLabel: string;
  metadataFields: PdfMemoField[];
  background: string[];
  issueSections: PdfMemoSection[];
  recommendedActions: string[];
  clientQuestions: string[];
  reviewNote: string[];
  footerLabel: string;
};

type PdfLineStyle = "title" | "heading" | "subheading" | "meta" | "body" | "list" | "footer";

type PdfLine = {
  text: string;
  style: PdfLineStyle;
};

type PdfPage = {
  lines: Array<{
    text: string;
    style: PdfLineStyle;
    x: number;
    y: number;
  }>;
};

const FOOTER_LABEL = "Draft for review — lawyer verification required";

function formatMemoDate(value: string) {
  const parsed = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

function normalizeItems(items: string[] | undefined) {
  return (items ?? []).map((item) => item.trim()).filter(Boolean);
}

function normalizeReviewNote(reviewNote: string | undefined) {
  const note = reviewNote?.trim();

  if (!note) {
    return [];
  }

  return note
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sanitizePdfText(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[^\x20-\x7E]/g, "");
}

function escapePdfText(value: string) {
  return sanitizePdfText(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)");
}

function getStatusLabel(memoJson: MemoJson) {
  return memoJson.memo_metadata.status;
}

function buildMetadataFields(memoJson: MemoJson): PdfMemoField[] {
  return [
    { label: "TO", value: memoJson.memo_metadata.to },
    { label: "FROM", value: memoJson.memo_metadata.from },
    { label: "SUBJECT", value: memoJson.memo_metadata.subject },
    {
      label: "FILE NUMBER",
      value:
        memoJson.memo_metadata.file_number ?? memoJson.memo_metadata.fileNumber ?? "",
    },
    { label: "DATE", value: formatMemoDate(memoJson.memo_metadata.date) },
    { label: "STATUS", value: getStatusLabel(memoJson) },
  ].filter((field) => field.value.trim().length > 0);
}

export function createPdfMemoViewModel(memoJson: MemoJson): PdfMemoViewModel {
  return {
    title: "FILE NOTE",
    statusLabel: getStatusLabel(memoJson),
    metadataFields: buildMetadataFields(memoJson),
    background: normalizeItems(memoJson.memo.background),
    issueSections: memoJson.memo.sections.map((section) => ({
      heading: section.heading,
      paragraphs: normalizeItems(section.points ?? section.paragraphs ?? []),
    })),
    recommendedActions: normalizeItems(
      memoJson.memo.recommended_next_steps ?? memoJson.memo.recommendedNextSteps,
    ),
    clientQuestions: normalizeItems(
      memoJson.memo.client_questions ?? memoJson.memo.clientQuestions,
    ),
    reviewNote: normalizeReviewNote(
      memoJson.memo.review_note ?? memoJson.memo.reviewNote,
    ),
    footerLabel: FOOTER_LABEL,
  };
}

function buildPdfLines(viewModel: PdfMemoViewModel): PdfLine[] {
  const lines: PdfLine[] = [];

  lines.push({ text: viewModel.title, style: "title" });

  for (const field of viewModel.metadataFields) {
    lines.push({ text: `${field.label}: ${field.value}`, style: "meta" });
  }

  lines.push({ text: "", style: "body" });
  lines.push({ text: "Background", style: "heading" });
  for (const paragraph of viewModel.background) {
    lines.push({ text: paragraph, style: "body" });
  }

  lines.push({ text: "", style: "body" });
  lines.push({ text: "Key issues", style: "heading" });
  for (const section of viewModel.issueSections) {
    lines.push({ text: section.heading, style: "subheading" });
    for (const paragraph of section.paragraphs) {
      lines.push({ text: paragraph, style: "body" });
    }
  }

  lines.push({ text: "", style: "body" });
  lines.push({ text: "Recommended actions", style: "heading" });
  for (const item of viewModel.recommendedActions) {
    lines.push({ text: `- ${item}`, style: "list" });
  }

  lines.push({ text: "", style: "body" });
  lines.push({ text: "Client questions", style: "heading" });
  for (const item of viewModel.clientQuestions) {
    lines.push({ text: `- ${item}`, style: "list" });
  }

  if (viewModel.reviewNote.length > 0) {
    lines.push({ text: "", style: "body" });
    lines.push({ text: "Review note", style: "heading" });
    for (const paragraph of viewModel.reviewNote) {
      lines.push({ text: paragraph, style: "body" });
    }
  }

  lines.push({ text: "", style: "body" });
  lines.push({ text: viewModel.footerLabel, style: "footer" });

  return lines;
}

function getStyleMetrics(style: PdfLineStyle) {
  switch (style) {
    case "title":
      return { font: "F2", fontSize: 18, leading: 24, maxChars: 42, x: 50 };
    case "heading":
      return { font: "F2", fontSize: 14, leading: 20, maxChars: 62, x: 50 };
    case "subheading":
      return { font: "F2", fontSize: 12, leading: 17, maxChars: 78, x: 58 };
    case "meta":
      return { font: "F1", fontSize: 10.5, leading: 15, maxChars: 82, x: 50 };
    case "list":
      return { font: "F1", fontSize: 11, leading: 16, maxChars: 78, x: 62 };
    case "footer":
      return { font: "F1", fontSize: 10, leading: 15, maxChars: 86, x: 50 };
    case "body":
    default:
      return { font: "F1", fontSize: 11, leading: 16, maxChars: 86, x: 50 };
  }
}

function wrapPdfLine(text: string, maxChars: number) {
  const sanitized = sanitizePdfText(text).trim();

  if (!sanitized) {
    return [""];
  }

  const words = sanitized.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (next.length <= maxChars) {
      current = next;
      continue;
    }

    if (current) {
      lines.push(current);
      current = word;
      continue;
    }

    lines.push(word.slice(0, maxChars));
    current = word.slice(maxChars);
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function paginatePdfLines(lines: PdfLine[]): PdfPage[] {
  const pages: PdfPage[] = [];
  let currentPage: PdfPage = { lines: [] };
  let y = 792;
  const bottomMargin = 60;

  for (const line of lines) {
    const metrics = getStyleMetrics(line.style);
    const wrappedLines = wrapPdfLine(line.text, metrics.maxChars);

    for (const wrappedLine of wrappedLines) {
      if (y < bottomMargin) {
        pages.push(currentPage);
        currentPage = { lines: [] };
        y = 792;
      }

      currentPage.lines.push({
        text: wrappedLine,
        style: line.style,
        x: metrics.x,
        y,
      });

      y -= metrics.leading;
    }

    if (line.style === "title" || line.style === "heading") {
      y -= 4;
    }
  }

  if (currentPage.lines.length > 0) {
    pages.push(currentPage);
  }

  return pages;
}

function buildPdfContentStream(page: PdfPage) {
  return page.lines
    .map((line) => {
      const metrics = getStyleMetrics(line.style);
      return `BT /${metrics.font} ${metrics.fontSize} Tf 1 0 0 1 ${line.x} ${line.y} Tm (${escapePdfText(line.text)}) Tj ET`;
    })
    .join("\n");
}

function createPdfBinary(viewModel: PdfMemoViewModel) {
  const lines = buildPdfLines(viewModel);
  const pages = paginatePdfLines(lines);
  const objects: string[] = [];

  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objects[4] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

  const pageObjectIds: number[] = [];
  let nextObjectId = 5;

  for (const page of pages) {
    const pageObjectId = nextObjectId;
    const contentObjectId = nextObjectId + 1;
    const contentStream = buildPdfContentStream(page);

    pageObjectIds.push(pageObjectId);
    objects[pageObjectId] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjectId} 0 R >>`;
    objects[contentObjectId] =
      `<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream`;

    nextObjectId += 2;
  }

  objects[2] = `<< /Type /Pages /Kids [${pageObjectIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageObjectIds.length} >>`;

  const encoder = new TextEncoder();
  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [];

  for (let id = 1; id < objects.length; id += 1) {
    const objectContent = objects[id];
    if (!objectContent) {
      continue;
    }

    offsets[id] = encoder.encode(pdf).length;
    pdf += `${id} 0 obj\n${objectContent}\nendobj\n`;
  }

  const xrefOffset = encoder.encode(pdf).length;
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += "0000000000 65535 f \n";

  for (let id = 1; id < objects.length; id += 1) {
    const offset = offsets[id] ?? 0;
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return encoder.encode(pdf);
}

function createPdfFilename(memoJson: MemoJson) {
  const rawSubject = memoJson.memo_metadata.subject || "file-note";
  const base = rawSubject
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return `${base || "file-note"}.pdf`;
}

export function createMemoPdfBytes(memoJson: MemoJson) {
  return createPdfBinary(createPdfMemoViewModel(memoJson));
}

function renderMetadataFields(fields: PdfMemoField[]) {
  return fields
    .map(
      (field) => `
        <div class="meta-row">
          <dt>${escapeHtml(field.label)}</dt>
          <dd>${escapeHtml(field.value)}</dd>
        </div>
      `,
    )
    .join("");
}

function renderParagraphs(paragraphs: string[]) {
  return paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

function renderList(items: string[]) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function renderIssueSections(sections: PdfMemoSection[]) {
  return sections
    .map(
      (section) => `
        <div class="issue-block">
          <h3>${escapeHtml(section.heading)}</h3>
          ${renderParagraphs(section.paragraphs)}
        </div>
      `,
    )
    .join("");
}

export function createPrintableMemoHtml(memoJson: MemoJson): string {
  const viewModel = createPdfMemoViewModel(memoJson);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(viewModel.title)}</title>
    <style>
      :root {
        color-scheme: light;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: #e2e8f0;
        color: #0f172a;
        font-family: Georgia, "Times New Roman", serif;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      .page-shell {
        padding: 32px 20px;
      }

      .page {
        width: 210mm;
        min-height: 297mm;
        margin: 0 auto;
        background: #ffffff;
        padding: 22mm 18mm 20mm;
        box-shadow: 0 28px 60px -40px rgba(15, 23, 42, 0.35);
      }

      .eyebrow {
        margin: 0 0 8px;
        color: #1d4ed8;
        font-family: "Helvetica Neue", Arial, sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.22em;
        text-transform: uppercase;
      }

      h1 {
        margin: 0;
        font-size: 28px;
        letter-spacing: 0.08em;
      }

      .meta-grid {
        margin-top: 22px;
        border-top: 1px solid #cbd5e1;
        border-bottom: 1px solid #cbd5e1;
        padding: 16px 0;
      }

      .meta-row {
        display: grid;
        grid-template-columns: 125px minmax(0, 1fr);
        gap: 14px;
        padding: 5px 0;
      }

      .meta-row dt {
        color: #475569;
        font-family: "Helvetica Neue", Arial, sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
      }

      .meta-row dd {
        margin: 0;
        font-size: 13.5px;
        line-height: 1.72;
      }

      .section {
        margin-top: 24px;
      }

      .section h2 {
        margin: 0 0 10px;
        font-size: 20px;
      }

      .section h3 {
        margin: 0 0 8px;
        font-size: 16px;
      }

      .section p,
      .section li {
        margin: 0 0 10px;
        font-size: 13.5px;
        line-height: 1.78;
      }

      .section ul {
        margin: 0;
        padding-left: 20px;
      }

      .issue-block {
        border-left: 2px solid #cbd5e1;
        margin-top: 12px;
        padding-left: 14px;
      }

      .review-note {
        border: 1px solid #cbd5e1;
        background: #f8fafc;
        padding: 14px 16px;
      }

      footer {
        margin-top: 28px;
        border-top: 1px solid #cbd5e1;
        padding-top: 14px;
        color: #475569;
        font-family: "Helvetica Neue", Arial, sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.08em;
      }

      @page {
        margin: 12mm;
      }

      @media print {
        body {
          background: #ffffff;
        }

        .page-shell {
          padding: 0;
        }

        .page {
          width: auto;
          min-height: auto;
          box-shadow: none;
          padding: 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="page-shell">
      <article class="page">
        <p class="eyebrow">PDF generated from structured JSON</p>
        <h1>${escapeHtml(viewModel.title)}</h1>

        <dl class="meta-grid">
          ${renderMetadataFields(viewModel.metadataFields)}
        </dl>

        <section class="section">
          <h2>Background</h2>
          ${renderParagraphs(viewModel.background)}
        </section>

        <section class="section">
          <h2>Issue sections</h2>
          ${renderIssueSections(viewModel.issueSections)}
        </section>

        <section class="section">
          <h2>Recommended actions</h2>
          <ul>${renderList(viewModel.recommendedActions)}</ul>
        </section>

        <section class="section">
          <h2>Client questions</h2>
          <ul>${renderList(viewModel.clientQuestions)}</ul>
        </section>

        <section class="section">
          <h2>Review note</h2>
          <div class="review-note">
            ${renderParagraphs(viewModel.reviewNote)}
          </div>
        </section>

        <footer>${escapeHtml(viewModel.footerLabel)}</footer>
      </article>
    </div>
  </body>
</html>`;
}

export function openMemoPrintPreview(memoJson: MemoJson): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  const html = createPrintableMemoHtml(memoJson);
  const iframe = document.createElement("iframe");

  iframe.setAttribute("title", "Print preview");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText =
    "position:fixed;left:0;top:0;width:1px;height:1px;border:0;opacity:0;pointer-events:none";

  document.body.appendChild(iframe);

  const win = iframe.contentWindow;
  const doc = iframe.contentDocument;

  if (!win || !doc) {
    iframe.remove();
    return false;
  }

  doc.open();
  doc.write(html);
  doc.close();

  const cleanup = () => {
    if (iframe.isConnected) {
      iframe.remove();
    }
  };

  const timeoutFallback = window.setTimeout(cleanup, 120_000);

  win.addEventListener(
    "afterprint",
    () => {
      window.clearTimeout(timeoutFallback);
      cleanup();
    },
    { once: true },
  );

  window.setTimeout(() => {
    try {
      win.focus();
      win.print();
    } catch (error) {
      window.clearTimeout(timeoutFallback);
      cleanup();
      console.error("Print failed.", error);
    }
  }, 300);

  return true;
}

export function downloadMemoPdf(memoJson: MemoJson): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  try {
    const pdfBytes = createMemoPdfBytes(memoJson);
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const anchor = window.document.createElement("a");

    anchor.href = url;
    anchor.download = createPdfFilename(memoJson);
    anchor.style.display = "none";
    window.document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000);

    return true;
  } catch (error) {
    console.error("Failed to generate the PDF export.", error);
    return false;
  }
}
