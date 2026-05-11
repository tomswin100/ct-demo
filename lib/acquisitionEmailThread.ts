import type { EmailThread, TransactionType } from "./workflowTypes";

type Person = {
  name: string;
  title: string;
};

type ClientIdentity = {
  company: string;
  domain: string;
};

type BusinessProfile = {
  description: string;
  location: string;
  product: string;
  customerBase: string;
  regulatoryAngle: string;
  propertyAsset: string;
};

type ThreadScenario = {
  transactionType: TransactionType;
  clientName: string;
  counterpartyName: string;
  subject: string;
  matterName: string;
  fileNumber: string;
  memoDate: string;
  emails: EmailThread["emails"];
};

const CLIENT_IDENTITIES: ClientIdentity[] = [
  {
    company: "Harbour Crest Group Limited",
    domain: "harbourcrest.co.nz",
  },
  {
    company: "Southbank Consumer Holdings Limited",
    domain: "southbankholdings.co.nz",
  },
  {
    company: "Pacific Reach Holdings Limited",
    domain: "pacificreach.co.nz",
  },
  {
    company: "Aoraki Industrial Group Limited",
    domain: "aorakiindustrial.co.nz",
  },
  {
    company: "Kowhai Growth Partners Limited",
    domain: "kowhaigrowth.co.nz",
  },
  {
    company: "Stonepine Capital Limited",
    domain: "stonepinecapital.co.nz",
  },
];

const COMPANY_PREFIXES = [
  "Northstar",
  "Silver Fern",
  "Canopy",
  "Bluepeak",
  "Ridgeway",
  "Orbit",
  "Summerset",
  "Kauri",
  "Tidal",
  "Anchor",
  "Southern Cross",
  "Meridian",
];

const COMPANY_SUFFIXES = [
  "Health",
  "Systems",
  "Logistics",
  "Labs",
  "Foods",
  "Energy",
  "Software",
  "Care",
  "Dynamics",
  "Networks",
  "Composites",
  "Services",
];

const BUSINESS_PROFILES: BusinessProfile[] = [
  {
    description:
      "develops cloud workflow software for diagnostic clinics and community labs",
    location: "Christchurch",
    product: "the NovaFlow platform",
    customerBase: "private hospital groups and laboratory networks",
    regulatoryAngle:
      "an unresolved cyber remediation item flagged during a recent customer security review",
    propertyAsset: "the Christchurch headquarters lease",
  },
  {
    description:
      "runs cold-chain warehousing and last-mile distribution for grocery suppliers",
    location: "Hamilton",
    product: "temperature-controlled depots and routing software",
    customerBase: "national supermarket and food-service chains",
    regulatoryAngle:
      "a recent MPI corrective action request tied to temperature logging records",
    propertyAsset: "the main Hamilton depot lease",
  },
  {
    description:
      "manufactures agritech sensors used for irrigation and soil monitoring",
    location: "Tauranga",
    product: "sensor hardware and the PulseField analytics dashboard",
    customerBase: "large orchard operators and irrigation installers",
    regulatoryAngle:
      "a customs classification issue affecting imported component shipments",
    propertyAsset: "the Tauranga assembly site lease",
  },
  {
    description:
      "provides payroll, rostering and compliance software to multi-site employers",
    location: "Wellington",
    product: "the ShiftStack platform",
    customerBase: "aged care groups, retailers and hospitality operators",
    regulatoryAngle:
      "a pending customer audit into wage-calculation controls and record retention",
    propertyAsset: "the Wellington office sublease",
  },
  {
    description:
      "supplies renewable-energy maintenance services and monitoring tools",
    location: "Nelson",
    product: "remote monitoring systems for commercial solar assets",
    customerBase: "commercial property owners and regional utilities",
    regulatoryAngle:
      "a WorkSafe review following a contractor incident at a client site last quarter",
    propertyAsset: "the Nelson operations yard lease",
  },
  {
    description:
      "manufactures premium nutrition products for pets and specialty retailers",
    location: "Dunedin",
    product: "small-batch nutrition formulas and a direct subscription channel",
    customerBase: "specialty retail chains and subscription customers",
    regulatoryAngle:
      "an open labelling query raised during an overseas distributor compliance review",
    propertyAsset: "the Dunedin production premises lease",
  },
];

