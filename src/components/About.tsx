import { MapPin } from "lucide-react";
import { aboutParagraphs, profile } from "@/data/content";
import { Parallax, Reveal, SectionHeading } from "./Motion";

export function About() {
  return (
    <section id="about" className="border-t border-line bg-charcoal" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-28 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-7">
          <SectionHeading id="about-title" eyebrow="08 — About me" title="Quality is a" accent="mindset." />
          <div className="space-y-6 text-lg leading-relaxed text-mute">
            {aboutParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <Parallax speed={40}>
            <div className="border border-line bg-ink p-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">Quick facts</p>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="font-mono text-xs uppercase text-mute">Role</dt>
                  <dd className="font-display text-2xl">{profile.role}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase text-mute">Based in</dt>
                  <dd className="flex items-center gap-2 font-display text-2xl">
                    <MapPin size={18} className="text-lime" aria-hidden /> {profile.location}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase text-mute">Focus</dt>
                  <dd className="font-display text-2xl">Fintech, enterprise &amp; mobile QA</dd>
                </div>
              </dl>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
