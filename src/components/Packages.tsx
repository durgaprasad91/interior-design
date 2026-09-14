import { Check } from "lucide-react";
import { PACKAGES } from "../config/site";
import { useReveal } from "../lib/motion";
import SectionHead from "./SectionHead";

export default function Packages() {
  const ref = useReveal<HTMLElement>({ stagger: 0.09 });

  return (
    <section id="packages" ref={ref} className="bg-bone-dim py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          n="05"
          label="Packages"
          title="Three ways to start"
          sub="Indicative for a 2BHK. Every project is quoted on its own drawings — these are the shapes most people choose between."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {PACKAGES.map((p) => (
            <div
              key={p.id}
              className={`reveal relative flex flex-col rounded-2xl p-8 md:p-9 ${
                p.featured
                  ? "bg-ink text-bone ring-2 ring-clay"
                  : "border border-ink/10 bg-bone"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-clay px-3 py-1 font-mono text-[0.6rem] tracking-widest text-bone uppercase">
                  Most chosen
                </span>
              )}

              <h3 className={`font-display text-3xl ${p.featured ? "text-bone" : "text-ink"}`}>
                {p.name}
              </h3>

              <div className="mt-5 flex items-baseline gap-2">
                <span className="font-display text-4xl text-clay">{p.price}</span>
                <span className={`text-sm ${p.featured ? "text-bone/50" : "text-muted"}`}>
                  {p.unit}
                </span>
              </div>

              <p
                className={`mt-4 text-[0.95rem] leading-relaxed ${
                  p.featured ? "text-bone/65" : "text-muted"
                }`}
              >
                {p.blurb}
              </p>

              <ul
                className={`mt-7 flex-1 space-y-3 border-t pt-7 text-[0.92rem] ${
                  p.featured ? "border-bone/15" : "border-ink/10"
                }`}
              >
                {p.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check
                      size={16}
                      strokeWidth={2}
                      className="mt-0.5 shrink-0 text-clay"
                    />
                    <span className={p.featured ? "text-bone/80" : "text-ink-soft"}>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/quote"
                className={`mt-8 rounded-full py-3.5 text-center text-sm font-medium transition-colors duration-300 ${
                  p.featured
                    ? "bg-clay text-bone hover:bg-clay-dark"
                    : "bg-ink text-bone hover:bg-clay"
                }`}
              >
                Get an exact quote
              </a>
            </div>
          ))}
        </div>

        <p className="reveal mt-8 text-center text-sm text-muted">
          Prices exclude civil work, plumbing relocation and loose furniture.
        </p>
      </div>
    </section>
  );
}
