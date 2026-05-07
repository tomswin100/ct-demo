import type { MemoJson, MemoMetadata } from "./workflowTypes";

export type RenderedMemoField = {
  label: string;
  value: string;
};

export type RenderedMemoParagraph = {
  number: number;
  text: string;
};

export type RenderedMemoSection = {
  key: string;
  heading: string;
  paragraphs: RenderedMemoParagraph[];
};

export type RenderedMemo = {
  title: string;
  sourceOfTruthLabel: string;
  statusLabel: string;
  warningLabel: string;
  sourceMaterialLabel: string;
  headerFields: RenderedMemoField[];
  sections: RenderedMemoSection[];
};

function getFileNumber(metadata: MemoMetadata) {
  return metadata.file_number ?? metadata.fileNumber ?? "";
}

function getSourceMaterial(metadata: MemoMetadata) {
  return metadata.source_material ?? metadata.sourceMaterial ?? "";
}

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

function normalizeParagraphs(paragraphs: string[] | undefined) {
  return (paragraphs ?? []).map((paragraph) => paragraph.trim()).filter(Boolean);
}

function splitReviewNote(reviewNote: string | undefined) {
  const note = reviewNote?.trim();

  if (!note) {
    return [];
  }

  const sentences = note
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  return sentences.length > 0 ? sentences : [note];
}

function buildRenderedSection(
  key: string,
  heading: string,
  paragraphs: string[],
  startNumber: number,
) {
  const normalizedParagraphs = normalizeParagraphs(paragraphs);

  if (normalizedParagraphs.length === 0) {
    return {
      nextNumber: startNumber,
      section: null,
    };
  }

  const section: RenderedMemoSection = {
    key,
    heading,
    paragraphs: normalizedParagraphs.map((text, index) => ({
      number: startNumber + index,
      text,
    })),
  };

  return {
    nextNumber: startNumber + normalizedParagraphs.length,
    section,
  };
}

export function renderMemoFromJson(memoJson: MemoJson): RenderedMemo {
  let paragraphNumber = 1;
  const sections: RenderedMemoSection[] = [];

  const appendSection = (key: string, heading: string, paragraphs: string[]) => {
    const rendered = buildRenderedSection(key, heading, paragraphs, paragraphNumber);

    if (!rendered.section) {
      return;
    }

    sections.push(rendered.section);
    paragraphNumber = rendered.nextNumber;
  };

  appendSection("background", "Background", memoJson.memo.background);

  memoJson.memo.sections.forEach((section, index) => {
    appendSection(
      `memo-section-${index}`,
      section.heading,
      section.points ?? section.paragraphs ?? [],
    );
  });

  appendSection(
    "client-questions",
    "Client questions",
    memoJson.memo.client_questions ?? memoJson.memo.clientQuestions ?? [],
  );

  appendSection(
    "practical-recommendations",
    "Practical recommendations",
    memoJson.memo.recommended_next_steps ??
      memoJson.memo.recommendedNextSteps ??
      [],
  );

  appendSection(
    "review-note",
    "Review note",
    splitReviewNote(memoJson.memo.review_note ?? memoJson.memo.reviewNote),
  );

  return {
    title: "FILE NOTE",
    sourceOfTruthLabel: "Structured output",
    statusLabel: memoJson.memo_metadata.status,
    warningLabel: "Draft for review. Lawyer verification is still required.",
    sourceMaterialLabel: getSourceMaterial(memoJson.memo_metadata),
    headerFields: [
      {
        label: "TO",
        value: memoJson.memo_metadata.to,
      },
      {
        label: "FROM",
        value: memoJson.memo_metadata.from,
      },
      {
        label: "SUBJECT",
        value: memoJson.memo_metadata.subject,
      },
      {
        label: "FILE NUMBER",
        value: getFileNumber(memoJson.memo_metadata),
      },
      {
        label: "DATE",
        value: formatMemoDate(memoJson.memo_metadata.date),
      },
    ],
    sections,
  };
}
