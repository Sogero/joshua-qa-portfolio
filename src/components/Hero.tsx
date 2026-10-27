"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, Download } from "lucide-react";
import { useRef } from "react";
import { profile } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const r = (a: number, b: number) => (reduce ? [0, 0] : [a, b]);

  const gridY = useTransform(scrollYProgress, [0, 1], r(0, 160));
  const glowY = useTransform(scrollYProgress, [0, 1], r(0, 260));
  const bigY = useTransform(scrollYProgress, [0, 1], r(0, -120));
  const textY = useTransform(scrollYProgress, [0, 1], r(0, 90));
  const fade = useTransform(scrollYProgress, [0, 0.8], reduce ? [1, 1] : [1, 0]);

  const words = ["I", "don't", "just", "find", "bugs."];

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <motion.div style={{ y: gridY }} className="grid-bg absolute inset-[-10%] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden />
      <motion.div
        style={{ y: glowY }}
        className="absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-lime/15 blur-[140px]"
        aria-hidden
      />
      <motion.div
        style={{ y: bigY }}
        className="outline-text pointer-events-none absolute -bottom-6 left-0 select-none whitespace-nowrap font-serif text-[34vw] leading-none md:text-[24vw]"
        aria-hidden
      >
        QUALITY
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-8 inline-flex items-center gap-3 border border-line bg-charcoal/70 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
          </span>
          {profile.status}
        </motion.p>

        <h1 className="font-serif text-[clamp(3.4rem,11vw,9.5rem)] leading-[0.92] tracking-tight">
          <span className="sr-only">{profile.tagline}</span>
          <span aria-hidden>
            {words.map((w, i) => (
              <span key={w} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
                <motion.span
                  className={`inline-block ${i === 4 ? "italic text-lime" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end"
        >
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-lime">
              {profile.name} · {profile.role}
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-mute">{profile.headline}</p>
            <p className="mt-1 font-mono text-xs text-mute">{profile.location}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-lime px-6 py-3.5 font-mono text-sm uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5"
            >
              View work
              <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a
              href={profile.resume}
              download={profile.resumeName}
              className="inline-flex items-center gap-2 border border-soft/30 px-6 py-3.5 font-mono text-sm uppercase tracking-wider transition-colors hover:border-lime hover:text-lime"
            >
              <Download size={16} aria-hidden /> Résumé
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
