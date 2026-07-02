import { createFileRoute, Link } from "@tanstack/react-router";
import Petals from "@/components/Petals";
import WorkGallery from "@/components/WorkGallery";
import logoAsset from "@/assets/zahoor-logo.png.asset.json";
import { useLang, LangToggle } from "@/lib/lang";
import { InstagramTrigger } from "@/components/InstagramModal";
import glimpseVideo1 from "@/assets/glimpses/video1.mp4.asset.json";
import glimpseVideo2 from "@/assets/glimpses/video2.mp4.asset.json";
import glimpseVideo3 from "@/assets/glimpses/video3.mp4.asset.json";

export const Route = createFileRoute("/works")({
  head: () => ({
    meta: [
      { title: "Our Works — Zahoor Al Banafssaj" },
      {
        name: "description",
        content:
          "A curated archive of bridal, henna, hair, makeup and nail work from Zahoor Al Banafssaj.",
      },
      { property: "og:title", content: "Our Works — Zahoor Al Banafssaj" },
      {
        property: "og:description",
        content: "Bridal, henna, hair and nail portfolio from our atelier.",
      },
    ],
  }),
  component: WorksPage,
});

function WorksPage() {
  const { isAr, t } = useLang();

  return (
    <div className="relative min-h-screen text-foreground" dir={isAr ? "rtl" : "ltr"}>
      <Petals />

      <header className="relative z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-6">
          <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img
              src={logoAsset.url}
              alt="Zahoor Al Banafssaj"
              className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-full object-cover shadow-[var(--shadow-rose)]"
            />
            <span className="font-display text-base sm:text-xl tracking-wide truncate">
              Zahoor Al Banafssaj
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LangToggle />
            <InstagramTrigger className="rounded-full border border-primary/40 bg-card/40 px-3 sm:px-4 py-2 text-xs sm:text-sm backdrop-blur-md hover:bg-primary hover:text-primary-foreground transition-all">
              <span className="hidden sm:inline">{t("Instagram", "إنستغرام")}</span>
              <span className="sm:hidden">IG</span>
            </InstagramTrigger>
            <Link to="/" className="hidden sm:inline text-sm text-muted-foreground hover:text-primary">
              {isAr ? "العودة →" : "← Return"}
            </Link>
          </div>
        </nav>

      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="text-center space-y-4 mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">
            — {t("Our Works", "أعمالنا")}
          </p>
          <h1 className="font-display text-5xl md:text-6xl">
            {t("The portfolio.", "معرض الأعمال.")}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t(
              "A curated archive of brides, henna, hair and nail work. Tap any image to view it in full.",
              "أرشيف منتقى لأعمال العرائس والحناء والشعر والأظافر. اضغطي على أي صورة لعرضها بالكامل."
            )}
          </p>
        </div>

        <WorkGallery />
      </main>
    </div>
  );
}
