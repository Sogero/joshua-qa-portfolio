"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDownRight, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/content";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroTerminal } from "./HeroTerminal";

const ease = [0.22, 1, 0.36, 1] as const;

const manilaTime = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Manila",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** Ticking Philippine time. Renders a placeholder until mounted to avoid a hydration mismatch. */
function ManilaClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => setTime(manilaTime.format(new Date()));
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time}
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], reduce ? [1, 1] : [1, 0]);

  const words = ["I", "don't", "just", "find", "bugs."];

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <HeroBackdrop progress={scrollYProgress} reduce={!!reduce} />

      <motion.div style={{ y: textY, opacity: fade }} className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease }}
          className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-[0.18em] text-mute"
        >
          <span>({profile.status})</span>
          <span className="hidden h-px w-8 bg-lime/60 sm:block" aria-hidden />
          <span>
            Rizal, PH · <span className="text-soft"><ManilaClock /></span> PHT
          </span>
        </motion.p>

        <div className="lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
          <div>
            <h1 className="font-display text-[clamp(3.4rem,11vw,9.5rem)] leading-[0.92] tracking-tight lg:text-[clamp(3.2rem,6.2vw,7.5rem)]">
              <span className="sr-only">{profile.tagline}</span>
              <span aria-hidden>
                {words.map((w, i) => {
                  const last = i === words.length - 1;
                  return (
                    <span key={w} className="mr-[0.22em] -mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom">
                      <motion.span
                        className={`relative inline-block ${last ? "italic text-lime" : ""}`}
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease }}
                      >
                        {w}
                        {last && (
                          <svg
                            viewBox="0 0 100 40"
                            preserveAspectRatio="none"
                            className="pointer-events-none absolute -inset-x-[4%] top-[34%] h-[34%] w-[108%] overflow-visible"
                          >
                            <motion.path
                              d="M1 24 C 14 10, 26 33, 40 19 S 66 12, 78 22 S 92 14, 99 17"
                              fill="none"
                              stroke="var(--color-redline)"
                              strokeWidth="5"
                              strokeLinecap="round"
                              vectorEffect="non-scaling-stroke"
                              initial={{ pathLength: reduce ? 1 : 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.7, delay: 1.25, ease: "easeOut" }}
                            />
                          </svg>
                        )}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 1.8, ease }}
              className="mt-4 -rotate-2 font-mono text-sm text-redline md:text-base"
            >
              ↳ I prevent them.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="hidden lg:block"
          >
            <HeroTerminal />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className="mt-12 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end"
        >
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-lime">
              {profile.name} · {profile.role}
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-mute">{profile.headline}</p>
            <p className="mt-1 font-mono text-xs text-mute">{profile.location}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:justify-end">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-lime px-6 py-3.5 text-[15px] font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              View my work
              <ArrowDownRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden />
            </a>
            <a
              href={profile.resume}
              download={profile.resumeName}
              className="inline-flex items-center gap-2 border-b border-soft/40 pb-1 text-[15px] font-medium transition-colors hover:border-lime hover:text-lime"
            >
              <Download size={16} aria-hidden /> Download résumé
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
