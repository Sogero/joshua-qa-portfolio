import { profile, stats, skillGroups } from "@/data/content";
import { Parallax, Reveal } from "./Motion";

const marqueeItems = Array.from(new Set(skillGroups.flatMap((g) => g.items)));

export function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div className="overflow-hidden border-y border-line bg-charcoal py-5" aria-hidden>
      <div className="marquee flex w-max gap-10 whitespace-nowrap font-mono text-sm uppercase tracking-[0.2em] text-mute">
        {[...row, ...row].map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            {item}
            <span className="text-lime">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Intro() {
  return (
    <section id="intro" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40" aria-labelledby="intro-title">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-lime">
              <span className="h-px w-10 bg-lime" aria-hidden /> 01 — Introduction
            </p>
          </Reveal>
        </div>
        <div className="md:col-span-8">
          <Reveal>
            <h2 id="intro-title" className="font-serif text-4xl leading-[1.12] md:text-6xl">
              Over <em className="text-lime">3 years</em> ensuring release quality across fintech, enterprise, and mobile
              platforms.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mute">
              {profile.summary} I aim to prevent defects from reaching users — not just find them.
            </p>
          </Reveal>
        </div>
      </div>

      <Parallax speed={30} className="mt-20">
        <dl className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink p-6 md:p-8">
              <dd className="font-serif text-6xl text-lime md:text-7xl">{s.value}</dd>
              <dt className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-mute">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Parallax>
    </section>
  );
}
