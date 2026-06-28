import { useEffect, useRef, useState } from "react";
import founderAsset from "@/assets/founder.jpeg.asset.json";

export default function ScrollMirror() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when section is fully below the viewport, 1 when fully scrolled past center
      const raw = 1 - (rect.top - vh * 0.15) / (vh * 0.75);
      setProgress(Math.max(0, Math.min(1, raw)));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Two curtain leaves rotate open in 3D as progress grows
  const openDeg = progress * 95; // 0 -> 95deg

  return (
    <section ref={ref} className="relative z-10 mx-auto max-w-5xl px-6 py-28">
      <div className="text-center mb-10 space-y-3">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">— The mirror</p>
        <h2 className="font-display text-5xl md:text-6xl">
          A reflection of the <em className="italic text-gradient-rose">founder</em>.
        </h2>
        <p className="text-sm text-muted-foreground max-w-lg mx-auto">
          Keep scrolling — the mirror opens.
        </p>
      </div>

      <div
        className="relative mx-auto"
        style={{ perspective: "1600px", width: "min(420px, 88vw)" }}
      >
        {/* Ornate frame */}
        <div className="relative aspect-[3/4] rounded-[3rem] p-3 bg-gradient-to-br from-primary/70 via-accent/50 to-primary/70 shadow-[var(--shadow-rose)]">
          <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden bg-background">
            {/* Photo inside */}
            <img
              src={founderAsset.url}
              alt="Founder of Zahoor Al Banafssaj"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                transform: `scale(${0.95 + progress * 0.1})`,
                opacity: 0.4 + progress * 0.6,
                transition: "transform 0.1s linear, opacity 0.1s linear",
              }}
            />
            {/* Gold inner ring glow */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] ring-1 ring-primary/40" />

            {/* Two doors / mirror leaves that open */}
            <div
              className="absolute inset-y-0 left-0 w-1/2 origin-left"
              style={{
                transform: `rotateY(-${openDeg}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.1s linear",
                background:
                  "linear-gradient(120deg, var(--card) 0%, color-mix(in oklab, var(--primary) 35%, transparent) 50%, var(--card) 100%)",
                boxShadow: "inset -10px 0 30px rgba(0,0,0,0.4)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="absolute inset-y-2 right-1 w-px bg-primary/40" />
              <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_30%_30%,white,transparent_60%)]" />
            </div>
            <div
              className="absolute inset-y-0 right-0 w-1/2 origin-right"
              style={{
                transform: `rotateY(${openDeg}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.1s linear",
                background:
                  "linear-gradient(240deg, var(--card) 0%, color-mix(in oklab, var(--accent) 35%, transparent) 50%, var(--card) 100%)",
                boxShadow: "inset 10px 0 30px rgba(0,0,0,0.4)",
                backfaceVisibility: "hidden",
              }}
            >
              <div className="absolute inset-y-2 left-1 w-px bg-primary/40" />
              <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_70%_30%,white,transparent_60%)]" />
            </div>
          </div>
        </div>
        {/* Glow under mirror */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-6 h-10 w-3/4 rounded-full blur-2xl"
          style={{
            background: "color-mix(in oklab, var(--primary) 50%, transparent)",
            opacity: 0.4 + progress * 0.5,
          }}
        />
      </div>
    </section>
  );
}
