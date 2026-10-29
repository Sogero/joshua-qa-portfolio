"use client";

import { CheckCircle2, Loader2, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/content";

type Status = "idle" | "sending" | "sent" | "error";

// Cloudflare Turnstile is only active when a site key is configured.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type TurnstileApi = {
  render: (el: HTMLElement, options: { sitekey: string; theme?: "dark" | "light" | "auto" }) => string;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let turnstileLoading: Promise<void> | null = null;

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve();
  turnstileLoading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      turnstileLoading = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(script);
  });
  return turnstileLoading;
}

const field =
  "w-full border border-line bg-ink px-4 py-3 text-soft placeholder:text-mute/60 focus:border-lime focus:outline-none";

export function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const widgetRef = useRef<HTMLDivElement>(null);
  const openedAt = useRef(0);
  const sent = status === "sent";

  useEffect(() => {
    if (open) openedAt.current = Date.now();
  }, [open]);

  // Render a fresh verification widget whenever the form is shown or a submit attempt finishes
  // (tokens are single-use).
  useEffect(() => {
    if (!open || sent || !TURNSTILE_SITE_KEY) return;
    let cancelled = false;
    let widgetId: string | undefined;
    loadTurnstile()
      .then(() => {
        if (cancelled || !widgetRef.current || !window.turnstile) return;
        widgetId = window.turnstile.render(widgetRef.current, { sitekey: TURNSTILE_SITE_KEY, theme: "dark" });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (widgetId !== undefined) window.turnstile?.remove(widgetId);
    };
  }, [open, sent, attempt]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  function close() {
    onClose();
    // Reset after the dialog has closed so the success state doesn't flash.
    setTimeout(() => {
      setStatus("idle");
      setError("");
    }, 200);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = { ...Object.fromEntries(new FormData(form)), elapsedMs: Date.now() - openedAt.current };
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    } finally {
      setAttempt((n) => n + 1);
    }
  }

  return (
    <dialog
      ref={ref}
      onClose={close}
      onClick={(e) => e.target === ref.current && close()}
      aria-labelledby="contact-dialog-title"
      className="m-auto w-[min(92vw,36rem)] border border-line bg-charcoal p-0 text-soft backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <div className="p-7 md:p-9">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-lime">Contact</p>
            <h3 id="contact-dialog-title" className="mt-2 font-display text-4xl">
              Send me a message
            </h3>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close contact form"
            className="grid h-10 w-10 shrink-0 place-items-center border border-line transition-colors hover:border-lime hover:text-lime"
          >
            <X size={18} />
          </button>
        </div>

        {status === "sent" ? (
          <div className="py-10 text-center" role="status">
            <CheckCircle2 className="mx-auto text-lime" size={44} aria-hidden />
            <p className="mt-5 font-display text-3xl">Message sent</p>
            <p className="mt-2 text-mute">Thanks for reaching out. I&apos;ll reply to the email you provided.</p>
            <button
              type="button"
              onClick={close}
              className="mt-8 border border-soft/30 px-6 py-3 font-mono text-sm uppercase tracking-wider transition-colors hover:border-lime hover:text-lime"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-7 space-y-4" noValidate={false}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-mute">Name</span>
                <input name="name" required maxLength={100} autoComplete="name" className={field} placeholder="Your name" />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-mute">Email</span>
                <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} placeholder="you@company.com" />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-mute">Message</span>
              <textarea name="message" required minLength={10} maxLength={5000} rows={5} className={`${field} resize-y`} placeholder="How can I help?" />
            </label>
            {TURNSTILE_SITE_KEY && <div ref={widgetRef} className="min-h-[65px]" />}
            {/* Honeypot — hidden from people and assistive tech, bots fill it in. */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0" />

            {status === "error" && (
              <p role="alert" className="border-l-2 border-red-400 bg-red-400/10 p-3 text-sm text-red-300">
                {error}{" "}
                <a href={`mailto:${profile.email}`} className="underline">
                  Email me directly
                </a>
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex w-full items-center justify-center gap-2 bg-lime px-6 py-3.5 font-mono text-sm uppercase tracking-wider text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "sending" ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <Send size={16} aria-hidden />}
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
