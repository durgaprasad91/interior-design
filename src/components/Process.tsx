import { PROCESS } from "../config/site";
import { useReveal } from "../lib/motion";
import SectionHead from "./SectionHead";

export default function Process() {
  const ref = useReveal<HTMLElement>({ stagger: 0.1 });

  return (
    <section id="process" ref={ref} className="bg-bone py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          n="07"
          label="How it works"
          title="Five steps, no surprises"
          sub="You will know the price, the drawings and the handover date before any work begins."
        />

        <ol className="mt-16 border-t border-ink/10">
          {PROCESS.map((step) => (
            <li
              key={step.n}
              className="reveal group grid grid-cols-1 gap-3 border-b border-ink/10 py-8 transition-colors duration-500 hover:bg-bone-dim md:grid-cols-12 md:gap-8 md:py-10"
            >
              <span className="eyebrow md:col-span-2 md:pt-2">{step.n}</span>
              <h3 className="font-display text-3xl md:col-span-4 md:text-[2.1rem]">
                {step.title}
              </h3>
              <p className="max-w-[52ch] leading-relaxed text-muted md:col-span-6 md:pt-2">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
