import { Trophy } from "lucide-react";
import { awards, philosophy } from "@/data/content";
import { Parallax, Reveal, SectionHeading } from "./Motion";

export function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden border-t border-line bg-charcoal" aria-labelledby="phil-title">
      <Parallax speed={120} className="pointer-events-none absolute inset-0">
        <span className="outline-text absolute -left-10 top-10 select-none font-serif text-[30vw] leading-none" aria-hidden>
          Prevent
        </span>
      </Parallax>
      <div className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
        <SectionHeading id="phil-title" eyebrow="06 — QA philosophy" title="Prevent first." accent="Detect second." />
        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          {philosophy.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1} className="bg-ink/90 p-8 backdrop-blur md:p-10">
              <p className="font-mono text-xs text-lime">0{i + 1}</p>
              <h3 className="mt-3 font-serif text-3xl md:text-4xl">{p.title}</h3>
              <p className="mt-4 text-mute">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Awards() {
  return (
    <section id="awards" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36" aria-labelledby="awards-title">
      <SectionHeading id="awards-title" eyebrow="07 — Awards & recognition" title="Recognized at" accent="TraxionTech." />
      <ul className="divide-y divide-line border-y border-line">
        {awards.map((a, i) => (
          <Reveal as="li" key={a.title} delay={i * 0.1} className="group flex flex-wrap items-center gap-x-10 gap-y-2 py-8 transition-colors hover:bg-panel md:px-6">
            <span className="font-serif text-6xl text-lime md:text-8xl">{a.year}</span>
            <span className="flex-1">
              <span className="block font-serif text-3xl md:text-5xl">{a.title}</span>
              <span className="mt-1 block font-mono text-xs uppercase tracking-[0.2em] text-mute">{a.org}</span>
            </span>
            <Trophy className="text-lime" size={32} aria-hidden />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