const SPONSORS: Person[] = [
  { name: "Sarah McKenzie", title: "Head of Corporate Development" },
  { name: "Olivia Bennett", title: "Strategy Director" },
  { name: "Daniel Wu", title: "Investment Director" },
  { name: "Mia Thompson", title: "M&A Lead" },
];

const LAWYERS: Person[] = [
  { name: "James Patel", title: "General Counsel" },
  { name: "Rachel Ngata", title: "Senior Legal Counsel" },
  { name: "Priya Raman", title: "Legal Director" },
  { name: "Tom Becker", title: "General Counsel" },
];

const ANALYSTS: Person[] = [
  { name: "Mark Allen", title: "Corporate Development Manager" },
  { name: "Lucy Carter", title: "Investment Associate" },
  { name: "Noah Kim", title: "Strategy Manager" },
  { name: "Ella Fitzgerald", title: "Transactions Associate" },
];

const CFOS: Person[] = [
  { name: "David Chen", title: "Chief Financial Officer" },
  { name: "Hannah Price", title: "Chief Financial Officer" },
  { name: "Ben Thompson", title: "Finance Director" },
  { name: "Ava Singh", title: "Chief Financial Officer" },
];

const OPERATIONS_LEADS: Person[] = [
  { name: "Talia Roberts", title: "Operations Director" },
  { name: "Michael Rees", title: "Commercial Director" },
  { name: "Emma Clarke", title: "Chief Operating Officer" },
  { name: "Isaac Martin", title: "Head of Operations" },
];

const TECH_LEADS: Person[] = [
  { name: "Leo Harrison", title: "Chief Technology Officer" },
  { name: "Anika Sharma", title: "Product Director" },
  { name: "Sophie Walker", title: "Head of Data" },
  { name: "Jacob Evans", title: "Technology Lead" },
];

const CONFIDENTIALITY_LINES = [
  "Please keep the circle tight until the NDA is signed.",
  "No one should contact management or customers before the NDA is live.",
  "Treat this as highly confidential until the deal team is settled.",
];

const ACQUISITION_STRUCTURES = [
  "100% share acquisition",
  "share purchase with a small rollover from management",
  "cash-backed acquisition of all issued shares",
];

const MERGER_STRUCTURES = [
  "board-supported scheme of arrangement",
  "contractual merger with reciprocal exclusivity",
  "amalgamation structure if diligence lands cleanly",
];

const SIGNING_LANGUAGE: Record<TransactionType, string> = {
  acquisition: "signing or closing",
  merger: "signing or implementation",
};

const COUNTERPARTY_PARTNERS = [
  "GreenFields Distribution",
  "Atlas Retail Group",
  "Summit Health Network",
  "Southern Grid Services",
  "Harbourline Wholesale",
  "Kestrel Supply Partners",
];

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uniqueCompanies() {
  const used = new Set<string>();

  function buildName() {
    let name = "";

    while (!name || used.has(name)) {
      name = `${pick(COMPANY_PREFIXES)} ${pick(COMPANY_SUFFIXES)} Limited`;
    }

    used.add(name);
    return name;
  }

  return {
    next: buildName,
  };
}

