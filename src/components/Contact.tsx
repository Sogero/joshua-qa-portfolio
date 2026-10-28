"use client";

import { ArrowUpRight, Check, Copy, Download, Link2, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/content";
import { ContactDialog } from "./ContactForm";
import { Magnetic } from "./Interactive";
import { Reveal, SectionHeading } from "./Motion";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  const links = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
    { icon: Link2, label: "LinkedIn", value: "joshua-mendoza-softwareqaengineer", href: profile.linkedin, external: true },
  ];

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40" aria-labelledby="contact-title">
      <SectionHeading id="contact-title" eyebrow="09 — Contact" title="Let's ship something" accent="reliable." />
      <div className="grid gap-12 md:grid-cols-2">
        <Reveal>
          <p className="max-w-md text-lg text-mute">
            Open to QA engineering opportunities. Reach out by email, phone, or LinkedIn — or grab my résumé.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              aria-haspopup="dialog"
              className="inline-flex items-center gap-2 bg-lime px-6 py-3.5 font-mono text-sm uppercase tracking-wider text-ink transition-transform hover:-translate-y-0.5"
            >
              <Mail size={16} aria-hidden /> Send email
            </button>
            </Magnetic>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 border border-soft/30 px-6 py-3.5 font-mono text-sm uppercase tracking-wider transition-colors hover:border-lime hover:text-lime"
            >
              {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
              <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
            </button>
            <a
              href={profile.resume}
              download={profile.resumeName}
              className="inline-flex items-center gap-2 border border-soft/30 px-6 py-3.5 font-mono text-sm uppercase tracking-wider transition-colors hover:border-lime hover:text-lime"
            >
              <Download size={16} aria-hidden /> Résumé
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="divide-y divide-line border-y border-line">
            {links.map(({ icon: Icon, label, value, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-5 py-6 transition-colors hover:bg-panel md:px-4"
                >
                  <Icon className="text-lime" size={22} aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-xs uppercase tracking-[0.2em] text-mute">{label}</span>
                    <span className="block truncate text-lg">{value}</span>
                  </span>
                  <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <ContactDialog open={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  );
}
