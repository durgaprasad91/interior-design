import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { HERO_IMAGE } from "../config/site";
import { finishBoot } from "../lib/boot";
import { getLenis, prefersReducedMotion } from "../lib/motion";
import Logo from "./Logo";


const R = 44;
const C = 2 * Math.PI * R;

/** Waits for the webfonts and the hero image, but never longer than this. */
const MAX_WAIT = 2800;

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Hold the page still while the overlay is up, otherwise a stray wheel
    // event scrolls the hero out of view before it has animated.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let released = false;
    const counter = { v: 0 };

    const release = () => {
      if (released) return;
      released = true;

      const out = () => {
        document.body.style.overflow = prevOverflow;
        getLenis()?.scrollTo(0, { immediate: true }) ?? window.scrollTo(0, 0);
        finishBoot();
        setGone(true);
      };

      if (prefersReducedMotion()) {
        setPct(100);
        out();
        return;
      }

      // Run the bar to 100 before lifting the curtain — a progress indicator
      // that vanishes at 60% reads as a glitch.
      gsap.to(counter, {
        v: 100,
        duration: 0.45,
        ease: "power2.out",
        onUpdate: () => setPct(Math.round(counter.v)),
        onComplete: () => {
          gsap
            .timeline({ onComplete: out })
            .to(bar.current, { opacity: 0, duration: 0.25 })
            .to(root.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.1");
        },
      });
    };

    // Creep toward 90% while the real work happens, then snap to 100 on release.
    const creep = gsap.to(counter, {
      v: 90,
      duration: 2.2,
      ease: "power1.out",
      onUpdate: () => setPct(Math.round(counter.v)),
    });

    const img = new Image();
    img.src = HERO_IMAGE;

    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      img.decode().catch(() => undefined),
    ]);

    const timeout = setTimeout(release, MAX_WAIT);
    ready.then(release);

    // Hard safety net. The graceful exit above runs on GSAP, which runs on
    // requestAnimationFrame — if that is throttled or stalls, the page would
    // stay stuck behind the curtain. A plain timer guarantees it always lifts.
    const failsafe = setTimeout(() => {
      creep.kill();
      gsap.killTweensOf([root.current, bar.current]);
      setPct(100);
      document.body.style.overflow = prevOverflow;
      getLenis()?.scrollTo(0, { immediate: true });
      finishBoot();
      setGone(true);
    }, MAX_WAIT + 2000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(failsafe);
      creep.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <Logo variant="full" layout="stacked" emblem={false} className="text-[1.15rem]" />

      <div ref={bar} className="mt-14 flex flex-col items-center">
        <div className="relative h-28 w-28">
          {/* track */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
            <circle cx="50" cy="50" r={R} fill="none" stroke="currentColor" className="text-bone/12" strokeWidth="2.5" />
            {/* progress */}
            <circle
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke="var(--color-clay)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C - (C * pct) / 100}
              style={{ transition: "stroke-dashoffset 220ms ease-out" }}
            />
          </svg>

          {/* slow orbiting accent, so the ring still reads as "working"
              even while the progress value is waiting on the network */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 animate-[spin_2.6s_linear_infinite]">
            <circle cx="50" cy={50 - R} r="2.6" fill="var(--color-brass)" />
          </svg>

          <span className="absolute inset-0 flex items-center justify-center">
            <img src="/logo-emblem.png" alt="" aria-hidden="true" className="h-11 w-auto" />
          </span>
        </div>

      </div>
    </div>
  );
}
