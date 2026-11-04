"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const STEP_MS = 650;
const HOLD_MS = 4500;

export function AutomationTerminal({ title, checks }: { title: string; checks: string[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [step, setStep] = useState(0);

  // 1 step for the command, 2 per check (running → pass), 1 for the summary.
  const total = 2 + checks.length * 2;
  const shown = reduce ? total : step;

  useEffect(() => {
    if (reduce || !inView) return;
    const id = setTimeout(
      () => setStep((s) => (s >= total ? 0 : s + 1)),
      step === total ? HOLD_MS : step === 0 ? 900 : STEP_MS,
    );
    return () => clearTimeout(id);
  }, [step, reduce, inView, total]);

  const show = (at: number) => (shown >= at ? "opacity-100" : "opacity-0");

  return (
    <div ref={ref} aria-hidden className="h-full border-l border-line bg-ink">
      <div className="border-b border-line px-6 py-3">
        <span className="font-mono text-xs text-mute">{title}</span>
      </div>
      <div className="space-y-3 px-6 py-6 font-mono text-[13px] leading-none">
        <p className={`text-soft transition-opacity duration-300 ${show(1)}`}>
          <span className="text-lime">$</span> npx playwright test
        </p>
        <ul className="space-y-3.5 pt-1">
          {checks.map((name, i) => {
            const passed = shown >= 3 + i * 2;
            return (
              <li key={name} className={`flex items-center justify-between gap-4 transition-opacity duration-300 ${show(2 + i * 2)}`}>
                <span className="flex items-center gap-2.5 text-soft/90">
                  <span className={passed ? "text-lime" : "text-mute"}>{passed ? "✓" : "…"}</span>
                  {name}
                </span>
                <span
                  className={`border px-2 py-1 text-[11px] tracking-wider transition-colors duration-300 ${
                    passed ? "border-lime/50 bg-lime/10 text-lime" : "border-line text-mute"
                  }`}
                >
                  {passed ? "PASS" : "RUN"}
                </span>
              </li>
            );
          })}
        </ul>
        <div className={`mt-2 flex items-center justify-between border-t border-line pt-4 transition-opacity duration-300 ${show(total)}`}>
          <span className="text-mute">{checks.length} checks</span>
          <span className="text-lime">
            status: PASS
            <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-lime motion-reduce:animate-none" />
          </span>
        </div>
      </div>
    </div>
  );
}
