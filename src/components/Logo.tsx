export function Logo({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Joshua Mendoza logo"
      className={className}
    >
      <rect width="48" height="48" fill="#c6ff3d" />
      <g fill="none" stroke="#0e0f0c" strokeWidth="4" strokeLinejoin="miter">
        <path d="M13 11V28a5 5 0 0 1-5 5" />
        <path d="M22 35V12l8 13 8-13v23" />
      </g>
      <rect x="40" y="40" width="8" height="8" fill="#0e0f0c" />
    </svg>
  );
}
