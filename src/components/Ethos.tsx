import { SITE } from "../config/site";
import { useReveal } from "../lib/motion";

export default function Ethos() {
  const ref = useReveal<HTMLElement>({ stagger: 0.12 });

  return (
    <section ref={ref} className="bg-espresso py-24 text-center md:py-32">
      <div className="mx-auto max-w-[70ch] px-5 md:px-10">
        <p
          className="reveal font-deva text-[clamp(3rem,10vw,7rem)] leading-[1.35] text-brass"
          lang="sa"
        >
          स्थिर
        </p>

        <p className="eyebrow reveal mt-6 !text-bone/40">sthira · Sanskrit</p>

        <p className="display reveal mt-10 text-[clamp(1.6rem,3.6vw,2.6rem)] text-bone">
          {SITE.motto}
        </p>

        <p className="reveal mt-7 leading-relaxed text-bone/55">
          A home should hold still while the rest of life moves. We build the parts you lean on —
          the joinery, the storage, the light — to outlast the trends they arrived with.
        </p>

        <p className="reveal mt-10 font-display text-xl italic text-brass/90">{SITE.tagline}</p>
      </div>
    </section>
  );
}
