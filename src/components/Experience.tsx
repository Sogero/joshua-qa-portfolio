"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Award } from "lucide-react";
import { useRef } from "react";
import { experience } from "@/data/content";
import { Reveal, SectionHeading } from "./Motion";

export function Experience() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="experience" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36" aria-labelledby="exp-title">
      <SectionHeading id="exp-title" eyebrow="03 — Professional experience" title="Where I've" accent="shipped quality." />

      <ol ref={ref} className="relative ml-2 border-l border-line pl-8 md:ml-0 md:pl-16">
        <motion.span
          aria-hidden
          className="absolute -left-px top-0 h-full w-px origin-top bg-lime"
          style={{ scaleY: reduce ? 1 : scaleY }}
        />
        {experience.map((job) => (
          <li key={job.company} className="relative pb-20 last:pb-0">
            <span className="absolute -left-[2.45rem] top-2 h-3 w-3 bg-lime md:-left-[4.45rem]" aria-hidden />
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">{job.period}</p>
              <h3 className="mt-3 font-display text-4xl md:text-6xl">{job.company}</h3>
              <p className="mt-1 text-lg text-mute">{job.role}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-8 grid max-w-3xl gap-3">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-4 border-b border-line pb-3 text-soft/85">
                    <span className="mt-2.5 h-px w-4 shrink-0 bg-lime" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
              {job.badges.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {job.badges.map((b) => (
                    <span key={b} className="inline-flex items-center gap-2 border border-lime/50 bg-lime/10 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-lime">
                      <Award size={14} aria-hidden /> {b}
                    </span>
                  ))}
                </div>
              )}
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
