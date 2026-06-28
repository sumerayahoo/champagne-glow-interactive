import { useState } from "react";
import { useLang } from "@/lib/lang";

// Glob-import all work asset JSONs
const modules = import.meta.glob("@/assets/work/*.asset.json", { eager: true }) as Record<
  string,
  { default: { url: string; original_filename: string } }
>;

const WORKS = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, m]) => m.default.url);

export default function WorkGallery() {
  const { t } = useLang();
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {WORKS.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(src)}
            className="group relative overflow-hidden rounded-2xl border border-primary/15 bg-card/30 aspect-[3/4]"
          >
            <img
              src={src}
              alt={`Work ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] grid place-items-center bg-background/90 backdrop-blur-md p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label={t("Close", "إغلاق")}
            onClick={() => setActive(null)}
            className="absolute top-5 right-5 grid h-10 w-10 place-items-center rounded-full border border-primary/40 bg-card/50 hover:bg-primary hover:text-primary-foreground"
          >
            ✕
          </button>
          <img
            src={active}
            alt="Work detail"
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-2xl shadow-[var(--shadow-rose)]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
