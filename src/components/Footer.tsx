import { Mail, MapPin } from "lucide-react";
import { SITE } from "../config/site";
import { WA_GENERIC, TEL_LINK } from "../lib/lead";
import Logo from "./Logo";
import { FOOTER_ROUTES } from "../lib/router";

/* Lucide dropped brand marks for licensing reasons — inlined instead. */
const Instagram = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const Facebook = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-ink pt-20 pb-28 text-bone/60 md:pb-12">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-12 border-b border-bone/10 pb-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo variant="full" align="start" className="text-[1.05rem]" />
            <p className="mt-6 max-w-[38ch] leading-relaxed">{SITE.meaning}</p>
            <div className="mt-6 flex gap-4">
              <a href={SITE.socials.instagram} aria-label="Instagram" className="hover:text-bone">
                <Instagram />
              </a>
              <a href={SITE.socials.facebook} aria-label="Facebook" className="hover:text-bone">
                <Facebook />
              </a>
            </div>
          </div>

          <div>
            <h3 className="eyebrow !text-bone/40">Explore</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {FOOTER_ROUTES.map((r) => (
                <li key={r.path}>
                  <a href={r.path} className="transition-colors hover:text-bone">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow !text-bone/40">Get in touch</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={TEL_LINK} className="font-mono transition-colors hover:text-bone">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-bone"
                >
                  <Mail size={15} strokeWidth={1.5} /> {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2 leading-relaxed">
                <MapPin size={15} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                {SITE.address}
              </li>
              <li>
                <a
                  href={WA_GENERIC}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block rounded-full bg-clay px-5 py-2.5 text-bone transition-colors hover:bg-clay-dark"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-7 font-mono text-[0.7rem] tracking-wide">
          <span>
            © {new Date().getFullYear()} {SITE.brandFull}
          </span>
          <span className="text-bone/30">Made in {SITE.city}</span>
        </div>
      </div>
    </footer>
  );
}
