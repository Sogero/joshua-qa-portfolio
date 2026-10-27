import { skillGroups } from "@/data/content";
import { Reveal, SectionHeading } from "./Motion";

export function Skills() {
  return (
    <section id="toolkit" className="border-t border-line bg-charcoal" aria-labelledby="toolkit-title">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
        <SectionHeading id="toolkit-title" eyebrow="02 — QA skills & toolkit" title="The toolkit behind" accent="every release." />
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.1} className="group bg-charcoal p-8 transition-colors hover:bg-panel md:p-10">
              <p className="font-mono text-xs text-lime">{group.index}</p>
              <h3 className="mt-3 font-serif text-4xl">{group.title}</h3>
              <ul className="mt-8 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 border-b border-line pb-3 text-mute transition-colors group-hover:text-soft">
                    <span className="h-1.5 w-1.5 bg-lime" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
