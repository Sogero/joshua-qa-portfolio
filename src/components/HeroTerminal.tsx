"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { projects } from "@/data/content";

// Focus areas taken from the projects and experience on the site.
const suites = [
  "Payment Gateway Flows",
  "API Integrations",
  "Regression Suite",
  "End-to-End Testing",
  "User Acceptance Testing",
];

// 1 step for the command, 2 per suite (running → pass), 1 for the summary.
const TOTAL_STEPS = 2 + suites.length * 2;
const STEP_MS = 650;
const HOLD_MS = 4500;

export function HeroTerminal() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const shown = reduce ? TOTAL_STEPS : step;

  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(
      () => setStep((s) => (s >= TOTAL_STEPS ? 0 : s + 1)),
      step === TOTAL_STEPS ? HOLD_MS : step === 0 ? 900 : STEP_MS,
    );
    return () => clearTimeout(id);
  }, [step, reduce]);

  const show = (at: number) => (shown >= at ? "opacity-100" : "opacity-0");

  return (
    <div aria-hidden className="w-full overflow-hidden border border-line bg-charcoal/85 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="border-b border-line px-5 py-3">
        <span className="font-mono text-xs text-mute">robot — regression suite</span>
      </div>

      <div className="space-y-3 px-5 py-5 font-mono text-[13px] leading-none">
        <p className={`text-soft transition-opacity duration-300 ${show(1)}`}>
          <span className="text-lime">$</span> robot --suite regression
        </p>

        <ul className="space-y-3.5 pt-1">
          {suites.map((name, i) => {
            const visible = show(2 + i * 2);
            const passed = shown >= 3 + i * 2;
            return (
              <li key={name} className={`flex items-center justify-between gap-4 transition-opacity duration-300 ${visible}`}>
                <span className="flex items-center gap-2.5 text-soft/90">
                  <span className={passed ? "text-lime" : "text-mute"}>{passed ? "✓" : "…"}</span>
                  {name}
                </span>
                <span className={`border px-2 py-1 text-[11px] tracking-wider transition-colors duration-300 ${
                  passed ? "border-lime/50 bg-lime/10 text-lime" : "border-line text-mute"
                }`}>
                  {passed ? "PASS" : "RUN"}
                </span>
              </li>
            );
          })}
        </ul>

        <div className={`mt-2 flex items-center justify-between border-t border-line pt-4 transition-opacity duration-300 ${show(TOTAL_STEPS)}`}>
          <span className="text-mute">{projects.length} projects tested</span>
          <span className="text-lime">
            status: PASS
            <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-lime motion-reduce:animate-none" />
          </span>
        </div>
      </div>
    </div>
  );
}
