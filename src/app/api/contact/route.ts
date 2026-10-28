import { profile } from "@/data/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success for bots.
  if (typeof body.website === "string" && body.website.length > 0) {
    return Response.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 100) return Response.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email) || email.length > 200)
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (message.length < 10 || message.length > 5000)
    return Response.json({ error: "Message must be between 10 and 5000 characters." }, { status: 400 });

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
    return Response.json({ error: "Couldn't send your message. Please try again or email me directly.", fallback: true }, { status: 502 });
  }

  return Response.json({ ok: true });
}
