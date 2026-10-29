import { profile } from "@/data/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 2_500; // people can't write a message in under a couple of seconds
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

// Best-effort limiter. Serverless instances don't share memory, so this slows down
// bursts from one visitor but the real protection against bots is Turnstile (when configured).
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  return false;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function verifyTurnstile(token: string, ip: string, secret: string) {
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) return Response.json({ error: "Message is too large." }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return Response.json({ error: "Message is too large." }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot and too-fast submissions: bots. Pretend success so they don't retry.
  if (typeof body.website === "string" && body.website.length > 0) return Response.json({ ok: true });
  if (typeof body.elapsedMs === "number" && body.elapsedMs < MIN_FILL_MS) return Response.json({ ok: true });

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 100) return Response.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email) || email.length > 200)
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (message.length < 10 || message.length > 5000)
    return Response.json({ error: "Message must be between 10 and 5000 characters." }, { status: 400 });

  // Cloudflare Turnstile — only enforced once TURNSTILE_SECRET_KEY is set.
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret) {
    const token = typeof body["cf-turnstile-response"] === "string" ? (body["cf-turnstile-response"] as string) : "";
    if (!token) return Response.json({ error: "Please complete the verification." }, { status: 400 });
    if (!(await verifyTurnstile(token, ip, turnstileSecret))) {
      return Response.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Email sending isn't configured yet.", fallback: true }, { status: 503 });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>${escapeHtml(name)}</strong> (<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>)</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return Response.json(
      { error: "Couldn't send your message. Please try again or email me directly.", fallback: true },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
