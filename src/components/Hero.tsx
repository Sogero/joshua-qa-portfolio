"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDownRight, Download } from "lucide-react";
import { useRef } from "react";
import { profile } from "@/data/content";
import { Magnetic, PointerLayer } from "./Interactive";

const floaters = [
  { label: "TraxionPay", status: "PASS", pos: "right-[3%] top-[17%]", depth: 18 },
  { label: "DigiCOOP", status: "PASS", pos: "right-[19%] top-[17%]", depth: -14 },
  { label: "BIBO Super App", status: "PASS", pos: "right-[3%] top-[25%]", depth: 22 },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const r = (a: number, b: number) => (reduce ? [0, 0] : [a, b]);

  const gridY = useTransform(scrollYProgress, [0, 1], r(0, 160));
  const glowY = useTransform(scrollYProgress, [0, 1], r(0, 260));
  const textY = useTransform(scrollYProgress, [0, 1], r(0, 90));
  const fade = useTransform(scrollYProgress, [0, 0.8], reduce ? [1, 1] : [1, 0]);

  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 });
  const mouse = { x: mx, y: my };
  function onPointerMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }

  const words = ["I", "don't", "just", "find", "bugs."];

  return (
    <section ref={ref} onPointerMove={onPointerMove} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-16">
      <motion.div style={{ y: gridY }} className="grid-bg absolute inset-[-10%] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden />
      <motion.div
        style={{ y: glowY }}
        className="absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-lime/15 blur-[140px]"
        aria-hidden
      />

      {!reduce &&
        floaters.map((f) => (
          <PointerLayer key={f.label} mouse={mouse} depth={f.depth} className={`absolute ${f.pos} hidden xl:block`}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5 + Math.abs(f.depth) / 20, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
              className="flex items-center gap-3 border border-line bg-charcoal/80 px-4 py-2.5 font-mono text-xs backdrop-blur"
            >
              <span className="text-lime">● {f.status}</span>
              <span className="text-mute">{f.label}</span>
            </motion.div>
          </PointerLayer>
        ))}

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

        <h1 className="font-display text-[clamp(3.4rem,11vw,9.5rem)] leading-[0.92] tracking-tight">
          <span className="sr-only">{profile.tagline}</span>
          <span aria-hidden>
            {words.map((w, i) => (
              <span key={w} className="mr-[0.22em] -mb-[0.2em] inline-block overflow-hidden pb-[0.2em] align-bottom">
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
            <Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-lime px-6 py-3.5 font-mono text-sm uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5"
            >
              View work
              <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" aria-hidden />
            </a>
            </Magnetic>
            <Magnetic>
            <a
              href={profile.resume}
              download={profile.resumeName}
              className="inline-flex items-center gap-2 border border-soft/30 px-6 py-3.5 font-mono text-sm uppercase tracking-wider transition-colors hover:border-lime hover:text-lime"
            >
              <Download size={16} aria-hidden /> Résumé
            </a>
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