function slugCompanyName(company: string) {
  return company
    .toLowerCase()
    .replace(/\blimited\b/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function localPart(name: string) {
  return name.toLowerCase().replace(/[^a-z]+/g, ".");
}

function createEmailAddress(name: string, domain: string) {
  return `${localPart(name)}@${domain}`;
}

function createDisplayAddress(person: Person, domain: string) {
  return `${person.name} <${createEmailAddress(person.name, domain)}>`;
}

function addHours(base: Date, hours: number, minutes: number) {
  return new Date(
    Date.UTC(
      base.getUTCFullYear(),
      base.getUTCMonth(),
      base.getUTCDate(),
      hours,
      minutes,
    ),
  );
}

function addDays(base: Date, days: number) {
  return new Date(
    Date.UTC(
      base.getUTCFullYear(),
      base.getUTCMonth(),
      base.getUTCDate() + days,
      0,
      0,
    ),
  );
}

function formatEmailDate(value: Date) {
  return new Intl.DateTimeFormat("en-NZ", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(value);
}

function formatLongDate(value: Date) {
  return new Intl.DateTimeFormat("en-NZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(value);
}

function formatIsoDate(value: Date) {
  return value.toISOString().slice(0, 10);
}

function formatNzMoney(amountMillions: number) {
  return `NZD $${amountMillions.toFixed(1)}m`;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function companyCode(name: string) {
  return name
    .replace(/\bLimited\b/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 4);
}

function buildRawEmail(email: EmailThread["emails"][number]) {
  return [
    `From: ${email.from}`,
    `To: ${email.to}`,
    ...(email.cc ? [`Cc: ${email.cc}`] : []),
    ...(email.date ? [`Date: ${email.date}`] : []),
    ...(email.subject ? [`Subject: ${email.subject}`] : []),
    "",
    email.body.trim(),
  ].join("\n");
}

function createScenario(): ThreadScenario {
  const companyNames = uniqueCompanies();
  const transactionType = Math.random() < 0.5 ? "acquisition" : "merger";
  const client = pick(CLIENT_IDENTITIES);
  let counterpartyName = companyNames.next();

  while (counterpartyName === client.company) {
    counterpartyName = companyNames.next();
  }

  const partnerName = pick(COUNTERPARTY_PARTNERS);
  const profile = pick(BUSINESS_PROFILES);
  const sponsor = pick(SPONSORS);
  const lawyer = pick(LAWYERS);
  const analyst = pick(ANALYSTS);
  const cfo = pick(CFOS);
  const operationsLead = pick(OPERATIONS_LEADS);
  const techLead = pick(TECH_LEADS);

  const clientShort = client.company.replace(/\s+Limited$/, "");
  const counterpartyShort = counterpartyName.replace(/\s+Limited$/, "");
  const structure = pick(
    transactionType === "acquisition"
      ? ACQUISITION_STRUCTURES
      : MERGER_STRUCTURES,
  );
  const valuation = randomInt(18, 160) + randomInt(0, 9) / 10;
  const revenue = randomInt(14, 88) + randomInt(0, 9) / 10;
  const revenueShare = randomInt(24, 47);
  const consentThreshold = randomInt(8, 20);
  const remainingBasket = Math.max(
    1,
    Number((consentThreshold - randomInt(2, 6)).toFixed(1)),
  );
  const boardLeadDays = randomInt(2, 5);
  const baseDate = addDays(new Date(Date.UTC(2026, 4, 11)), randomInt(0, 8));
  const boardDate = addDays(baseDate, boardLeadDays);
  const bidDate = addDays(baseDate, randomInt(3, 6));
  const managementDate = addDays(baseDate, 1);
  const confidentialLine = pick(CONFIDENTIALITY_LINES);
  const targetDomain = `${slugCompanyName(counterpartyShort)}.co.nz`;
  const matterName =
    transactionType === "acquisition"
      ? `${counterpartyShort} acquisition`
      : `${clientShort} / ${counterpartyShort} merger`;
  const subject =
    transactionType === "acquisition"
      ? `Confidential - proposed acquisition of ${counterpartyShort}`
      : `Confidential - proposed merger with ${counterpartyShort}`;
  const fileNumber = `DEMO-2026-${transactionType === "acquisition" ? "ACQ" : "MRG"}-${companyCode(counterpartyShort)}`;

  const transactionLabel =
    transactionType === "acquisition"
      ? `the proposed acquisition of ${counterpartyName}`
      : `the proposed merger with ${counterpartyName}`;
  const pricingLine =
    transactionType === "acquisition"
      ? `Indicative consideration is ${formatNzMoney(valuation)} for a ${structure}.`
      : `The current discussion is an all-in value of about ${formatNzMoney(valuation)} using a ${structure}.`;
  const structureIssue =
    transactionType === "acquisition"
      ? "We should stay open on whether a share deal or selected asset deal gives better protection on legacy liabilities and consent mechanics."
      : "We should confirm early whether the preferred merger structure triggers different consent, implementation or court-process timing issues.";
  const consentLine = `The ${partnerName} relationship represents about ${revenueShare}% of revenue, and the core agreement requires written consent before any change of control, assignment or amalgamation.`;
  const privacyLine =
    transactionType === "acquisition"
      ? `The systems supporting ${profile.product} handle sensitive operational and customer data, and the current privacy wording does not clearly explain sharing data in an acquisition context.`
      : `The systems supporting ${profile.product} handle sensitive operational and customer data, and the current privacy wording does not clearly explain sharing data for a merger or post-deal integration.`;
  const peopleLine =
    profile.product.includes("platform") || profile.product.includes("dashboard")
      ? `Two technical leads are central to ${profile.product}, and one long-form contractor agreement still needs a clean IP assignment check.`
      : `Management wants retention packages for the operations lead and sales lead, and we should confirm restraint and change-of-control arrangements before locking the deal structure.`;
  const propertyLine = `${capitalize(profile.propertyAsset)} appears operationally important and needs landlord consent for assignment or structural change; the fit-out approvals list in the teaser is also incomplete.`;
  const regulatoryLine = `The diligence notes also mention ${profile.regulatoryAngle}.`;
  const boardDeadline = `${formatLongDate(boardDate)} by 10:30 AM`;
  const bidDeadline = `${formatLongDate(bidDate)} at 5:00 PM`;
  const managementSession = `${formatLongDate(managementDate)} at 2:00 PM`;
  const bidInstruction =
    transactionType === "acquisition"
      ? "The seller wants a non-binding indication"
      : "The counterparty advisers want an initial non-binding indication";
  const financingLine =
    transactionType === "acquisition"
      ? `Under the facility agreement, any acquisition above ${formatNzMoney(consentThreshold)} needs lender consent unless it fits within the annual basket, and only ${formatNzMoney(remainingBasket)} remains.`
      : `Under the facility agreement, any merger or business combination above ${formatNzMoney(consentThreshold)} needs lender consent unless it fits within the annual basket, and only ${formatNzMoney(remainingBasket)} remains.`;

  const clientTo = [
    createDisplayAddress(lawyer, client.domain),
    createDisplayAddress(cfo, client.domain),
  ].join(", ");
  const clientCc = [
    createDisplayAddress(analyst, client.domain),
    createDisplayAddress(operationsLead, client.domain),
  ].join(", ");

  const emails: EmailThread["emails"] = [
    {
      id: "email-01",
      from: createDisplayAddress(sponsor, client.domain),
      to: clientTo,
      cc: clientCc,
      date: formatEmailDate(addHours(baseDate, 8, randomInt(5, 35))),
      subject,
      body: `Team,

We have been asked to provide an initial issues view on ${transactionLabel}. ${counterpartyName} is based in ${profile.location} and ${profile.description}.

${pricingLine}

The board wants a concise memo before we move any further on exclusivity. ${confidentialLine}

There is a management session pencilled in for ${managementSession}. Can Legal pull together the main diligence priorities, likely consent issues and anything that could slow ${SIGNING_LANGUAGE[transactionType]}?

Thanks,
${sponsor.name}`,
    },
    {
      id: "email-02",
      from: createDisplayAddress(analyst, client.domain),
      to: createDisplayAddress(sponsor, client.domain),
      cc: [
        createDisplayAddress(lawyer, client.domain),
        createDisplayAddress(cfo, client.domain),
      ].join(", "),
      date: formatEmailDate(addHours(baseDate, 9, randomInt(10, 50))),
      subject: `Re: ${subject}`,
      body: `Forwarding the banker teaser and my quick notes.

${counterpartyName} generated approximately ${formatNzMoney(revenue)} of revenue last year. The business ${profile.description} and its core offering is ${profile.product}, sold mainly to ${profile.customerBase}.

${consentLine}

${bidInstruction} by ${bidDeadline}. I will ask for the draft NDA and a cleaner contract list this afternoon.`,
    },
    {
      id: "email-03",
      from: createDisplayAddress(lawyer, client.domain),
      to: createDisplayAddress(sponsor, client.domain),
      cc: [
        createDisplayAddress(analyst, client.domain),
        createDisplayAddress(cfo, client.domain),
      ].join(", "),
      date: formatEmailDate(addHours(baseDate, 11, randomInt(0, 40))),
      subject: `Re: ${subject}`,
      body: `My first-pass issues list is below.

- ${structureIssue}
- ${consentLine}
- ${privacyLine}
- ${peopleLine}

Please also request any form customer terms, privacy notices, incident logs and the executed contract with ${partnerName} so we can test the consent position properly.`,
    },
    {
      id: "email-04",
      from: createDisplayAddress(cfo, client.domain),
      to: createDisplayAddress(sponsor, client.domain),
      cc: [
        createDisplayAddress(lawyer, client.domain),
        createDisplayAddress(analyst, client.domain),
      ].join(", "),
      date: formatEmailDate(addHours(baseDate, 14, randomInt(0, 30))),
      subject: `Re: ${subject}`,
      body: `Board timing is tight.

I need a near-final memo by ${boardDeadline} if we want this in the pack.

${financingLine}

Please keep the memo practical and explicit on what must be cleared before we sign anything or speak to lenders.`,
    },
    {
      id: "email-05",
      from: createDisplayAddress(operationsLead, client.domain),
      to: createDisplayAddress(lawyer, client.domain),
      cc: [
        createDisplayAddress(sponsor, client.domain),
        createDisplayAddress(techLead, client.domain),
      ].join(", "),
      date: formatEmailDate(addHours(addDays(baseDate, 1), 8, randomInt(20, 55))),
      subject: `Re: ${subject}`,
      body: `I had a quick look at the teaser appendix and the management notes.

${propertyLine}

${regulatoryLine}

Operationally this does not kill the deal, but I would want both points on the diligence request list and in the conditions tracker.`,
    },
    {
      id: "email-06",
      from: createDisplayAddress(techLead, client.domain),
      to: createDisplayAddress(lawyer, client.domain),
      cc: [
        createDisplayAddress(sponsor, client.domain),
        createDisplayAddress(operationsLead, client.domain),
      ].join(", "),
      date: formatEmailDate(addHours(addDays(baseDate, 1), 10, randomInt(5, 35))),
      subject: `Re: ${subject}`,
      body: `${privacyLine}

Separately, management said the key customer and ops data currently sits in a shared environment with two outsourced vendors. We should ask who hosts what, whether any offshore transfer terms apply, and whether integration can wait until after completion.

I also want confirmation that ${createDisplayAddress(
        {
          name: "Olivia Hart",
          title: "Chief Executive Officer",
        },
        targetDomain,
      ).replace(/ <.*$/, "")} and the wider management team are prepared to stay through the first integration phase.`,
    },
  ];

  return {
    transactionType,
    clientName: client.company,
    counterpartyName,
    subject,
    matterName,
    fileNumber,
    memoDate: formatIsoDate(boardDate),
    emails,
  };
}

export function createAcquisitionEmailThread(): EmailThread {
  const scenario = createScenario();
  const rawText = scenario.emails.map((email) => buildRawEmail(email)).join("\n\n");

  return {
    matterName: scenario.matterName,
    subject: scenario.subject,
    rawText,
    transactionType: scenario.transactionType,
    clientName: scenario.clientName,
    counterpartyName: scenario.counterpartyName,
    fileNumber: scenario.fileNumber,
    memoDate: scenario.memoDate,
    emails: scenario.emails,
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
