import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Move3D } from "lucide-react";
import { isLowPower, prefersReducedMotion, useReveal } from "../lib/motion";
import SectionHead from "./SectionHead";

// three.js lives in its own chunk and is never part of the initial download.
const Room360 = lazy(() => import("./Room360"));

export default function RoomSection() {
  const reveal = useReveal<HTMLElement>();
  const stage = useRef<HTMLDivElement>(null);
  const [boot, setBoot] = useState(false);
  const [forced, setForced] = useState(false);

  // Low-power phones and reduced-motion users get the poster unless they
  // explicitly ask for 3D by tapping the button.
  const auto = !isLowPower() && !prefersReducedMotion();

  useEffect(() => {
    const el = stage.current;
    if (!el || boot) return;
    if (!auto && !forced) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBoot(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [auto, forced, boot]);

  // A 4K equirectangular map is lovely on a desktop and wasteful on a phone.
  const src =
    typeof window !== "undefined" && window.innerWidth < 900
      ? "/room-360-sm.jpg"
      : "/room-360.jpg";

  return (
    <section id="room" ref={reveal} className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            n="03"
            label="Step inside"
            title="Look around a finished home"
            sub="Drag to look around a room we handed over. The markers show what each element costs."
            light
          />
          <p className="eyebrow reveal hidden !text-bone/40 md:block">Drag to look around ↔</p>
        </div>

        <div
          ref={stage}
          className="reveal relative mt-14 aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink md:aspect-[21/9]"
        >
          {boot ? (
            <Suspense
              fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="eyebrow animate-pulse !text-bone/50">Loading room…</span>
                </div>
              }
            >
              <Room360 src={src} />
            </Suspense>
          ) : (
            <>
              <img
                src="/room-360-poster.jpg"
                alt="Panoramic view of a finished living room"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setForced(true)}
                  className="inline-flex items-center gap-3 rounded-full bg-bone px-7 py-4 text-sm font-medium text-ink transition-colors hover:bg-clay hover:text-bone"
                >
                  <Move3D size={18} strokeWidth={1.6} />
                  View this room in 3D
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
