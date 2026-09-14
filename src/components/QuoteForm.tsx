import { useEffect, useState } from "react";
import { MessageCircle, Phone, Check } from "lucide-react";
import { SITE } from "../config/site";
import {
  BUDGET_OPTIONS,
  EMPTY_LEAD,
  PROPERTY_OPTIONS,
  SCOPE_OPTIONS,
  TIMELINE_OPTIONS,
  TEL_LINK,
  submitLead,
  type Lead,
} from "../lib/lead";
import { useReveal } from "../lib/motion";
import { onPrefill, takePrefill } from "../lib/prefill";

const fieldCls =
  "w-full rounded-xl border border-ink/15 bg-bone px-4 py-3.5 text-[0.95rem] text-ink transition-colors placeholder:text-muted/60 focus:border-clay focus:outline-none";

function Chips({
  options,
  value,
  onChange,
  name,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`rounded-full border px-4 py-2 text-[0.82rem] transition-colors duration-200 ${
            value === o
              ? "border-clay bg-clay text-bone"
              : "border-ink/15 text-ink-soft hover:border-ink/40"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function QuoteForm() {
  const ref = useReveal<HTMLElement>();
  const [lead, setLead] = useState<Lead>(EMPTY_LEAD);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof Lead) => (v: string) => setLead((p) => ({ ...p, [k]: v }));

  // Pick up anything the estimator handed over — both on mount (if it ran
  // before this mounted) and live, since the page never reloads between them.
  useEffect(() => {
    const apply = (values: Partial<Lead>) => {
      setLead((p) => ({ ...p, ...values }));
      setSent(false);
    };
    const initial = takePrefill();
    if (initial) apply(initial);
    return onPrefill(apply);
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot: real users never fill a field they cannot see.
    if ((new FormData(e.currentTarget).get("company") as string)?.trim()) return;

    if (!lead.name.trim() || lead.phone.replace(/\D/g, "").length < 10) {
      setError("Please add your name and a 10-digit phone number.");
      return;
    }
    setError("");
    submitLead(lead);
    setSent(true);
  };

  return (
    <section id="quote" ref={ref} className="bg-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 md:px-10 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow reveal !text-bone/50">11 / Get started</p>
          <h2 className="display reveal mt-5 text-[clamp(2.25rem,5.5vw,4.5rem)] text-bone">
            Tell us about your home
          </h2>
          <p className="reveal mt-6 max-w-[44ch] leading-relaxed text-bone/60">
            Fill this in and it opens WhatsApp with everything already typed out — just hit send.
            We reply within a few hours, usually sooner.
          </p>

          <div className="reveal mt-10 space-y-4 border-t border-bone/15 pt-8">
            {[
              "Free consultation and 3D design",
              "Itemised quote, locked for the project",
              "No obligation, no pushy follow-ups",
            ].map((t) => (
              <div key={t} className="flex items-start gap-3 text-bone/70">
                <Check size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-clay" />
                <span className="text-[0.95rem]">{t}</span>
              </div>
            ))}
          </div>

          <a
            href={TEL_LINK}
            className="reveal mt-10 inline-flex items-center gap-3 text-bone/60 transition-colors hover:text-bone"
          >
            <Phone size={17} strokeWidth={1.6} />
            <span className="font-mono text-sm">{SITE.phone}</span>
          </a>
        </div>

        <div className="reveal rounded-2xl bg-bone p-6 md:p-10">
          {sent ? (
            <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-clay/15">
                <MessageCircle size={28} strokeWidth={1.5} className="text-clay" />
              </span>
              <h3 className="display mt-7 text-3xl">WhatsApp is open</h3>
              <p className="mt-3 max-w-[34ch] leading-relaxed text-muted">
                Your details are already typed out — press send in WhatsApp and we'll take it
                from there.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setLead(EMPTY_LEAD);
                }}
                className="mt-8 text-sm text-clay underline underline-offset-4"
              >
                Didn't open? Send again
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-7">
              {/* honeypot — hidden from people, irresistible to bots */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="eyebrow mb-2 block">
                    Your name *
                  </label>
                  <input
                    id="name"
                    required
                    value={lead.name}
                    onChange={(e) => set("name")(e.target.value)}
                    placeholder="Priya Sharma"
                    className={fieldCls}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="eyebrow mb-2 block">
                    Phone *
                  </label>
                  <input
                    id="phone"
                    required
                    type="tel"
                    inputMode="numeric"
                    value={lead.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    placeholder="98765 43210"
                    className={fieldCls}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="city" className="eyebrow mb-2 block">
                  City
                </label>
                <input
                  id="city"
                  value={lead.city}
                  onChange={(e) => set("city")(e.target.value)}
                  className={fieldCls}
                />
              </div>

              <div>
                <span className="eyebrow mb-3 block">Property type</span>
                <Chips
                  name="Property type"
                  options={PROPERTY_OPTIONS}
                  value={lead.property}
                  onChange={set("property")}
                />
              </div>

              <div>
                <span className="eyebrow mb-3 block">What do you need?</span>
                <Chips
                  name="Scope"
                  options={SCOPE_OPTIONS}
                  value={lead.scope}
                  onChange={set("scope")}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="budget" className="eyebrow mb-2 block">
                    Budget
                  </label>
                  <select
                    id="budget"
                    value={lead.budget}
                    onChange={(e) => set("budget")(e.target.value)}
                    className={fieldCls}
                  >
                    <option value="">Select</option>
                    {BUDGET_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="eyebrow mb-2 block">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    value={lead.timeline}
                    onChange={(e) => set("timeline")(e.target.value)}
                    className={fieldCls}
                  >
                    <option value="">Select</option>
                    {TIMELINE_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="eyebrow mb-2 block">
                  Anything else?
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={lead.notes}
                  onChange={(e) => set("notes")(e.target.value)}
                  placeholder="Possession in March, need the kitchen done first…"
                  className={`${fieldCls} resize-none`}
                />
              </div>

              {error && (
                <p role="alert" className="text-sm text-clay-dark">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 rounded-full bg-clay py-4 font-medium text-bone transition-colors duration-300 hover:bg-clay-dark"
              >
                <MessageCircle size={19} strokeWidth={1.8} />
                Send on WhatsApp
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>

              <p className="text-center text-xs leading-relaxed text-muted">
                Opens WhatsApp with your details pre-filled. We never share your number.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
