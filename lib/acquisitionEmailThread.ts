import type { EmailThread } from "./workflowTypes";
import { ACQUISITION_EMAIL_SOURCE_FILES } from "./acquisitionEmailRaw.generated";

type ParsedHeaders = {
  from: string;
  to: string;
  cc?: string;
  date?: string;
  subject: string;
  body: string;
};

function parseSingleEmail(raw: string): ParsedHeaders {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const headers: Record<string, string> = {};
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i += 1;
      break;
    }

    const headerMatch =
      /^(From|To|Cc|Date|Subject):\s*(.*)$/i.exec(line);
    if (headerMatch) {
      const key = headerMatch[1].toLowerCase();
      headers[key] = headerMatch[2].trim();
      i += 1;
      continue;
    }

    i += 1;
  }

  const body = lines.slice(i).join("\n").trim();

  return {
    from: headers.from ?? "",
    to: headers.to ?? "",
    cc: headers.cc,
    date: headers.date,
    subject: headers.subject ?? "",
    body,
  };
}

export function createAcquisitionEmailThread(): EmailThread {
  const parsed = ACQUISITION_EMAIL_SOURCE_FILES.map((f) =>
    parseSingleEmail(f.content),
  );

  const emails: EmailThread["emails"] = parsed.map((p, index) => ({
    id: `email-${String(index + 1).padStart(2, "0")}`,
    from: p.from,
    to: p.to,
    body: p.body,
    ...(p.cc ? { cc: p.cc } : {}),
    ...(p.date ? { date: p.date } : {}),
    ...(p.subject ? { subject: p.subject } : {}),
  }));

  const rawText = ACQUISITION_EMAIL_SOURCE_FILES.map((f) =>
    f.content.trim(),
  ).join("\n\n");

  return {
    matterName: "Southern Valley Organics acquisition",
    subject: parsed[0]?.subject ?? "Acquisition correspondence",
    rawText,
    emails,
  };
}

export function formatEmailThread(thread: EmailThread) {
  return [
    `Matter: ${thread.matterName}`,
    `Subject: ${thread.subject}`,
    "",
    thread.rawText,
  ].join("\n");
}
