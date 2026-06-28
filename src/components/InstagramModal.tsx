import { useEffect, useState, type ReactNode } from "react";
import qrAsset from "@/assets/instagram-qr.jpeg.asset.json";
import { useLang } from "@/lib/lang";

export function useInstagramModal() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}

export function InstagramTrigger({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <InstagramModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export function InstagramModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] grid place-items-center bg-background/85 backdrop-blur-md p-6 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full glass-card rounded-3xl p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 end-3 grid h-9 w-9 place-items-center rounded-full border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          ✕
        </button>
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">
          {t("Scan to follow", "امسحي للمتابعة")}
        </p>
        <h3 className="font-display text-2xl mb-4">@zahoor_al_banafssaj_beauty</h3>
        <div className="overflow-hidden rounded-2xl border border-primary/30 bg-white">
          <img
            src={qrAsset.url}
            alt="Instagram QR code for Zahoor Al Banafssaj Beauty"
            className="w-full h-auto block"
          />
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          {t(
            "Open your camera and scan the code, or search the handle on Instagram.",
            "افتحي الكاميرا وامسحي الرمز، أو ابحثي عن الحساب في إنستغرام."
          )}
        </p>
      </div>
    </div>
  );
}
