"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

// Seeded so the server and client render identical positions (no hydration mismatch).
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Mark = { glyph: string; left: string; top: string; lime: boolean; delay: number };

function makeMarks(count: number, seed: number, limeEvery: number): Mark[] {
  const rand = rng(seed);
  return Array.from({ length: count }, (_, i) => {
    const r = rand();
    return {
      glyph: r < 0.6 ? "+" : "○",
      left: `${(rand() * 96 + 1).toFixed(1)}%`,
      top: `${(rand() * 92 + 2).toFixed(1)}%`,
      lime: i % limeEvery === limeEvery - 1,
      delay: rand() * 4,
    };
  });
}

// Far marks are small and drift slowly; near marks are larger and drift faster.
const layers = [
  { marks: makeMarks(12, 11, 6), drift: 40, size: "text-xs", base: "text-soft/10" },
  { marks: makeMarks(7, 23, 4), drift: 110, size: "text-base", base: "text-soft/[0.13]" },
  { marks: makeMarks(4, 37, 4), drift: 200, size: "text-3xl", base: "text-soft/[0.16]" },
];

function Layer({
  layer,
  progress,
  reduce,
}: {
  layer: (typeof layers)[number];
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const y = useTransform(progress, [0, 1], reduce ? [0, 0] : [0, -layer.drift]);
  return (
    <motion.div style={{ y }} className="absolute inset-0">
      {layer.marks.map((m, i) => (
        <motion.span
          key={i}
          className={`absolute select-none font-mono ${layer.size} ${m.lime ? "text-lime" : layer.base}`}
          style={{ left: m.left, top: m.top }}
          initial={m.lime ? { opacity: 0.55 } : undefined}
          animate={m.lime && !reduce ? { opacity: [0.25, 0.8, 0.25] } : undefined}
          transition={m.lime ? { duration: 5, delay: m.delay, repeat: Infinity, ease: "easeInOut" } : undefined}
        >
          {m.glyph}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function HeroBackdrop({ progress, reduce }: { progress: MotionValue<number>; reduce: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {layers.map((layer, i) => (
        <Layer key={i} layer={layer} progress={progress} reduce={reduce} />
      ))}
    </div>
  );
}
