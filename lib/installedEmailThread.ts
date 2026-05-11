import type { EmailThread } from "./workflowTypes";

type ParsedEmail = EmailThread["emails"][number];

type InstalledThreadDefinition = {
  id: string;
  label: string;
  matterName: string;
  subject: string;
  clientName: string;
  counterpartyName: string;
  fileNumber: string;
  memoDate: string;
  raw: string;
};

export type InstalledEmailThreadOption = Pick<
  InstalledThreadDefinition,
  "id" | "label" | "matterName"
>;

const INSTALLED_THREAD_DEFINITIONS: InstalledThreadDefinition[] = [
  {
    id: "north-shore-events",
    label: "North Shore Events / Harbour Venues",
    matterName: "North Shore Events / Harbour Venues invoice query",
    subject: "North Shore Events / Harbour Venues",
    clientName: "North Shore Events",
    counterpartyName: "Harbour Venues",
    fileNumber: "DEMO-2026-NSE-HV",
    memoDate: "2026-04-14",
    raw: `From: Rachel Kim <rachel.kim@northshoreevents.co.nz>
To: Daniel Price <daniel.price@harbourvenues.co.nz>
Date: Tuesday, 14 April 2026 at 8:42 AM
Subject: Re: Saturday booking

Hi Daniel,

I’ve just seen the revised invoice come through and I’m a bit confused.

When we spoke last month, I thought the extra security staff were included because your team said the upstairs bar would need to stay open if we had more than 120 guests. We ended up with 138, so I understand why the additional people were needed, but I don’t remember anyone saying that would be a separate $2,700 charge.

Can you send through whatever record you have of us approving that?

Rachel

---

From: Daniel Price <daniel.price@harbourvenues.co.nz>
To: Rachel Kim <rachel.kim@northshoreevents.co.nz>
Date: Tuesday, 14 April 2026 at 9:11 AM
Subject: Re: Saturday booking

Hi Rachel,

Thanks — I’ll check with our operations team.

My understanding is that the quote covered the main room, standard bar staff, and two security staff. Once the upstairs bar was added, that triggered an additional security requirement under our venue policy.

I think this was discussed on the call with Marcus around 26 March, but I’ll need to dig out the notes.

Daniel

---

From: Marcus Lee <marcus.lee@northshoreevents.co.nz>
To: Rachel Kim <rachel.kim@northshoreevents.co.nz>
Date: Tuesday, 14 April 2026 at 9:28 AM
Subject: Re: Saturday booking

Rachel,

I did speak to Daniel about the upstairs bar but I definitely didn’t approve another $2.7k.

From memory he said something like “we’ll just need to make sure the upstairs is covered as well”. I took that to mean they were sorting staffing internally, not adding a new line item.

Also, not sure if it matters, but the upstairs bar was their suggestion because the downstairs one apparently couldn’t handle the numbers.

Marcus

---

From: Rachel Kim <rachel.kim@northshoreevents.co.nz>
To: Amelia Foster <amelia.foster@lawbridge.co.nz>
Date: Tuesday, 14 April 2026 at 9:46 AM
Subject: Harbour Venues invoice

Hi Amelia,

Could you please have a quick look at the chain below?

It’s not a huge amount, but we’re trying to work out whether Harbour Venues can charge us extra for security after the event when nobody clearly approved the cost beforehand.

The event was last Saturday. Their revised invoice came through yesterday afternoon. We need to respond by tomorrow because accounts is trying to close this off before the end of the week.

I haven’t attached the original booking terms because I’m still trying to find the final signed version. I have an earlier draft if useful, but I’m not sure it’s the one we actually signed.

Thanks,
Rachel

---

From: Amelia Foster <amelia.foster@lawbridge.co.nz>
To: Junior Lawyer <junior@lawbridge.co.nz>
Date: Tuesday, 14 April 2026 at 10:03 AM
Subject: North Shore Events / Harbour Venues

Can you please turn this into a short file note for me?

Main things I need are:

what seems to have happened, what documents are missing, and whether there’s a sensible basis to push back on the additional security charge.

Don’t overcook it. Just enough for me to reply to Rachel later today.

A

---

From: Daniel Price <daniel.price@harbourvenues.co.nz>
To: Rachel Kim <rachel.kim@northshoreevents.co.nz>
Date: Tuesday, 14 April 2026 at 10:37 AM
Subject: Re: Saturday booking

Hi Rachel,

I found the event notes.

There is a note from 27 March saying:

“Client expects 130–140 guests. Upstairs bar likely required. Additional security to be rostered if upstairs open.”

I accept that this doesn’t show a written approval of the amount. But the extra staff were rostered because the upstairs space was used, and that was not part of the original booking.

The venue hire terms say additional staffing may be charged where the final event requirements differ from the confirmed run sheet. I’ve attached the version we have on file.

Daniel

Attachment: Harbour_Venues_Terms_2026.pdf

---

From: Rachel Kim <rachel.kim@northshoreevents.co.nz>
To: Amelia Foster <amelia.foster@lawbridge.co.nz>
Date: Tuesday, 14 April 2026 at 10:55 AM
Subject: Fwd: Saturday booking

Amelia,

See Daniel’s latest below.

Slight wrinkle — I’ve now found the signed booking form, and it does say estimated guests were “up to 125”. That said, we told them a week before the event that numbers were looking closer to 140, and nobody mentioned a price change then.

I’ll send the signed form separately once I get it out of DocuSign.

Rachel`,
  },
  {
    id: "fern-and-fig",
    label: "Fern & Fig / Urban Lane",
    matterName: "Fern & Fig / Urban Lane drainage and access issue",
    subject: "Fern & Fig / Urban Lane",
    clientName: "Fern & Fig",
    counterpartyName: "Urban Lane Property",
    fileNumber: "DEMO-2026-FF-UL",
    memoDate: "2026-04-22",
    raw: `# Messy Email Thread 01 — Café Lease / Grease Trap / Access Works

From: Priya Menon <priya@fernandfig.co.nz>
To: Noah Blake <noah.blake@urbanlaneproperty.co.nz>
Date: Wednesday, 22 April 2026 at 7:38 AM
Subject: Re: plumbers again

Morning Noah,

The plumbers were back in the courtyard before 7 this morning and had the side gate propped open with the bins blocking half the lane. We had two suppliers trying to get in at the same time, so it was a bit of a circus.

I know the grease trap needs work, but this is the third time this month we’ve had disruption during our breakfast rush. Nobody told us they were coming today. The lease says we have to allow reasonable access, but surely that doesn’t mean random visits whenever the landlord’s contractor feels like it.

Also, the invoice your office sent yesterday has a line for “urgent drainage compliance works” at $6,850. I’m not clear why that’s being passed on to us. We already pay outgoings and we clean the trap every fortnight like we’re supposed to.

Priya

P.S. unrelated but the hallway light outside the bathrooms is still flickering. Customers keep thinking we are closed back there.

---

From: Noah Blake <noah.blake@urbanlaneproperty.co.nz>
To: Priya Menon <priya@fernandfig.co.nz>
Date: Wednesday, 22 April 2026 at 8:16 AM
Subject: Re: plumbers again

Hi Priya,

Sorry about the timing this morning. I didn’t realise they were starting that early.

The works relate to the council inspection from late March. The inspector said the external line was backing up because of food waste from the café tenancy. That is why the cost has been allocated to Fern & Fig rather than treated as a general building expense.

I’ll check the access notice issue. I thought Mei had sent something last Friday, but it may have gone to the old Gmail address.

Noah

---

From: Mei Zhang <mei.zhang@urbanlaneproperty.co.nz>
To: Noah Blake <noah.blake@urbanlaneproperty.co.nz>
Date: Wednesday, 22 April 2026 at 8:42 AM
Subject: Fern & Fig

Noah,

I sent the notice to info@fernfigcafe.nz on Friday afternoon. That’s the one in the tenant portal. It bounced once, then seemed to go through when I resent it.

It only said “contractor attendance next week” though. I don’t think I put the date or time because DrainCo had not confirmed. I attached the council note and the contractor estimate.

The council note says “likely contribution from food premises” but does not say Fern & Fig caused it. There are two other shops using that external line, including the bakery. Not sure if that matters.

Mei

---

From: Priya Menon <priya@fernandfig.co.nz>
To: Olivia Hart <olivia.hart@harbourlegal.co.nz>
Date: Wednesday, 22 April 2026 at 9:03 AM
Subject: Can you look at this? Landlord / drainage invoice

Hi Olivia,

Sorry for the messy chain below.

Our landlord is trying to make us pay nearly $7k for drainage works after the council inspection. They’re saying it’s because of the café, but we haven’t seen anything actually proving that. We’re not trying to avoid our obligations — we clean the grease trap and keep records — but this feels like a building issue being dumped on us.

Can you please tell me whether we have to pay this and whether they can keep sending plumbers through during service?

I’m meant to reply before close of business because Noah said accounts wants this sorted before month-end. I’m in the café most of the day and the Wi-Fi has been shocking since the EFTPOS guy moved the router, so call if urgent.

Thanks,
Priya

Attachment mentioned but not attached here: Council_Drainage_Note_March.pdf

---

From: Olivia Hart <olivia.hart@harbourlegal.co.nz>
To: Junior Lawyer <junior@harbourlegal.co.nz>
Date: Wednesday, 22 April 2026 at 9:22 AM
Subject: Fern & Fig / Urban Lane

Could you please turn the below into a short note for me?

Useful to have:
- what actually seems to be agreed vs just asserted
- whether the landlord has a basis to pass on the drainage cost
- what we need from Priya before giving a firm view
- whether there’s anything to say about access/disruption

Don’t spend ages. I mostly need a clean factual summary and the obvious issues flagged.

O

---

From: Priya Menon <priya@fernandfig.co.nz>
To: Olivia Hart <olivia.hart@harbourlegal.co.nz>
Date: Wednesday, 22 April 2026 at 10:11 AM
Subject: Re: Can you look at this? Landlord / drainage invoice

One more thing — I found the cleaning records. We had the trap serviced on 3 March, 18 March, 1 April and 15 April.

The plumber this morning made some comment to our barista that the blockage was “probably years of build-up”, which is annoying because we only took over the tenancy in November. I know that’s not exactly evidence, but thought I’d mention it.

Also the bakery next door uses the same back lane drain. They had a big leak last summer, not sure if connected.

Priya

---

From: Noah Blake <noah.blake@urbanlaneproperty.co.nz>
To: Priya Menon <priya@fernandfig.co.nz>
Date: Wednesday, 22 April 2026 at 11:04 AM
Subject: Re: plumbers again

Priya,

I’ve spoken to Mei. The contractor access should have been confirmed with a specific time. Apologies for that.

On the invoice, the lease requires the tenant to reimburse costs caused by blockages from the tenant’s use of the premises. We are not saying you intentionally caused anything, just that the works were necessary because of café waste entering the line.

Happy to discuss a payment plan if that helps. But the landlord’s position is that this is recoverable from Fern & Fig.

Noah`,
  },
  {
    id: "silver-fern-productions",
    label: "Silver Fern / PeakFrame",
    matterName: "Silver Fern Productions / PeakFrame lens deposit dispute",
    subject: "Silver Fern Productions / PeakFrame",
    clientName: "Silver Fern Productions",
    counterpartyName: "PeakFrame Hire",
    fileNumber: "DEMO-2026-SF-PF",
    memoDate: "2026-05-01",
    raw: `# Messy Email Thread 02 — Film Equipment Hire / Damaged Lens / Deposit

From: Elise Morgan <elise@silverfernproductions.co.nz>
To: Toby Finch <toby@peakframehire.co.nz>
Date: Thursday, 30 April 2026 at 6:58 PM
Subject: lens deposit

Hi Toby,

I’ve just seen the deposit refund is short by $3,200.

Can you explain what’s going on? The kit was returned on Monday morning and your guy checked it in while Josh was there. Nobody said anything was cracked or damaged at the time.

If this is about the 50mm lens, it was already a bit stiff when we collected it. I remember Josh mentioning it because he was worried it would slow us down on the vineyard shoot. We used it for about 20 minutes total and then swapped to the zoom because the director kept changing the blocking.

Elise

---

From: Toby Finch <toby@peakframehire.co.nz>
To: Elise Morgan <elise@silverfernproductions.co.nz>
Date: Friday, 1 May 2026 at 8:12 AM
Subject: Re: lens deposit

Hi Elise,

The shortfall is for the Zeiss 50mm repair assessment.

When our technician inspected the kit properly on Tuesday, the focus ring was grinding and the internal mount had taken a knock. It wasn’t picked up at counter return because the warehouse was slammed and the check-in was only visual.

The hire terms allow us to deduct repair costs from the deposit where gear comes back damaged. I’ve attached the tech note and the repair estimate.

Toby

Attachment: PeakFrame_Tech_Note_50mm.pdf

---

From: Josh Vale <josh@silverfernproductions.co.nz>
To: Elise Morgan <elise@silverfernproductions.co.nz>
Date: Friday, 1 May 2026 at 8:39 AM
Subject: Re: lens deposit

Elise,

Yeah I definitely told them the 50 felt rough when we picked it up. It was the younger guy at the counter, dark hair, maybe Sam? He said something like “they’re all a bit like that after doco season” and told me to note it on the app if I was worried.

I didn’t note it because we were already late getting out to Matakana and the call sheet changed again. My bad.

Also the lens never got dropped. We had it in the hard case basically the whole time. The only messy bit was when the ute got stuck near the lower vines, but the cases were inside the house by then. Ruby spilled coffee on the floor, not on the gear, before anyone asks.

Josh

---

From: Elise Morgan <elise@silverfernproductions.co.nz>
To: Anna Li <anna.li@pukekolegal.co.nz>
Date: Friday, 1 May 2026 at 9:07 AM
Subject: PeakFrame holding deposit

Hi Anna,

Could you look at the below?

PeakFrame hired us camera gear for a two-day shoot and they’re now holding back $3,200 from the deposit for a damaged lens. We say it was already stiff when collected, and their counter check on return didn’t raise anything. They say the proper inspection was the next day and the terms let them deduct repair costs.

I don’t want to start a war because we use them often, but $3.2k is not nothing and the producer is grumpy.

We need to decide by Monday whether to dispute it formally or just take the hit. There’s a 5pm invoice/payment run then.

Thanks,
Elise

---

From: Anna Li <anna.li@pukekolegal.co.nz>
To: Junior Lawyer <junior@pukekolegal.co.nz>
Date: Friday, 1 May 2026 at 9:33 AM
Subject: Silver Fern / PeakFrame

Can you please read this chain and prepare a short factual/legal issues note?

Focus on the deposit deduction. I’m interested in whether PeakFrame can rely on a later inspection, what evidence we have that the lens was already faulty, and what documents we’re missing.

Keep it practical — relationship matters here, so include any commercial points that jump out.

Anna

---

From: Toby Finch <toby@peakframehire.co.nz>
To: Elise Morgan <elise@silverfernproductions.co.nz>
Date: Friday, 1 May 2026 at 10:21 AM
Subject: Re: lens deposit

Elise,

To be fair, the return check is not a full technical inspection. The hire agreement says all equipment is subject to inspection after return and that damage discovered within 48 hours can be charged to the hirer.

We’re not suggesting anyone deliberately hid anything. But the lens was signed out in working condition and came back needing repair.

If Josh raised stiffness at collection, I need to see where that was recorded. I can’t find a note in the booking file.

Toby

---

From: Elise Morgan <elise@silverfernproductions.co.nz>
To: Anna Li <anna.li@pukekolegal.co.nz>
Date: Friday, 1 May 2026 at 10:49 AM
Subject: Fwd: PeakFrame holding deposit

Anna,

Forwarding Toby’s latest.

I’ve asked Josh to find the pickup photos. There may be a shot of the app screen from the van, but knowing Josh it’ll mostly be pictures of fog and the catering table.

I also found the booking confirmation. It says “standard terms apply” with a link, but I can’t see the terms attached as a PDF. Not sure whether the link has changed since we booked.

Elise

---

From: Josh Vale <josh@silverfernproductions.co.nz>
To: Elise Morgan <elise@silverfernproductions.co.nz>
Date: Friday, 1 May 2026 at 11:18 AM
Subject: Re: lens deposit

Found one photo. It shows the case and the lens on the prep bench but not the focus ring obviously. Useless.

I did message Ruby at 7:14am that day saying “50 is sticky, use zoom if it plays up”. I can screenshot that if helpful.

Also, I remember PeakFrame didn’t have us sign the usual paper checklist because their printer was dead. We just tapped something on the tablet.

Josh`,
  },
  {
    id: "aroha-athletics",
    label: "Aroha Athletics / Sponsor Rights",
    matterName: "Aroha Athletics sponsorship logo and exclusivity issue",
    subject: "Aroha Athletics / sponsor issue",
    clientName: "Aroha Athletics",
    counterpartyName: "Kowhai Hydration",
    fileNumber: "DEMO-2026-AA-SP",
    memoDate: "2026-05-05",
    raw: `# Messy Email Thread 03 — Sponsorship / Logo Use / Category Exclusivity

From: Marama Tui <marama@arohaathletics.org.nz>
To: Callum Reed <callum@riverbankbrewing.co.nz>
Date: Monday, 4 May 2026 at 3:14 PM
Subject: quick one - posters

Hi Callum,

We’ve had a slightly awkward message from Kōwhai Hydration about the winter series posters.

They’re saying Riverbank’s logo shouldn’t be on the same poster because they have “exclusive beverage partner” rights. I don’t want to overstate it — they were friendly enough — but they’ve asked us to take the posters down until it’s sorted.

My understanding was Riverbank sponsored the after-match function only, not the actual race series. The poster has all sponsors on the bottom because the designer used last year’s template and honestly I didn’t even think about the categories.

Do you have the Riverbank sponsorship letter handy?

Marama

---

From: Callum Reed <callum@riverbankbrewing.co.nz>
To: Marama Tui <marama@arohaathletics.org.nz>
Date: Monday, 4 May 2026 at 3:37 PM
Subject: Re: quick one - posters

Hey Marama,

We don’t want drama with Kōwhai. We just want the logo where it was promised.

From what I remember, the agreement said Riverbank would be shown as “community hospitality sponsor” and get logo placement on event promo material. It wasn’t limited to the function flyer.

That said, we’re obviously a brewery, not a sports drink. I wouldn’t have thought we were in the same category as Kōwhai unless their agreement says all drinks full stop.

I’ll try find the signed version. Might be in Sophie’s emails from when she was still here.

Callum

---

From: Marama Tui <marama@arohaathletics.org.nz>
To: Sophie Lane <sophie.lane.personal@gmail.com>
Date: Monday, 4 May 2026 at 4:02 PM
Subject: sorry to bother - sponsor docs?

Hi Sophie,

Hope Bali is treating you well and sorry to drag you back into club admin.

Do you by any chance still have the Riverbank sponsorship letter from Feb? We have the Kōwhai one in Drive but I can only find a draft Riverbank letter with tracked changes.

Kōwhai is saying their category is exclusive and Riverbank is asking why their logo is being removed from posters. Classic Monday.

No rush if you’re underwater, but if you have the final PDF that would save me a lot of digging.

M

---

From: Sophie Lane <sophie.lane.personal@gmail.com>
To: Marama Tui <marama@arohaathletics.org.nz>
Date: Monday, 4 May 2026 at 6:21 PM
Subject: Re: sorry to bother - sponsor docs?

M,

I found a PDF in my old downloads but I’m not 100% sure it’s the final final. It says Riverbank gets “logo placement on winter series promotional material where major sponsors are displayed”. It also calls them “hospitality sponsor”.

The Kōwhai agreement definitely had exclusivity but I think it was “non-alcoholic hydration partner” or something like that. I remember we changed it because Tom made a joke about beer being hydration and nobody laughed.

Also I vaguely remember telling Callum that Riverbank wouldn’t be on race bibs because that felt weird for a kids’ 5k. But posters/socials were fine.

Sending what I have now.

Soph

Attachment: Riverbank_Aroha_Sponsorship_Letter_maybe_final.pdf

---

From: Marama Tui <marama@arohaathletics.org.nz>
To: Ben Clarke <ben.clarke@matukulegal.co.nz>
Date: Tuesday, 5 May 2026 at 8:18 AM
Subject: Sponsor issue - logo on posters

Kia ora Ben,

Could you take a quick look at this?

Our athletics club has a sponsor clash. Kōwhai Hydration says they have exclusive beverage rights and wants us to remove Riverbank Brewing’s logo from the winter series posters. Riverbank says their letter gives them logo placement on event promo material.

The posters are already printed and some are up around town. Online is easy to change, but reprinting physical posters would be annoying and probably about $900. The first race is next Sunday, so we need to sort this quickly without annoying either sponsor too much.

I’ll send the sponsor letters separately. For now the chain below gives the basic mess.

Thanks,
Marama

---

From: Ben Clarke <ben.clarke@matukulegal.co.nz>
To: Junior Lawyer <junior@matukulegal.co.nz>
Date: Tuesday, 5 May 2026 at 8:41 AM
Subject: Aroha Athletics sponsor issue

Could you please do a short note on this?

I need:
- a chronology
- what each sponsor appears to be saying
- the documents we need to check
- likely interpretation issues
- practical options, including a commercial compromise if obvious

Don’t assume Riverbank and Kōwhai are actually in the same category. That seems to be the key question.

Ben

---

From: Talia Morgan <talia@kowhaihydration.co.nz>
To: Marama Tui <marama@arohaathletics.org.nz>
Date: Tuesday, 5 May 2026 at 9:13 AM
Subject: Winter series sponsor posters

Hi Marama,

Thanks for taking this seriously.

Our concern is not Riverbank supporting the club generally. The issue is that the winter series poster has Riverbank’s logo beside Kōwhai’s under “event partners”. We negotiated exclusivity for the beverage/hydration category because the series is a key community activation for us.

We don’t want to create unnecessary cost for the club, but we do need the online materials corrected and would like no further posters distributed with Riverbank included in that way.

Happy to discuss a wording fix if Riverbank needs to be acknowledged for the after-match function.

Talia

---

From: Callum Reed <callum@riverbankbrewing.co.nz>
To: Marama Tui <marama@arohaathletics.org.nz>
Date: Tuesday, 5 May 2026 at 9:46 AM
Subject: Re: quick one - posters

Marama,

Just found the email from Sophie on 12 Feb. It says:

“Riverbank will be included on winter series promotional material alongside other community sponsors.”

So I don’t think removing us entirely is right.

That said, if the issue is the heading “event partners”, maybe change us to “post-race hospitality supporter” or something like that online. I don’t love the idea of new posters going out without us though.

Also please don’t use the old logo from 2022. The designer somehow used the one with the tiny hop leaf. We changed it for a reason.

Callum

---

From: Marama Tui <marama@arohaathletics.org.nz>
To: Ben Clarke <ben.clarke@matukulegal.co.nz>
Date: Tuesday, 5 May 2026 at 10:05 AM
Subject: Fwd: Sponsor issue - logo on posters

Ben,

More below.

I’ve now found Kōwhai’s signed agreement. It says “exclusive non-alcoholic beverage and hydration partner for the 2026 winter series”. It also says we must not grant “substantially similar promotional rights” to another sponsor in that category.

Still looking for Riverbank’s final signed letter, but Sophie’s maybe-final copy says they get logo placement where major sponsors are displayed. Nothing obvious about exclusivity.

Marama`,
  },
];

