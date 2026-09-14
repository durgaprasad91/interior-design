import { Check } from "lucide-react";
import { WHY_US } from "../config/site";
import { useReveal } from "../lib/motion";
import SectionHead from "./SectionHead";

export default function WhyUs() {
  const ref = useReveal<HTMLElement>({ stagger: 0.06 });

  return (
    <section ref={ref} className="bg-espresso py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <SectionHead n="08" label="Why us" title="The promises we put in writing" light />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-bone/15 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((w) => (
            <div key={w.title} className="reveal bg-espresso p-8">
              <Check size={20} strokeWidth={1.6} className="text-clay" />
              <h3 className="font-display mt-5 text-2xl text-bone">{w.title}</h3>
              <p className="mt-2 leading-relaxed text-bone/60">{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
