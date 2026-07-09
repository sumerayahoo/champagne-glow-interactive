import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import Petals from "@/components/Petals";
import logoAsset from "@/assets/zahoor-logo.png.asset.json";
import priceHenna from "@/assets/prices/price-henna.png.asset.json";
import priceHair from "@/assets/prices/price-hair.png.asset.json";
import priceMakeup from "@/assets/prices/price-makeup.png.asset.json";
import priceNails from "@/assets/prices/price-nails.png.asset.json";
import priceFacial from "@/assets/prices/price-facial.png.asset.json";
import priceBridal from "@/assets/prices/price-bridal.png.asset.json";
import { useLang, LangToggle } from "@/lib/lang";
import { InstagramTrigger } from "@/components/InstagramModal";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Prices — Zahoor Al Banafssaj" },
      {
        name: "description",
        content:
          "Full price list — henna, hair makeovers, makeup, manicure & pedicure, facial, threading, waxing and bridal works. Prices in Omani Rial.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { isAr, t } = useLang();
  const { hash } = useLocation();

  const cards = [
    { key: "henna", src: priceHenna.url, en: "Henna", ar: "الحناء" },
    { key: "hair-makeover", src: priceHair.url, en: "Hair Makeovers", ar: "تجديد الشعر" },
    { key: "makeup", src: priceMakeup.url, en: "Makeup", ar: "المكياج" },
    { key: "manicure-pedicure", src: priceNails.url, en: "Manicure & Pedicure", ar: "مانيكير وباديكير" },
    { key: "facial", src: priceFacial.url, en: "Facial, Threading & Waxing", ar: "العناية بالوجه والخيط والشمع" },
    { key: "bridal-works", src: priceBridal.url, en: "Bridal Works", ar: "أعمال العرائس" },
  ];

  const activeKey = (hash || "").replace(/^#/, "");
  const visible = cards.some((c) => c.key === activeKey)
    ? cards.filter((c) => c.key === activeKey)
    : cards;

  return (
    <div className="relative min-h-screen text-foreground" dir={isAr ? "rtl" : "ltr"}>
      <Petals />

      <header className="relative z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-6">
          <Link to="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img
              src={logoAsset.url}
              alt="Zahoor Al Banafssaj"
              className="h-9 w-9 sm:h-12 sm:w-12 shrink-0 rounded-full object-cover shadow-[var(--shadow-rose)]"
            />
            <span className="font-display text-sm sm:text-xl tracking-wide truncate">
              <span className="hidden sm:inline">Zahoor Al Banafssaj</span>
              <span className="sm:hidden">Zahoor</span>
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <LangToggle />
            <InstagramTrigger className="rounded-full border border-primary/40 bg-card/40 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm backdrop-blur-md hover:bg-primary hover:text-primary-foreground transition-all">
              <span className="hidden sm:inline">{t("Instagram", "إنستغرام")}</span>
              <span className="sm:hidden">IG</span>
            </InstagramTrigger>
            <Link
              to="/"
              className="rounded-full border border-primary/40 bg-card/40 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm backdrop-blur-md hover:bg-primary hover:text-primary-foreground transition-all"
            >
              {isAr ? "← رجوع" : "← Return"}
            </Link>
          </div>

        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pb-24">
        <div className="text-center space-y-4 mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-primary">
            — {t("Services & Prices", "الخدمات والأسعار")}
          </p>
          <h1 className="font-display text-5xl md:text-6xl">
            {t("The price list.", "قائمة الأسعار.")}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t(
              "All prices in Omani Rial (OMR). Bridal & custom work is quoted on consultation.",
              "جميع الأسعار بالريال العماني. أعمال العرائس والأعمال المخصصة تُسعّر بعد الاستشارة."
            )}
          </p>
        </div>

        <div className={`grid gap-4 sm:gap-6 ${visible.length === 1 ? "grid-cols-1 max-w-3xl mx-auto" : "grid-cols-1 md:grid-cols-2"}`}>
          {visible.map((c) => (
            <div key={c.key} className="glass-card rounded-2xl sm:rounded-3xl p-2 sm:p-3 overflow-hidden">
              <img
                src={c.src}
                alt={isAr ? c.ar : c.en}
                loading="lazy"
                className="w-full h-auto rounded-xl sm:rounded-2xl block"
              />
            </div>
          ))}
        </div>

        {visible.length === 1 && (
          <div className="text-center mt-8">
            <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card/40 px-5 py-2.5 text-sm hover:bg-primary hover:text-primary-foreground transition-all">
              {t("View all prices", "عرض كل الأسعار")} <span>{isAr ? "←" : "→"}</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
