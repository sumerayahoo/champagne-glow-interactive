import { useEffect, useState, type ReactNode } from "react";
import offersAsset from "@/assets/offers-june.jpeg.asset.json";
import { useLang } from "@/lib/lang";

export function OffersTrigger({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] grid place-items-center bg-background/85 backdrop-blur-md p-6 animate-in fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative max-w-lg w-full glass-card rounded-3xl p-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 end-3 z-10 grid h-9 w-9 place-items-center rounded-full border border-primary/30 bg-background/70 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              ✕
            </button>
            <img
              src={offersAsset.url}
              alt={t("June exclusive offers", "عروض شهر يونيو الحصرية")}
              className="w-full h-auto rounded-2xl block"
            />
            <p className="mt-3 text-xs text-muted-foreground">
              {t("Call +968 77415629 to claim an offer.", "اتصلي على ‎+968 77415629 للحصول على العرض.")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
