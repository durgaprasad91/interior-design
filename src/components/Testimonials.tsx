import { TESTIMONIALS } from "../config/site";
import { useReveal } from "../lib/motion";

export default function Testimonials() {
  const ref = useReveal<HTMLElement>();
  // Duplicated once so the CSS marquee can loop seamlessly at -50%.
  const row = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section ref={ref} className="overflow-hidden bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="eyebrow reveal">10 / Clients</p>
        <h2 className="display reveal mt-5 max-w-[18ch] text-[clamp(2.25rem,5.5vw,4.5rem)]">
          What people say after they move in
        </h2>
      </div>

      <div className="marquee-mask mt-14 flex w-full overflow-hidden">
        <div className="animate-marquee flex shrink-0 gap-5 pr-5">
          {row.map((t, i) => (
            <figure
              key={i}
              className="flex w-[86vw] shrink-0 flex-col justify-between rounded-2xl border border-ink/10 bg-bone-dim p-8 sm:w-[420px]"
            >
              <blockquote className="font-display text-[1.35rem] leading-snug text-ink-soft">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-ink/10 pt-5">
                <div className="text-sm font-medium">{t.name}</div>
                <div className="eyebrow mt-1">{t.meta}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