export const DEFAULT_INSTALLED_EMAIL_THREAD_ID =
  INSTALLED_THREAD_DEFINITIONS[0]?.id ?? "";

function parseSingleEmail(rawEmail: string, index: number): ParsedEmail {
  const lines = rawEmail.split("\n");
  const headers: Record<string, string> = {};
  let bodyStart = lines.length;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];

    if (!line.trim()) {
      bodyStart = i + 1;
      break;
    }

    const match = /^(From|To|Cc|Date|Subject):\s*(.*)$/i.exec(line);
    if (match) {
      headers[match[1].toLowerCase()] = match[2].trim();
    }
  }

  return {
    id: `email-${String(index + 1).padStart(2, "0")}`,
    from: headers.from ?? "",
    to: headers.to ?? "",
    ...(headers.cc ? { cc: headers.cc } : {}),
    ...(headers.date ? { date: headers.date } : {}),
    ...(headers.subject ? { subject: headers.subject } : {}),
    body: lines.slice(bodyStart).join("\n").trim(),
  };
}

function normaliseInstalledThreadRaw(raw: string) {
  return raw.replace(/^# .*\n\n/, "").trim();
}

export function getInstalledEmailThreadOptions(): InstalledEmailThreadOption[] {
  return INSTALLED_THREAD_DEFINITIONS.map(({ id, label, matterName }) => ({
    id,
    label,
    matterName,
  }));
}

export function createInstalledEmailThread(
  threadId = DEFAULT_INSTALLED_EMAIL_THREAD_ID,
): EmailThread {
  const threadDefinition =
    INSTALLED_THREAD_DEFINITIONS.find((definition) => definition.id === threadId) ??
    INSTALLED_THREAD_DEFINITIONS[0];

  const normalisedRaw = normaliseInstalledThreadRaw(threadDefinition.raw);
  const blocks = normalisedRaw.split(/\n---\n/g).map((block) => block.trim());
  const emails = blocks.map((block, index) => parseSingleEmail(block, index));

  return {
    matterName: threadDefinition.matterName,
    subject: threadDefinition.subject,
    rawText: blocks.join("\n\n"),
    matterCategory: "general",
    clientName: threadDefinition.clientName,
    counterpartyName: threadDefinition.counterpartyName,
    fileNumber: threadDefinition.fileNumber,
    memoDate: threadDefinition.memoDate,
    emails,
  };
}
