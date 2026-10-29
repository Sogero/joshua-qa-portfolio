"use client";

import {
  animate,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from "motion/react";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

const hasFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Lime spotlight that follows the cursor across the whole page (desktop, motion-allowed only). */
export function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const opacity = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 });

  useEffect(() => {
    if (reduce || !hasFinePointer()) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 250);
      y.set(e.clientY - 250);
      opacity.set(1);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduce, x, y, opacity]);

  if (reduce) return null;
  return (
    <m.div
      aria-hidden
      style={{ x: sx, y: sy, opacity }}
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[500px] w-[500px] bg-[radial-gradient(closest-side,rgb(198_255_61/0.09),transparent)]"
    />
  );
}

/** Button/link wrapper that gently pulls toward the cursor. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16 });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.div ref={ref} onPointerMove={onMove} onPointerLeave={reset} style={{ x, y }} className="inline-block">
      {children}
    </m.div>
  );
}

/** 3D tilt + moving glare following the pointer. */
export function Tilt({ children, className, max = 8 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 200, damping: 20 });
  const glare = useTransform([px, py], ([a, b]) => `radial-gradient(360px circle at ${(a as number) * 100}% ${(b as number) * 100}%, rgb(198 255 61 / 0.14), transparent 60%)`);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div style={{ perspective: 900 }} className={className}>
      <m.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative h-full"
      >
        {children}
        {!reduce && (
          <m.div aria-hidden style={{ background: glare }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 [div:hover>&]:opacity-100" />
        )}
      </m.div>
    </div>
  );
}

/** Counts from 0 to `to` once it scrolls into view. `suffix` is appended (e.g. "+"). */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/**
 * Text whose words light up one by one as it scrolls through the viewport.
 * One scroll value drives a CSS variable; each word computes its own opacity in CSS,
 * so there is no per-word JavaScript. Unlit words stay at 40% so they remain readable.
 */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  if (reduce) return <p className={className}>{text}</p>;
  return (
    <m.p
      ref={ref}
      className={className}
      style={{ "--p": scrollYProgress, "--n": words.length } as MotionStyle}
    >
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span
            className="inline-block"
            style={{
              ["--i" as string]: i,
              opacity: "calc(0.4 + 0.6 * clamp(0, calc(var(--p) * var(--n) - var(--i)), 1))",
            }}
          >
            {w}
          </span>
        </Fragment>
      ))}
    </m.p>
  );
}
