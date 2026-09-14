import { useEffect, useRef, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { PROJECTS, type Project } from "../config/site";
import { gsap, useReveal } from "../lib/motion";
import SectionHead from "./SectionHead";

function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-5 top-5 text-bone/60 transition-colors hover:text-bone"
      >
        <X size={28} strokeWidth={1.5} />
      </button>

      <div
        className="grid max-h-[88vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-bone md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={project.image}
          alt={project.title}
          className="h-64 w-full object-cover md:h-full"
        />
        <div className="p-8 md:p-10">
          <p className="eyebrow">{project.meta}</p>
          <h3 className="display mt-3 text-4xl">{project.title}</h3>
          <p className="mt-5 leading-relaxed text-ink-soft">{project.description}</p>

          <dl className="mt-8 space-y-3 border-t border-ink/10 pt-6 text-sm">
            {[
              ["Location", project.location],
              ["Scope", project.scope],
              ["Duration", project.duration],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-4">
                <dt className="eyebrow w-24 shrink-0 pt-0.5">{k}</dt>
                <dd className="text-ink-soft">{v}</dd>
              </div>
            ))}
          </dl>

          <a
            href="/quote"
            onClick={onClose}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-bone transition-colors hover:bg-clay"
          >
            Get a quote like this <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  // Separate ref: `section` is owned by the pin trigger, so the heading reveal
  // hangs off the inner wrapper instead.
  const head = useReveal<HTMLDivElement>();
  const [active, setActive] = useState<Project | null>(null);
  // Pinning only makes sense when the whole section fits on screen. On a short
  // window it would hold a too-tall section still and hide its lower half, so
  // there we fall back to a plain swipeable track.
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const sec = section.current;
    const el = track.current;
    if (!sec || !el) return;

    // Pinned horizontal scroll is a desktop affordance. On touch, the track
    // stays a normal swipeable overflow list — pinning fights native momentum.
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      if (sec.scrollHeight > window.innerHeight + 8) {
        setPinned(false);
        return;
      }
      setPinned(true);

      const distance = () => el.scrollWidth - window.innerWidth + 80;

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        setPinned(false);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <section id="work" ref={section} className="bg-ink py-24 lg:py-0">
        <div className="lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:py-16">
          <div ref={head} className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
            <SectionHead
              n="02"
              label="Selected work"
              title="Six-hundred-odd homes. Here are six."
              light
            />
          </div>

          <div
            className={`mt-10 lg:mt-12 ${
              pinned ? "overflow-hidden" : "overflow-x-auto [scrollbar-width:none]"
            }`}
          >
            <div
              ref={track}
              className="flex w-max gap-5 px-5 will-change-transform md:px-10"
            >
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActive(p)}
                  className="group relative h-[clamp(280px,50vh,520px)] w-[78vw] shrink-0 overflow-hidden rounded-2xl text-left md:w-[46vw] lg:w-[34vw]"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading={i < 2 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink from-10% via-ink/75 via-38% to-transparent to-70%" />
                  <div className="absolute inset-x-0 bottom-0 p-7">
                    <p className="eyebrow !text-clay">{p.meta}</p>
                    <h3 className="font-display mt-2 text-3xl text-bone">{p.title}</h3>
                    <p className="mt-2 text-sm text-bone/50">{p.location}</p>
                  </div>
                  <span className="absolute right-6 top-6 font-mono text-xs text-bone/40">
                    0{i + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-6 w-full max-w-[1400px] px-5 font-mono text-[0.7rem] tracking-widest text-bone/30 uppercase md:px-10">
            {pinned ? "Scroll to explore →" : "Swipe to explore →"}
          </p>
        </div>
      </section>

      {active && <Lightbox project={active} onClose={() => setActive(null)} />}
    </>
  );
}
