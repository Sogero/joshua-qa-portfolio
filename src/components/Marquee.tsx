import { Database } from "lucide-react";
import type { ReactNode } from "react";
import {
  siClickup,
  siGit,
  siJavascript,
  siPostman,
  siRobotframework,
  siSelenium,
  siTypescript,
} from "simple-icons";
import { logoShapes } from "@/data/logos";

function Mark({ path, viewBox = "0 0 24 24" }: { path: string; viewBox?: string }) {
  return (
    <svg viewBox={viewBox} width="22" height="22" fill="currentColor" role="presentation">
      <path d={path} />
    </svg>
  );
}

const tools: { name: string; mark: ReactNode }[] = [
  { name: "Playwright", mark: <Mark {...logoShapes.playwright} /> },
  { name: "TypeScript", mark: <Mark path={siTypescript.path} /> },
  { name: "JavaScript", mark: <Mark path={siJavascript.path} /> },
  { name: "Robot Framework", mark: <Mark path={siRobotframework.path} /> },
  { name: "Selenium", mark: <Mark path={siSelenium.path} /> },
  { name: "Java", mark: <Mark {...logoShapes.java} /> },
  { name: "Postman", mark: <Mark path={siPostman.path} /> },
  { name: "Git", mark: <Mark path={siGit.path} /> },
  // SQL is a language, not a product, so it gets a generic database icon.
  { name: "SQL", mark: <Database size={22} strokeWidth={1.75} aria-hidden /> },
  { name: "ClickUp", mark: <Mark path={siClickup.path} /> },
];

export function Marquee() {
  // Two identical groups, each long enough to span a wide screen; the track slides by exactly one group.
  return (
    <div className="marquee-wrap overflow-hidden border-y border-line bg-charcoal py-6 motion-reduce:hidden" aria-hidden>
      <div className="marquee flex w-max" style={{ ["--marquee-duration" as string]: "90s" }}>
        {[0, 1].map((g) => (
          <div key={g} className="flex shrink-0 items-center gap-12 pr-12">
            {[...tools, ...tools].map((t, i) => (
              <span key={i} className="flex items-center gap-3 whitespace-nowrap text-mute transition-colors hover:text-lime">
                {t.mark}
                <span className="text-lg font-medium">{t.name}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
