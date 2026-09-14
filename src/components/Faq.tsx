import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "../config/site";
import { WA_GENERIC } from "../lib/lead";
import { useReveal } from "../lib/motion";
import SectionHead from "./SectionHead";

export default function Faq() {
  const ref = useReveal<HTMLElement>({ stagger: 0.05 });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="bg-bone py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 md:px-10 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
        <div>
          <SectionHead n="09" label="Questions" title="The things people actually ask" />
          <a
            href={WA_GENERIC}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal mt-8 inline-block rounded-full border border-ink/20 px-6 py-3 text-sm transition-colors hover:border-ink hover:bg-ink hover:text-bone"
          >
            Ask us something else
          </a>
        </div>

        <ul className="border-t border-ink/10">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="reveal border-b border-ink/10">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-xl md:text-[1.4rem]">{f.q}</span>
                    <Plus
                      size={20}
                      strokeWidth={1.5}
                      className={`mt-1 shrink-0 text-clay transition-transform duration-400 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                </h3>
                {/* Grid-rows trick animates to the content's natural height,
                    which max-height cannot do without a magic number. */}
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pr-10 pb-7 leading-relaxed text-muted">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
