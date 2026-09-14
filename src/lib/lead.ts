import { SITE } from "../config/site";

export type Lead = {
  name: string;
  phone: string;
  city: string;
  property: string;
  scope: string;
  budget: string;
  timeline: string;
  notes: string;
};

export const EMPTY_LEAD: Lead = {
  name: "",
  phone: "",
  city: SITE.city,
  property: "",
  scope: "",
  budget: "",
  timeline: "",
  notes: "",
};

export const PROPERTY_OPTIONS = ["1BHK", "2BHK", "3BHK", "4BHK", "Villa", "Duplex", "Office"];
export const SCOPE_OPTIONS = [
  "Full home interiors",
  "Modular kitchen",
  "Wardrobes & storage",
  "Living & dining",
  "Bedroom",
  "False ceiling & lighting",
  "Renovation",
];
export const BUDGET_OPTIONS = [
  "Under ₹3L",
  "₹3L – ₹6L",
  "₹6L – ₹10L",
  "₹10L – ₹15L",
  "₹15L – ₹25L",
  "Above ₹25L",
  "Not sure yet",
];
export const TIMELINE_OPTIONS = [
  "Immediately",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "Just exploring",
];

/** WhatsApp uses *asterisks* for bold. Keep lines short — long ones wrap badly on phones. */
export function buildMessage(lead: Lead): string {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["City", lead.city],
    ["Property", lead.property],
    ["Looking for", lead.scope],
    ["Budget", lead.budget],
    ["Timeline", lead.timeline],
    ["Notes", lead.notes],
  ];
  const body = rows
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `*${k}:* ${v.trim()}`)
    .join("\n");

  return `Hi ${SITE.brandFull}, I'd like a free design consultation.\n\n${body}\n\n— sent from ${SITE.domain}`;
}

export function waLink(text: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Plain "start a chat" link used by the floating button and header CTA. */
export const WA_GENERIC = waLink(
  `Hi ${SITE.brandFull}, I'd like to know more about your interior design services.`,
);

export const TEL_LINK = `tel:${SITE.phone.replace(/[^\d+]/g, "")}`;

/**
 * Fire the email backup, then open WhatsApp.
 *
 * Order matters and is not stylistic:
 *   1. The POST is deliberately NOT awaited. If we await, the window.open that
 *      follows is no longer inside the user-gesture window and iOS Safari
 *      blocks it silently.
 *   2. Web3Forms must receive application/json. Sending form-urlencoded gets a
 *      301, which the browser surfaces as an opaque CORS failure.
 * The email is best-effort: if it fails, the WhatsApp handoff still happens.
 */
export function submitLead(lead: Lead): void {
  if (SITE.web3formsKey) {
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: SITE.web3formsKey,
        subject: `New enquiry — ${lead.name || "unnamed"} (${lead.scope || "general"})`,
        from_name: `${SITE.brandFull} website`,
        ...lead,
      }),
    }).catch(() => {
      /* best-effort only — never block the WhatsApp handoff */
    });
  } else if (import.meta.env?.DEV) {
    console.info("[lead] no web3formsKey set — email backup skipped:", lead);
  }

  window.open(waLink(buildMessage(lead)), "_blank", "noopener,noreferrer");
}
