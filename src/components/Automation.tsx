import { ArrowUpRight } from "lucide-react";
import { automationProjects } from "@/data/content";
import { AutomationTerminal } from "./AutomationTerminal";
import { Parallax, Reveal, SectionHeading } from "./Motion";

export function Automation() {
  return (
    <section id="automation" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36" aria-labelledby="auto-title">
      <SectionHeading id="auto-title" eyebrow="06 — Automation" title="Tests that" accent="run themselves." />
      <div className="space-y-10">
        {automationProjects.map((p) => (
          <Reveal key={p.slug} as="article" className="grid gap-px border border-line bg-line lg:grid-cols-12">
            <div className="relative overflow-hidden bg-charcoal p-8 md:p-10 lg:col-span-7">
              <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden />
              <Parallax speed={24} className="pointer-events-none absolute inset-0">
                <span
                  className="outline-text absolute -bottom-10 -right-4 select-none font-display text-[10rem] leading-none md:text-[14rem]"
                  aria-hidden
                >
                  E2E
                </span>
              </Parallax>
              <p className="relative font-mono text-xs uppercase tracking-[0.2em] text-lime">Personal project · Open source</p>
              <h3 className="relative mt-3 font-display text-4xl md:text-6xl">{p.name}</h3>
              <p className="relative mt-5 max-w-xl text-lg text-mute">{p.summary}</p>
              <ul className="relative mt-8 flex flex-wrap gap-2">
                {p.stack.map((t) => (
                  <li key={t} className="border border-line px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-mute">
                    {t}
                  </li>
                ))}
              </ul>
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-8 inline-flex items-center gap-2 bg-lime px-5 py-3 font-medium text-ink transition-transform hover:-translate-y-0.5"
                >
                  View on GitHub <ArrowUpRight size={18} aria-hidden />
                </a>
              )}
            </div>
            <div className="bg-ink lg:col-span-5">
              <AutomationTerminal title="playwright — eventhub suite" checks={p.covers} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
