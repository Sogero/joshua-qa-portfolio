import { ArrowUp } from "lucide-react";
import { profile } from "@/data/content";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-10">
        <div className="flex items-center gap-4">
          <Logo size={44} />
          <div>
          <p className="font-display text-3xl">{profile.name}</p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-mute">
            {profile.role} · {profile.location}
          </p>
          </div>
        </div>
        <p className="font-mono text-xs text-mute">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:border-lime hover:text-lime"
        >
          Back to top <ArrowUp size={14} aria-hidden />
        </a>
      </div>
    </footer>
  );
}
