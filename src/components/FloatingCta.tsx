import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { WA_GENERIC, TEL_LINK } from "../lib/lead";

export default function FloatingCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop: floating bubble */}
      <a
        href={WA_GENERIC}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={`fixed bottom-7 right-7 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-500 hover:scale-105 md:flex ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366]/40" />
        <MessageCircle size={25} strokeWidth={1.9} className="relative" />
      </a>

      {/* Mobile: sticky action bar, always reachable with a thumb */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-ink/10 bg-bone/95 backdrop-blur-xl md:hidden">
        <a
          href={TEL_LINK}
          className="flex items-center justify-center gap-2 py-4 text-sm font-medium text-ink"
        >
          <Phone size={17} strokeWidth={1.8} /> Call
        </a>
        <a
          href={WA_GENERIC}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-[#25D366] py-4 text-sm font-medium text-white"
        >
          <MessageCircle size={17} strokeWidth={1.8} /> WhatsApp
        </a>
      </div>
    </>
  );
}
