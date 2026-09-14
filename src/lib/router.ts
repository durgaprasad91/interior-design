import { useEffect } from "react";
import { getLenis, prefersReducedMotion } from "./motion";
import { bootComplete } from "./boot";

/** The fixed header overlaps the page, so scrolling to a section has to stop
 *  short of it or the heading ends up hidden behind the bar. */
const NAV_OFFSET = 84;

/**
 * The page is one continuous scroll, but each section gets a real URL.
 * Clicking a link pushes the path and scrolls; scrolling rewrites the path.
 * Deep links work because the host serves index.html for unknown paths
 * (see public/_redirects and vercel.json).
 */
/** `nav: false` keeps a route out of the header but still linked in the footer. */
export type Route = { path: string; id: string; label: string; nav?: boolean };

export const ROUTES: Route[] = [
  { path: "/", id: "top", label: "Home" },
  { path: "/services", id: "services", label: "Services" },
  { path: "/work", id: "work", label: "Work" },
  { path: "/room", id: "room", label: "360° Room" },
  { path: "/packages", id: "packages", label: "Packages" },
  { path: "/estimate", id: "estimate", label: "Estimate" },
  { path: "/process", id: "process", label: "Process", nav: false },
  { path: "/faq", id: "faq", label: "FAQ", nav: false },
  { path: "/quote", id: "quote", label: "Get a Quote" },
];

const byPath = (path: string) => ROUTES.find((r) => r.path === path.replace(/\/+$/, "") || (path === "/" && r.path === "/"));

export function scrollToSection(id: string, smooth = true) {
  const el = id === "top" ? document.body : document.getElementById(id);
  if (!el) return;
  const top =
    id === "top" ? 0 : Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);

  // While Lenis is running it owns the scroll position — a raw window.scrollTo
  // is reverted on its next frame, so every jump has to go through it.
  const lenis = getLenis();
  const animate = smooth && !prefersReducedMotion();

  if (lenis) {
    lenis.scrollTo(top, animate ? { duration: 1.1 } : { immediate: true });
  } else {
    window.scrollTo({ top, behavior: animate ? "smooth" : "auto" });
  }
}

export function navigate(path: string, smooth = true) {
  const route = byPath(path);
  if (!route) return false;
  if (window.location.pathname !== route.path) {
    window.history.pushState({}, "", route.path);
  }
  scrollToSection(route.id, smooth);
  return true;
}

export function useSectionRouter() {
  useEffect(() => {
    // The browser restores the previous scroll position on reload, which
    // fights the deep-link scroll below and leaves the page parked mid-section.
    // Own the scroll position ourselves instead.
    const previous = window.history.scrollRestoration;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const initial = byPath(window.location.pathname);
    let cancelled = false;

    // Start at the very top, then move to the deep-linked section (if any)
    // once the preloader is gone and layout has settled.
    scrollToSection("top", false);

    bootComplete.then(() => {
      if (cancelled) return;
      if (initial && initial.id !== "top") {
        requestAnimationFrame(() => scrollToSection(initial.id, false));
      }
    });

    return () => {
      cancelled = true;
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = previous;
      }
    };
  }, []);

  useEffect(() => {
    // Intercept internal links so navigation never reloads the page.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = (e.target as HTMLElement).closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("/") || link.target === "_blank") return;
      if (navigate(href)) e.preventDefault();
    };

    const onPop = () => {
      const route = byPath(window.location.pathname);
      if (route) scrollToSection(route.id);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  useEffect(() => {
    // Scroll-spy: rewrite the address bar to whichever section is in view.
    // replaceState, not pushState — scrolling should not fill the back stack.
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const mark = window.scrollY + window.innerHeight * 0.35;
        let current: Route = ROUTES[0];
        for (const route of ROUTES) {
          if (route.id === "top") continue;
          const el = document.getElementById(route.id);
          if (el && el.offsetTop <= mark) current = route;
        }
        if (window.location.pathname !== current.path) {
          window.history.replaceState({}, "", current.path);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
}

/** Header links. */
export const NAV_ROUTES = ROUTES.filter((r) => r.path !== "/" && r.nav !== false);
/** Footer links — everything except the home route. */
export const FOOTER_ROUTES = ROUTES.filter((r) => r.path !== "/");
