import { MATERIALS } from "../config/site";
import { useReveal } from "../lib/motion";

export default function Materials() {
  const ref = useReveal<HTMLElement>({ stagger: 0.05 });

  return (
    <section ref={ref} className="border-y border-ink/10 bg-bone py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <p className="eyebrow reveal text-center">What we build with</p>
        <h2 className="display reveal mx-auto mt-4 max-w-[24ch] text-center text-[clamp(1.5rem,3vw,2.2rem)]">
          No unbranded hardware, ever
        </h2>

        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-4">
          {MATERIALS.map((m) => (
            <li key={m.name} className="reveal bg-bone px-5 py-7 text-center">
              <div className="font-display text-xl text-ink">{m.name}</div>
              <div className="eyebrow mt-1.5">{m.note}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
