import { useEffect, useState } from "react";
import salon1 from "@/assets/salon-1.jpg.asset.json";
import salon2 from "@/assets/salon-2.jpg.asset.json";
import salon3 from "@/assets/salon-3.jpg.asset.json";

const SLIDES = [salon1.url, salon2.url, salon3.url];

export default function HeroCarousel({ alt = "Zahoor Al Banafssaj salon" }: { alt?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 4500);
    return () => clearInterval(id);
  }, []);

  const prev = () => setI((v) => (v - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setI((v) => (v + 1) % SLIDES.length);

  return (
    <div className="relative w-full h-[68vh] min-h-[480px] overflow-hidden">
      {SLIDES.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40 pointer-events-none" />

      <button
        type="button"
        onClick={prev}
        aria-label="Previous"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 grid h-12 w-12 place-items-center rounded-md bg-background/40 text-foreground backdrop-blur hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 grid h-12 w-12 place-items-center rounded-md bg-background/40 text-foreground backdrop-blur hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-3 bg-foreground/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
