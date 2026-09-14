import { SITE } from "../config/site";

type Props = {
  /** `mark` is the compact nav lockup; `full` adds the strapline. */
  variant?: "mark" | "full";
  /** Stacked (emblem above the words) vs inline (emblem beside them). */
  layout?: "inline" | "stacked";
  align?: "center" | "start";
  /** Off when the emblem is already shown nearby, e.g. inside the loader ring. */
  emblem?: boolean;
  className?: string;
};

/**
 * The emblem is gold line art whose internal detail is defined by the black
 * around it, so it is only ever placed on a dark ground (nav, footer,
 * preloader). The wordmark is live text rather than part of the image so it
 * stays crisp and reflows on small screens.
 */
export default function Logo({
  variant = "mark",
  layout = "inline",
  align = "center",
  emblem = true,
  className = "",
}: Props) {
  const stacked = layout === "stacked";

  const words = (
    <span
      className={`flex flex-col leading-none ${
        stacked || align === "center" ? "items-center" : "items-start"
      }`}
    >
      <span className="font-display text-[1.5em] tracking-[0.02em] text-bone uppercase">
        {SITE.brand}
      </span>
      <span className="mt-[0.45em] font-mono text-[0.5em] tracking-[0.46em] text-brass uppercase">
        Interiors
      </span>
      {variant === "full" && (
        <span className="mt-[0.8em] font-display text-[0.72em] text-brass/85 italic">
          {SITE.motto.replace(/\.$/, "").replace(/\. /g, " · ")}
        </span>
      )}
    </span>
  );

  return (
    <span
      className={`inline-flex ${
        stacked ? "flex-col items-center gap-[0.7em]" : "flex-row items-center gap-[0.7em]"
      } ${className}`}
    >
      {emblem && (
        <img
          src="/logo-emblem.png"
          alt=""
          aria-hidden="true"
          className={stacked ? "h-[3.4em] w-auto" : "h-[2.3em] w-auto"}
          width={248}
          height={177}
        />
      )}
      {words}
    </span>
  );
}
