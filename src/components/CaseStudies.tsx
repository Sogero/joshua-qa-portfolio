import { projects } from "@/data/content";
import { Parallax, Reveal, SectionHeading } from "./Motion";

const cases = projects.filter((p) => p.featuredCase);

export function CaseStudies() {
  return (
    <section id="case-studies" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36" aria-labelledby="cases-title">
      <SectionHeading id="cases-title" eyebrow="05 — Case studies" title="Four projects," accent="in depth." />
      <div className="space-y-24 md:space-y-36">
        {cases.map((c, i) => (
          <article key={c.slug} className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className={`md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`}>
              <Parallax speed={40} className="relative">
                <div className="relative aspect-[4/3] overflow-hidden border border-line bg-charcoal">
                  <div className="grid-bg absolute inset-0" aria-hidden />
                  <span className="outline-text absolute -bottom-6 -right-2 select-none font-serif text-[14rem] leading-none" aria-hidden>
                    {c.index}
                  </span>
                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="border border-lime/40 bg-ink/70 px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-lime">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Parallax>
            </div>

            <div className={`md:col-span-6 ${i % 2 ? "md:col-start-1 md:row-start-1" : "md:col-start-7"}`}>
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">Case {c.index}</p>
                <h3 className="mt-3 font-serif text-5xl md:text-7xl">{c.name}</h3>
                <p className="mt-5 text-lg text-mute">{c.summary}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h4 className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-mute">Scope</h4>
                <ul className="mt-3 divide-y divide-line border-y border-line">
                  {c.focus.map((f) => (
                    <li key={f} className="py-3">{f}</li>
                  ))}
                </ul>
                <h4 className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-mute">Outcome</h4>
                <p className="mt-3 border-l-2 border-lime pl-4 font-serif text-2xl leading-snug md:text-3xl">{c.outcome}</p>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
