"use client";

import {
  MotionConfig as BaseMotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

export function MotionConfig({ children }: { children: ReactNode }) {
  return <BaseMotionConfig reducedMotion="user">{children}</BaseMotionConfig>;
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "p" | "h2" | "h3";
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

/** Moves children vertically against scroll. `speed` is distance in px across the element's pass through the viewport. */
export function Parallax({
  children,
  speed = 80,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-speed, speed]);
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  id,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  id?: string;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-lime">
          <span className="h-px w-10 bg-lime" aria-hidden />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 id={id} className="max-w-4xl font-serif text-5xl leading-[1.02] md:text-7xl">
          {title} {accent && <em className="text-lime">{accent}</em>}
        </h2>
      </Reveal>
    </div>
  );
}
