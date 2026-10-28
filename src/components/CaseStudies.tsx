import { Check } from "lucide-react";
import { projects, type Project } from "@/data/content";
import { Tilt } from "./Interactive";
import { Parallax, Reveal, SectionHeading } from "./Motion";

const cases = projects.filter((p) => p.featuredCase);

function ReportCard({ project }: { project: Project }) {
  return (
    <Tilt max={4}>
      <div className="relative overflow-hidden border border-line bg-charcoal">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <Parallax speed={24} className="pointer-events-none absolute inset-0">
          <span
            className="outline-text absolute -right-3 -top-8 select-none font-display text-[9rem] leading-none"
            aria-hidden
          >
            {project.index}
          </span>
        </Parallax>

        <div className="relative flex items-center justify-between border-b border-line px-5 py-3 font-mono text-xs">
          <span className="flex items-center gap-2 text-mute">
            <span className="h-2 w-2 rounded-full bg-lime" aria-hidden /> test-report / {project.slug}
          </span>
          <span className="border border-lime/50 bg-lime/10 px-2 py-0.5 text-lime">PASS</span>
        </div>

        <ul className="relative divide-y divide-line">
          {project.focus.map((f) => (
            <li key={f} className="flex items-center gap-3 px-5 py-4 text-sm md:text-base">
              <span className="grid h-5 w-5 shrink-0 place-items-center bg-lime text-ink">
                <Check size={13} strokeWidth={3} aria-hidden />
              </span>
              <span className="flex-1">{f}</span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-lime">Pass</span>
            </li>
          ))}
        </ul>

        <div className="relative flex flex-wrap gap-2 border-t border-line px-5 py-4">
          {project.tags.map((t) => (
            <span key={t} className="border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-mute">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Tilt>
  );
}

export function CaseStudies() {
  return (
    <section id="case-studies" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36" aria-labelledby="cases-title">
      <SectionHeading id="cases-title" eyebrow="05 — Case studies" title="Four projects," accent="in depth." />
      <div className="space-y-20 md:space-y-28">
        {cases.map((c, i) => (
          <article key={c.slug} className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
            <div className={`md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}>
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">Case {c.index}</p>
                <h3 className="mt-3 font-display text-5xl md:text-7xl">{c.name}</h3>
                <p className="mt-5 max-w-lg text-lg text-mute">{c.summary}</p>
                <h4 className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-mute">Outcome</h4>
                <p className="mt-3 max-w-lg border-l-2 border-lime pl-4 font-display text-2xl leading-snug md:text-3xl">
                  {c.outcome}
                </p>
              </Reveal>
            </div>
            <div className={`md:col-span-6 ${i % 2 ? "md:order-1 md:col-start-1" : ""}`}>
              <Parallax speed={20}>
                <ReportCard project={c} />
              </Parallax>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
