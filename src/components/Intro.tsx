import { stats } from "@/data/content";
import { CountUp, ScrollWords } from "./Interactive";
import { Parallax, Reveal } from "./Motion";

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
            <h2 id="intro-title" className="font-display text-4xl leading-[1.12] md:text-6xl">
              Peace of mind, <em className="text-lime">automated.</em>
            </h2>
          </Reveal>
          <ScrollWords
            className="mt-10 max-w-3xl font-display text-3xl leading-snug md:text-4xl"
            text={`I specialize in automated testing, so users and dev teams can trust every release. After ${stats[0].value} years in QA, I focus on fintech, on the paths where money moves. At TraxionTech I design end-to-end and regression tests with Playwright and Robot Framework, keeping our digital banking platforms dependable.`}
          />
        </div>
      </div>

      <Parallax speed={30} className="mt-20">
        <dl className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink p-6 md:p-8">
              <dd className="font-display text-6xl text-lime md:text-7xl">
                <CountUp to={parseInt(s.value)} suffix={s.value.includes("+") ? "+" : ""} />
              </dd>
              <dt className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-mute">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Parallax>
    </section>
  );
}
