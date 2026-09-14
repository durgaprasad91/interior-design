import { SERVICES } from "../config/site";
import { useReveal } from "../lib/motion";
import SectionHead from "./SectionHead";

export default function Services() {
  const ref = useReveal<HTMLElement>({ stagger: 0.07 });

  return (
    <section id="services" ref={ref} className="bg-bone py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead
          n="01"
          label="Services"
          title="Everything under one roof"
          sub="One team, one contract, one point of contact — from the first sketch to the day you move the sofa in."
        />

        <div className="mt-16 grid auto-rows-[240px] grid-cols-1 gap-4 md:grid-cols-4">
          {SERVICES.map((s) => (
            <a
              key={s.id}
              href="/quote"
              className={`group relative overflow-hidden rounded-2xl bg-ink reveal ${s.span}`}
            >
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink from-10% via-ink/75 via-38% to-transparent to-70%" />

              <div className="relative flex h-full flex-col justify-end p-6">
                <span className="eyebrow !text-clay">{s.price}</span>
                <h3 className="font-display mt-2 text-2xl text-bone md:text-[1.75rem]">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-bone/0 transition-colors duration-500 group-hover:text-bone/70">
                  {s.blurb}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
