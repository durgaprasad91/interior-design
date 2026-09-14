import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { WA_GENERIC } from "../lib/lead";
import Logo from "./Logo";
import { NAV_ROUTES as LINKS } from "../lib/router";


export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-bone/10 bg-ink/80 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-5"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10">
          <a href="/" aria-label="Sthira Living Interiors — home">
            <Logo className="text-[0.82rem]" />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <li key={l.path}>
                <a
                  href={l.path}
                  className="group relative text-[0.8rem] tracking-wide text-bone/75 transition-colors hover:text-bone"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-clay transition-all duration-400 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={WA_GENERIC}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-clay px-5 py-2.5 text-[0.8rem] font-medium text-bone transition-colors duration-300 hover:bg-clay-dark sm:inline-flex"
            >
              <MessageCircle size={15} strokeWidth={2} />
              WhatsApp us
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="text-bone lg:hidden"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-[60] bg-ink transition-opacity duration-400 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <Logo className="text-[0.82rem]" />
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-bone">
            <X size={26} strokeWidth={1.5} />
          </button>
        </div>
        <ul className="mt-10 flex flex-col gap-2 px-5">
          {LINKS.map((l, i) => (
            <li key={l.path}>
              <a
                href={l.path}
                onClick={() => setOpen(false)}
                className="block border-b border-bone/10 py-5 font-display text-4xl text-bone"
              >
                <span className="mr-4 font-mono text-xs text-clay">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={WA_GENERIC}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-5 mt-10 flex items-center justify-center gap-2 rounded-full bg-clay py-4 text-bone"
        >
          <MessageCircle size={18} /> Chat on WhatsApp
        </a>
      </div>
    </>
  );
}
