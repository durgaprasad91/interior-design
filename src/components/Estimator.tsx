import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { ESTIMATOR, SITE } from "../config/site";
import { setPrefill } from "../lib/prefill";
import { useReveal } from "../lib/motion";
import SectionHead from "./SectionHead";

/** ₹8,50,000 → "₹8.5L"; ₹1,20,00,000 → "₹1.2Cr" — Indian reading, not 850K. */
function inr(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2).replace(/\.?0+$/, "")}Cr`;
  return `₹${(n / 100000).toFixed(1).replace(/\.0$/, "")}L`;
}

const chip = (on: boolean) =>
  `rounded-full border px-4 py-2 text-[0.82rem] transition-colors duration-200 ${
    on ? "border-clay bg-clay text-bone" : "border-bone/20 text-bone/70 hover:border-bone/50"
  }`;

export default function Estimator() {
  const ref = useReveal<HTMLElement>();
  const [property, setProperty] = useState(ESTIMATOR.properties[1].id);
  const [tier, setTier] = useState(ESTIMATOR.tiers[1].id);
  const [addons, setAddons] = useState<string[]>([]);

  const { low, high, chosen } = useMemo(() => {
    const p = ESTIMATOR.properties.find((x) => x.id === property)!;
    const t = ESTIMATOR.tiers.find((x) => x.id === tier)!;
    const extras = ESTIMATOR.addons.filter((a) => addons.includes(a.id));
    // Add-ons scale with the property too — a villa ceiling is not a 1BHK ceiling.
    const scale = p.base / ESTIMATOR.properties[1].base;
    const total = p.base * t.multiplier + extras.reduce((s, a) => s + a.price * scale, 0);
    return {
      low: Math.round((total * (1 - ESTIMATOR.spread)) / 1000) * 1000,
      high: Math.round((total * (1 + ESTIMATOR.spread)) / 1000) * 1000,
      chosen: { p, t, extras },
    };
  }, [property, tier, addons]);

  const toggle = (id: string) =>
    setAddons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  // Hand the configuration to the quote form rather than firing WhatsApp from
  // here — every enquiry goes through the form so it always carries a name and
  // a number.
  const carryToForm = () => {
    setPrefill({
      property: chosen.p.label,
      scope: `${chosen.t.label} package${
        chosen.extras.length ? ` + ${chosen.extras.map((a) => a.label).join(", ")}` : ""
      }`,
      budget: `${inr(low)} – ${inr(high)} (estimated)`,
      notes: "Estimated on the site calculator — please confirm with an exact quote.",
    });
  };

  return (
    <section id="estimate" ref={ref} className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          n="06"
          label="Estimator"
          title="What will yours cost?"
          sub="See your range in under a minute. Share your details only when you want the exact figure."
          light
        />

        <div className="reveal mt-14 grid gap-10 rounded-2xl border border-bone/10 p-6 md:p-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div className="space-y-9">
            <div>
              <span className="eyebrow mb-3 block !text-bone/40">Property</span>
              <div className="flex flex-wrap gap-2">
                {ESTIMATOR.properties.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setProperty(p.id)}
                    aria-pressed={property === p.id}
                    className={chip(property === p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow mb-3 block !text-bone/40">Package</span>
              <div className="flex flex-wrap gap-2">
                {ESTIMATOR.tiers.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTier(t.id)}
                    aria-pressed={tier === t.id}
                    className={chip(tier === t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow mb-3 block !text-bone/40">Add anything else</span>
              <div className="flex flex-wrap gap-2">
                {ESTIMATOR.addons.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => toggle(a.id)}
                    aria-pressed={addons.includes(a.id)}
                    className={chip(addons.includes(a.id))}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-bone p-8 text-center md:p-10">
            <span className="eyebrow">Estimated range</span>
            <div className="mt-4 font-display text-[clamp(2.2rem,5vw,3.4rem)] leading-none text-ink">
              {inr(low)}
              <span className="mx-2 text-muted">–</span>
              {inr(high)}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              For a {chosen.p.label} on the {chosen.t.label} package
              {chosen.extras.length > 0 && ` with ${chosen.extras.length} add-on${chosen.extras.length > 1 ? "s" : ""}`}
              . Materials and site conditions move this either way — the site visit fixes it exactly.
            </p>

            <a
              href="/quote"
              onClick={carryToForm}
              className="group mt-8 flex items-center justify-center gap-3 rounded-full bg-clay py-4 font-medium text-bone transition-colors duration-300 hover:bg-clay-dark"
            >
              Get an exact quote
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            <p className="mt-4 text-xs leading-relaxed text-muted">
              We'll carry these choices into the form for you.
            </p>
          </div>
        </div>

        <p className="reveal mt-6 text-center text-xs text-bone/30">
          Indicative only. {SITE.brandFull} quotes every project on its own drawings.
        </p>
      </div>
    </section>
  );
}
