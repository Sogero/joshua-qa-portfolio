import { skillGroups } from "@/data/content";
import { Reveal, SectionHeading } from "./Motion";

// The first items in each group are the lead tools; the rest are supporting skills.
const LEAD_COUNT = 2;

export function Skills() {
  return (
    <section id="toolkit" className="border-t border-line bg-charcoal" aria-labelledby="toolkit-title">
      <div className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
        <SectionHeading id="toolkit-title" eyebrow="02 — QA skills & toolkit" title="The toolkit behind" accent="every release." />
        <div className="border-t border-line">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.title}
              delay={i * 0.08}
              className="group grid gap-6 border-b border-line py-10 transition-colors hover:bg-panel md:grid-cols-12 md:gap-10 md:px-6 md:py-14"
            >
              <div className="md:col-span-4">
                <p className="font-mono text-xs text-lime">{group.index}</p>
                <h3 className="mt-3 font-display text-4xl md:text-5xl">{group.title}</h3>
              </div>
              <ul className="flex flex-wrap items-baseline gap-x-4 gap-y-3 md:col-span-8 md:pt-6">
                {group.items.map((item, j) => (
                  <li key={item} className="flex items-baseline gap-4">
                    <span
                      className={
                        j < LEAD_COUNT
                          ? "font-display text-3xl text-lime md:text-4xl"
                          : "text-lg text-mute transition-colors group-hover:text-soft md:text-xl"
                      }
                    >
                      {item}
                    </span>
                    {j < group.items.length - 1 && (
                      <span className="text-line" aria-hidden>
                        /
                      </span>
                    )}
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
