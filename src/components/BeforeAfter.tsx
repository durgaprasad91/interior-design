import { useCallback, useRef, useState } from "react";
import { BEFORE_AFTER } from "../config/site";
import { useReveal } from "../lib/motion";

export default function BeforeAfter() {
  const reveal = useReveal<HTMLElement>();
  const frame = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section ref={reveal} className="bg-bone-dim py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow reveal">04 / Before &amp; after</p>
            <h2 className="display reveal mt-5 text-[clamp(2.25rem,5.5vw,4.5rem)]">
              The same four walls
            </h2>
          </div>
          <p className="eyebrow reveal">{BEFORE_AFTER.caption}</p>
        </div>

        <div
          ref={frame}
          className="reveal relative mt-12 aspect-[4/3] w-full cursor-ew-resize overflow-hidden rounded-2xl select-none md:aspect-[16/9]"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            setFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (e.buttons > 0) setFromClientX(e.clientX);
          }}
        >
          <img
            src={BEFORE_AFTER.after}
            alt="After the interior fit-out"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Clip rather than resize: a width-based reveal squashes the underlying
              image as the handle moves, and needs a re-measure on every resize. */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              src={BEFORE_AFTER.before}
              alt="Before the interior fit-out"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute left-5 top-5 rounded-full bg-ink/70 px-3 py-1 font-mono text-[0.65rem] tracking-widest text-bone uppercase backdrop-blur">
              Before
            </span>
          </div>
          <span className="absolute right-5 top-5 rounded-full bg-ink/70 px-3 py-1 font-mono text-[0.65rem] tracking-widest text-bone uppercase backdrop-blur">
            After
          </span>

          <div
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-bone"
            style={{ left: `${pos}%` }}
          >
            <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bone text-ink shadow-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="m9 6-5 6 5 6M15 6l5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          {/* Keyboard-accessible equivalent of the drag handle. */}
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Reveal before or after"
            className="absolute inset-x-0 bottom-4 mx-auto w-2/3 opacity-0 focus-visible:opacity-100"
          />
        </div>
      </div>
    </section>
  );
}
