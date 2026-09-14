import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { SITE, HERO_IMAGE } from "../config/site";
import { prefersReducedMotion, useCountUp } from "../lib/motion";
import { bootComplete } from "../lib/boot";

gsap.registerPlugin(SplitText);

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useCountUp(value);
  return (
    <div>
      <div className="font-display text-3xl text-bone md:text-4xl">
        <span ref={ref}>0</span>
        {suffix}
      </div>
      <div className="eyebrow mt-1 !text-bone/50">{label}</div>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const image = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el.querySelectorAll(".hero-fade"), { opacity: 1, y: 0 });
      return;
    }

    let ctx: gsap.Context;

    const run = () => {
      ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Slow push-in on the photograph — the "Ken Burns" of the hero.
      tl.fromTo(image.current, { scale: 1.18 }, { scale: 1, duration: 2.4, ease: "power2.out" }, 0);

      if (headline.current) {
        const split = new SplitText(headline.current, {
          type: "lines,words",
          linesClass: "overflow-hidden",
        });
        tl.fromTo(
          split.words,
          { yPercent: 115 },
          { yPercent: 0, duration: 1.3, stagger: 0.055 },
          0.35,
        );
      }

      tl.fromTo(
        el.querySelectorAll(".hero-fade"),
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.11 },
        0.9,
      );
      }, el);
    };

    // Wait for the preloader to lift; it has already waited on the webfonts,
    // which SplitText needs in order to measure line breaks correctly.
    let cancelled = false;
    bootComplete.then(() => {
      if (!cancelled) run();
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  // Subtle parallax of the photo against pointer movement (desktop only).
  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 22;
      const y = (e.clientY / window.innerHeight - 0.5) * 14;
      gsap.to(image.current, { x: -x, y: -y, duration: 1.4, ease: "power3.out" });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section id="top" ref={root} className="relative overflow-hidden bg-ink">
      <div ref={image} className="absolute inset-[-3%] will-change-transform">
        <img
          src={HERO_IMAGE}
          alt="A warmly lit contemporary living room with oak joinery"
          className="h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/90" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-5 pt-28 pb-12 md:px-10 md:pt-32 md:pb-16">
        <p className="eyebrow hero-fade !text-bone/60 opacity-0">
          {SITE.motto} &nbsp;·&nbsp; {SITE.city}
        </p>

        <h1
          ref={headline}
          className="display mt-5 max-w-[16ch] text-[clamp(2.5rem,min(9vw,13svh),8rem)] text-bone"
        >
          Homes that feel <em className="text-clay not-italic">rooted</em>, not decorated
        </h1>

        <p className="hero-fade mt-6 max-w-[46ch] md:mt-8 text-[1.05rem] leading-relaxed text-bone/70 opacity-0">
          Full-home interiors, modular kitchens and wardrobes — designed in 3D, priced to the last
          handle, and handed over in {SITE.stats[2].value} days.
        </p>

        <div className="hero-fade mt-7 flex flex-wrap md:mt-10 items-center gap-4 opacity-0">
          <a
            href="/quote"
            className="group inline-flex items-center gap-3 rounded-full bg-bone px-8 py-4 text-sm font-medium text-ink transition-colors duration-300 hover:bg-clay hover:text-bone"
          >
            Get a free design consultation
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/work"
            className="rounded-full border border-bone/30 px-8 py-4 text-sm text-bone transition-colors duration-300 hover:border-bone hover:bg-bone/5"
          >
            See our work
          </a>
        </div>

        <div className="hero-fade mt-10 grid grid-cols-2 gap-6 border-t border-bone/15 pt-6 opacity-0 md:mt-14 md:grid-cols-4 md:gap-8 md:pt-8">
          {SITE.stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 right-5 hidden animate-bounce text-bone/40 md:right-10 md:block">
        <ArrowDown size={20} strokeWidth={1.5} />
      </div>
    </section>
  );
}
