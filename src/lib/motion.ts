import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Low-power heuristic: coarse pointer (touch) with few cores. Used to decide
 * whether to boot WebGL at all — a mid-range Android should get the poster.
 */
export const isLowPower = () => {
  if (typeof window === "undefined") return true;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const cores = navigator.hardwareConcurrency ?? 4;
  return coarse && cores <= 4;
};

let lenisInstance: Lenis | null = null;
/** The live Lenis instance, so the router can drive smooth scrolling too. */
export const getLenis = () => lenisInstance;

/** Smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      document.documentElement.classList.add("no-anim");
      return;
    }

    const lenis = new Lenis({
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 1,
      // Native momentum on touch already feels right; hijacking it makes
      // phones feel laggy.
      syncTouch: false,
    });
    lenisInstance = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenisInstance = null;
      lenis.destroy();
    };
  }, []);
}

type RevealOpts = {
  y?: number;
  stagger?: number;
  start?: string;
  duration?: number;
  selector?: string;
};

/**
 * Fades + lifts children matching `selector` (default `.reveal`) as the
 * container scrolls in. Returns a ref to attach to the section.
 */
export function useReveal<T extends HTMLElement>(opts: RevealOpts = {}) {
  const ref = useRef<T>(null);
  const {
    y = 26,
    stagger = 0.07,
    start = "top 85%",
    duration = 0.8,
    selector = ".reveal",
  } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [y, stagger, start, duration, selector]);

  return ref;
}

/** Counts a number up when it scrolls into view. */
export function useCountUp(target: number, duration = 1.8) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = String(target);
      return;
    }

    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: target,
        duration,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        },
      });
    }, el);

    return () => ctx.revert();
  }, [target, duration]);

  return ref;
}

export { gsap, ScrollTrigger };
