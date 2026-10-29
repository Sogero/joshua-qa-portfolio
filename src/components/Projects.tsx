"use client";

import { AnimatePresence, m } from "motion/react";
import { ArrowUpRight, CheckCircle2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { categories, projects, type Category, type Project } from "@/data/content";
import { Tilt } from "./Interactive";
import { SectionHeading } from "./Motion";

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="project-dialog-title"
      className="m-auto w-[min(92vw,44rem)] border border-line bg-charcoal p-0 text-soft backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="p-7 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">
                Project {project.index} · Status: Pass
              </p>
              <h3 id="project-dialog-title" className="mt-3 font-display text-5xl">
                {project.name}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="grid h-10 w-10 shrink-0 place-items-center border border-line transition-colors hover:border-lime hover:text-lime"
            >
              <X size={18} />
            </button>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-soft/90">{project.summary}</p>

          <h4 className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-mute">Testing focus</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.focus.map((f) => (
              <li key={f} className="border border-line px-3 py-1.5 text-sm">
                {f}
              </li>
            ))}
          </ul>

          <h4 className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-mute">Outcome</h4>
          <p className="mt-3 flex gap-3 border-l-2 border-lime bg-lime/5 p-4">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-lime" aria-hidden />
            {project.outcome}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wider text-lime">
            {project.tags.map((t) => (
              <li key={t}>#{t.replace(/\s/g, "")}</li>
            ))}
          </ul>
        </div>
      )}
    </dialog>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Category>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = projects.filter((p) => filter === "All" || p.categories.includes(filter));

  return (
    <section id="projects" className="border-t border-line bg-charcoal" aria-labelledby="projects-title">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
        <SectionHeading id="projects-title" eyebrow="04 — Featured projects" title="Nine products," accent="all passing." />

        <div role="group" aria-label="Filter projects by category" className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                filter === c ? "border-lime bg-lime text-ink" : "border-line text-mute hover:border-lime hover:text-lime"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {visible.length} projects
        </p>

        <m.ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <m.li
                key={p.slug}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="bg-charcoal"
              >
                <Tilt className="h-full" max={6}>
                <button
                  type="button"
                  onClick={() => setSelected(p)}
                  className="group flex h-full min-h-72 w-full flex-col justify-between p-7 text-left transition-colors hover:bg-panel"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-mute">{p.index}</span>
                      <span className="border border-lime/40 px-2 py-0.5 text-lime">PASS</span>
                    </div>
                    <h3 className="mt-8 font-display text-4xl transition-colors group-hover:text-lime">{p.name}</h3>
                    <p className="mt-3 text-mute">{p.summary}</p>
                  </div>
                  <div className="mt-8 flex items-end justify-between gap-4">
                    <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wider text-mute">
                      {p.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <ArrowUpRight className="shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime" aria-hidden />
                  </div>
                </button>
                </Tilt>
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>
      </div>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
