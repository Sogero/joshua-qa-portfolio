import { ImageResponse } from "next/og";
import { profile } from "@/data/content";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LIME = "#c6ff3d";
const INK = "#0e0f0c";
const SOFT = "#f2f1ea";
const MUTE = "#9a9b91";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: INK,
          color: SOFT,
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* JM monogram, same shapes as the site logo */}
          <svg width="88" height="88" viewBox="0 0 48 48">
            <rect width="48" height="48" fill={LIME} />
            <g fill="none" stroke={INK} strokeWidth="4" strokeLinejoin="miter">
              <path d="M13 11V28a5 5 0 0 1-5 5" />
              <path d="M22 35V12l8 13 8-13v23" />
            </g>
            <rect x="40" y="40" width="8" height="8" fill={INK} />
          </svg>
          <div style={{ display: "flex", fontSize: 26, color: MUTE, letterSpacing: 4, textTransform: "uppercase" }}>
            {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, color: LIME, letterSpacing: 6, textTransform: "uppercase" }}>
            {profile.role}
          </div>
          <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 1.02, marginTop: 18 }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", fontSize: 46, color: MUTE, marginTop: 22 }}>
            <span style={{ display: "flex" }}>I don&apos;t just find&nbsp;</span>
            <span style={{ display: "flex", color: LIME, fontStyle: "italic" }}>bugs.</span>
          </div>
        </div>

        <div style={{ display: "flex", height: 6, width: "100%", background: LIME }} />
      </div>
    ),
    { ...size },
  );
}
