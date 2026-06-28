import { useMemo } from "react";

const PETAL_COUNT = 18;

export default function Petals() {
  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }).map((_, i) => ({
        left: Math.random() * 100,
        size: 14 + Math.random() * 28,
        duration: 14 + Math.random() * 18,
        delay: -Math.random() * 20,
        hue: Math.random() > 0.5 ? "var(--rose-gold)" : "var(--blush)",
        opacity: 0.25 + Math.random() * 0.35,
        key: i,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-[5]">
      {petals.map((p) => (
        <svg
          key={p.key}
          className="petal absolute"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
          viewBox="0 0 100 100"
        >
          <path
            d="M50 5 C 75 20, 90 50, 50 95 C 10 50, 25 20, 50 5 Z"
            fill={p.hue}
            opacity="0.55"
          />
          <path
            d="M50 5 C 75 20, 90 50, 50 95 C 10 50, 25 20, 50 5 Z"
            fill="none"
            stroke="var(--champagne)"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      ))}
    </div>
  );
}
