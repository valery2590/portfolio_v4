export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <path d="M9 14 C15 14 14 6 19 6 M9 14 C15 14 14 22 19 22" stroke="var(--wire)" strokeWidth="1.6" fill="none" />
      <circle cx="5" cy="14" r="4" fill="var(--ink)" />
      <circle cx="23" cy="6" r="4" fill="var(--accent)" />
      <circle cx="23" cy="22" r="4" fill="var(--signal)" />
    </svg>
  );
}
