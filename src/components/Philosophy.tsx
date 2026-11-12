import { ArrowUpRight, Trophy } from "lucide-react";
import Image from "next/image";
import { awards, certifications, philosophy } from "@/data/content";
import { Reveal, SectionHeading } from "./Motion";

export function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden border-t border-line bg-charcoal" aria-labelledby="phil-title">
      <div className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
        <SectionHeading id="phil-title" eyebrow="07 — QA philosophy" title="Prevent first." accent="Detect second." />
        <div className="grid gap-px border border-line bg-line md:grid-cols-2">
          {philosophy.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1} className="bg-ink/90 p-8 md:p-10">
              <p className="font-mono text-xs text-lime">0{i + 1}</p>
              <h3 className="mt-3 font-display text-3xl md:text-4xl">{p.title}</h3>
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
      <SectionHeading id="awards-title" eyebrow="08 — Awards & certifications" title="Recognized," accent="and certified." />
      <ul className="divide-y divide-line border-y border-line">
        {awards.map((a, i) => (
          <Reveal as="li" key={a.title} delay={i * 0.1} className="group flex flex-wrap items-center gap-x-10 gap-y-2 py-8 transition-colors hover:bg-panel md:px-6">
            <span className="font-display text-6xl text-lime md:text-8xl">{a.year}</span>
            <span className="flex-1">
              <span className="block font-display text-3xl md:text-5xl">{a.title}</span>
              <span className="mt-1 block font-mono text-xs uppercase tracking-[0.2em] text-mute">{a.org}</span>
            </span>
            <Trophy className="text-lime" size={32} aria-hidden />
          </Reveal>
        ))}
      </ul>
      {certifications.map((c) => (
        <Reveal key={c.title} className="mt-16 grid gap-px border border-line bg-line lg:grid-cols-12">
          <div className="bg-charcoal p-8 md:p-10 lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">Certification · {c.year}</p>
            <h3 className="mt-3 font-display text-3xl md:text-4xl">{c.title}</h3>
            <p className="mt-4 text-mute">
              {c.issuer} · {c.detail}
            </p>
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-lime px-5 py-3 font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              Verify certificate <ArrowUpRight size={18} aria-hidden />
            </a>
          </div>
          <div className="bg-ink p-4 md:p-6 lg:col-span-7">
            <Image src={c.image} alt={c.imageAlt} width={1226} height={912} sizes="(min-width: 1024px) 700px, 100vw" className="h-auto w-full" />
          </div>
        </Reveal>
      ))}
    </section>
  );
}
