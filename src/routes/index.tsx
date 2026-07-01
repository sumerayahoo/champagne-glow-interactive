import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import heroModel from "@/assets/hero-model.jpg";
import service1 from "@/assets/service-1.jpg";
import service2 from "@/assets/service-2.jpg";
import service3 from "@/assets/service-3.jpg";
import about from "@/assets/about.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import maisonAsset from "@/assets/maison-interior.jpg.asset.json";
import offersPreview from "@/assets/offers-june.jpeg.asset.json";
import Petals from "@/components/Petals";
import logoAsset from "@/assets/zahoor-logo.png.asset.json";
import ScrollVelocityGallery from "@/components/ScrollVelocityGallery";
import diary1 from "@/assets/diary/glimpses.jpg.asset.json";
import diary2 from "@/assets/diary/glimpses1.jpg.asset.json";
import diary3 from "@/assets/diary/glimpses2.jpg.asset.json";
import diary4 from "@/assets/diary/glimpses3.jpg.asset.json";
import diary5 from "@/assets/diary/glimpses4.jpg.asset.json";
import diary6 from "@/assets/diary/glimpses6.jpg.asset.json";
import diary7 from "@/assets/diary/glimpses7.jpg.asset.json";
import diary8 from "@/assets/diary/glimpses8.jpg.asset.json";
import ScrollMirror from "@/components/ScrollMirror";
import HeroCarousel from "@/components/HeroCarousel";
import WorkGallery from "@/components/WorkGallery";
import { ARTISTS } from "@/lib/artists";
import { useLang, LangToggle } from "@/lib/lang";
import { InstagramTrigger } from "@/components/InstagramModal";
import { OffersTrigger } from "@/components/OffersModal";

const Scene3D = lazy(() => import("@/components/Scene3D"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zahoor Al Banafssaj — Champagne & Rose Gold Beauty Atelier" },
      { name: "description", content: "An interactive luxury beauty atelier. Hair, makeup & nail artistry in a dark, feminine, champagne rose-gold world." },
      { property: "og:title", content: "Zahoor Al Banafssaj — Beauty Atelier" },
      { property: "og:description", content: "Dark, feminine luxury. Interactive beauty experience." },
    ],
  }),
  component: Index,
});

const services = [
  { key: "henna", img: service1, en: "Henna", ar: "الحناء", enDesc: "Bridal and occasion mehendi, hand-drawn with natural henna.", arDesc: "حناء العرائس والمناسبات، مرسومة يدويًا بالحناء الطبيعية." },
  { key: "hair-makeover", img: team2, en: "Hair Makeovers", ar: "تجديد الشعر", enDesc: "Cuts, colour, treatments and styling — sculpted to your features.", arDesc: "قصات وصبغة وعلاجات وتصفيف — منحوتة لتناسب ملامحك." },
  { key: "bridal-works", img: team1, en: "Bridal Works", ar: "أعمال العرائس", enDesc: "Full bridal day rituals — hair, makeup, henna, finishing touches.", arDesc: "طقوس يوم العرس الكاملة — شعر ومكياج وحناء ولمسات نهائية." },
  { key: "makeup", img: service2, en: "Makeup", ar: "المكياج", enDesc: "Editorial-grade glam for weddings, runway and red-carpet moments.", arDesc: "مكياج راقٍ للأعراس والعروض ولحظات السجادة الحمراء." },
  { key: "facial", img: about, en: "Facial, Threading & Waxing", ar: "العناية بالوجه والخيط والشمع", enDesc: "Facials, brow shaping and full body waxing in a private suite.", arDesc: "فيشل وتشذيب حواجب وإزالة شعر الجسم في جناح خاص." },
  { key: "manicure-pedicure", img: service3, en: "Manicure & Pedicure", ar: "مانيكير وباديكير", enDesc: "Chrome, gel and hand-painted nail artistry with metallic finishes.", arDesc: "فن الأظافر بالكروم والجل والرسم اليدوي بلمسات معدنية." },
];

const gallery = [team1, service1, service2, team2, service3, heroModel];

function Index() {
  const { isAr, t } = useLang();

  return (
    <div className="relative min-h-screen text-foreground" dir={isAr ? "rtl" : "ltr"}>
      <Suspense fallback={null}><Scene3D /></Suspense>
      <Petals />

      {/* NAV — overlay bar over hero carousel (Mukadam-style) */}
      <header className="relative z-20">
        <div className="bg-background/85 backdrop-blur-md border-b border-primary/15">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="#" className="flex items-center gap-3">
              <img src={logoAsset.url} alt="Zahoor Al Banafssaj" width={56} height={56} className="h-14 w-14 rounded-full object-cover shadow-[var(--shadow-rose)]" />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-xl md:text-2xl tracking-wide">Zahoor Al Banafssaj</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary">{t("Beauty Maison", "صالون الجمال")}</span>
              </span>
            </a>
            <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
              {[
                { en: "Home", ar: "الرئيسية", id: "home" },
                { en: "Services", ar: "الخدمات", id: "services" },
                { en: "Offers", ar: "العروض", id: "offers" },
                { en: "Atelier", ar: "الفريق", id: "atelier" },
                { en: "Our Work", ar: "أعمالنا", id: "work" },
                { en: "Contact", ar: "تواصل", id: "contact" },
              ].map(l => (
                <li key={l.id}><a href={`#${l.id}`} className="hover:text-primary transition-colors">{isAr ? l.ar : l.en}</a></li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              <LangToggle />
              <InstagramTrigger className="rounded-full border border-primary/40 bg-card/40 px-5 py-2 text-sm backdrop-blur-md hover:bg-primary hover:text-primary-foreground transition-all">
                {t("Instagram", "إنستغرام")}
              </InstagramTrigger>
            </div>
          </nav>
        </div>
      </header>

      {/* HERO CAROUSEL */}
      <section id="home" className="relative z-10">
        <HeroCarousel alt={t("Zahoor Al Banafssaj salon", "صالون زهور البنفسج")} />
      </section>

      {/* INTRO + Girl photo with follow button */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-24">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-8">
            <p className="text-xs uppercase tracking-[0.3em] text-primary shimmer">— {t("Zahoor Al Banafssaj · Maison de Beauté", "زهور البنفسج · صالون الجمال")}</p>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95]">
              {isAr ? (
                <>قوة <em className="italic text-gradient-rose">ناعمة،</em><br/>مذهّبة بضوء<br/><span className="text-gradient-rose">الذهب الوردي</span>.</>
              ) : (
                <>Soft <em className="italic text-gradient-rose">power,</em><br/>gilded in <span className="text-gradient-rose">rose</span><br/>gold light.</>
              )}
            </h1>
            <p className="max-w-md text-base text-muted-foreground leading-relaxed">
              {t(
                "Zahoor Al Banafssaj is a dark, intimate atelier where hair, makeup and nail artistry are crafted with the patience of a couture house — and the glow of champagne.",
                "زهور البنفسج صالون هادئ وحميم تُصنع فيه فنون الشعر والمكياج والأظافر بصبر دار أزياء راقية وبريق الشمبانيا."
              )}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#services" className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-rose)] hover:scale-[1.02] transition-transform">
                {t("Discover the rituals", "اكتشفي الجلسات")}
                <span className="transition-transform group-hover:translate-x-1">{isAr ? "←" : "→"}</span>
              </a>
              <a href="tel:+96877415629" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-primary/40">☎</span>
                +968 77415629
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary/15 max-w-md">
              {[
                { n: "12+", en: "Years", ar: "سنوات" },
                { n: "80", en: "Brides /yr", ar: "عروسة/سنة" },
                { n: "7", en: "Artisans", ar: "فنانات" },
              ].map((s) => (
                <div key={s.en}>
                  <div className="font-display text-3xl text-gradient-rose">{s.n}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{isAr ? s.ar : s.en}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-primary/30 via-transparent to-accent/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[3rem] border border-primary/30 shadow-[var(--shadow-rose)]">
              <img src={heroModel} alt="Beauty model with rose gold makeup" width={800} height={1024} className="w-full h-[560px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <InstagramTrigger className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl p-4 flex items-center justify-between hover:border-primary/60 transition-colors text-start">
                <span className="block">
                  <span className="block text-xs uppercase tracking-widest text-primary">{t("Follow on Instagram", "تابعينا على إنستغرام")}</span>
                  <span className="block font-display text-lg">@zahoor_al_banafssaj_beauty</span>
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">↗</span>
              </InstagramTrigger>
            </div>
          </div>
        </div>
      </section>


      {/* SERVICES */}
      <section id="services" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">— {t("Our rituals", "جلساتنا")}</p>
            <h2 className="font-display text-5xl md:text-6xl max-w-xl">{t("A quiet ceremony for every gesture.", "طقس هادئ لكل لمسة.")}</h2>
          </div>
          <p className="max-w-sm text-muted-foreground">{t("Each service is a slow, intentional ritual — never rushed, always tailored to your features and mood.", "كل خدمة طقس بطيء ومتأنٍّ — بلا استعجال، ومصمم لملامحك ومزاجك.")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <article key={s.key} className="group relative overflow-hidden rounded-3xl glass-card hover:border-primary/60 transition-all">
              <div className="overflow-hidden">
                <img src={s.img} alt={isAr ? s.ar : s.en} loading="lazy" width={600} height={600} className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6 space-y-3">
                <span className="text-xs uppercase tracking-widest text-accent">0{i + 1} / {t("Atelier", "الصالون")}</span>
                <h3 className="font-display text-2xl">{isAr ? s.ar : s.en}</h3>
                <p className="text-sm text-muted-foreground">{isAr ? s.arDesc : s.enDesc}</p>
                <Link to="/services" hash={s.key} className="inline-flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
                  {t("View prices", "عرض الأسعار")} <span>{isAr ? "←" : "→"}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* OFFERS */}
      <section id="offers" className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="glass-card rounded-[2.5rem] p-10 md:p-14 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-primary shimmer">— {t("Exclusive offers", "عروض حصرية")}</p>
            <h2 className="font-display text-4xl md:text-5xl">
              {isAr ? (<>عروض هذا الشهر <em className="italic text-gradient-rose">المختارة بعناية</em>.</>) : (<>This month's <em className="italic text-gradient-rose">curated</em> offers.</>)}
            </h2>
            <p className="text-muted-foreground max-w-md">
              {t(
                "Limited-time packages on facials, nails, hair treatments and bridal bundles. Tap to view the full offer card.",
                "باقات لفترة محدودة على الفيشل والأظافر وعلاجات الشعر وحزم العرائس. اضغطي لعرض بطاقة العروض كاملة."
              )}
            </p>
            <OffersTrigger className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-[var(--shadow-rose)] hover:scale-[1.02] transition-transform">
              {t("View our offers", "عرض عروضنا")} <span>{isAr ? "←" : "→"}</span>
            </OffersTrigger>
          </div>
          <div className="md:col-span-5">
            <OffersTrigger className="block w-full overflow-hidden rounded-[2rem] border border-primary/30 shadow-[var(--shadow-rose)] hover:scale-[1.02] transition-transform">
              <img src={offersPreview.url} alt={t("June exclusive offers", "عروض شهر يونيو الحصرية")} className="w-full h-auto block" />
            </OffersTrigger>
          </div>
        </div>
      </section>


      {/* TEAM */}
      <section id="atelier" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="glass-card rounded-[2.5rem] p-10 md:p-16">
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs uppercase tracking-[0.3em] text-primary">— {t("Our artisans", "فنانات الصالون")}</p>
              <h2 className="font-display text-5xl md:text-6xl">{t("Hands that shape the light.", "أيادٍ تشكّل الضوء.")}</h2>
            </div>
            <p className="lg:col-span-5 text-muted-foreground">{t("Seven artisans, each with a signature speciality. Tap a face to see their portfolio and leave a review.", "سبع فنانات لكل واحدة تخصصها المميز. اضغطي على الصورة لمشاهدة أعمالها وكتابة تقييمك.")}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {ARTISTS.map((m) => (
              <Link key={m.slug} to="/artist/$slug" params={{ slug: m.slug }} className="group">
                <figure>
                  <div className="relative overflow-hidden rounded-[2rem] aspect-[3/4] border border-primary/20 bg-black">
                    <img src={m.img} alt={m.name} loading="lazy" width={512} height={768} className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent pointer-events-none" />
                    <figcaption className="absolute bottom-5 left-5 right-5 space-y-1">
                      <p className="font-display text-xl">{isAr ? m.nameAr : m.name}</p>
                      <p className="text-xs uppercase tracking-widest text-primary">{isAr ? m.roleAr : m.role}</p>
                      <p className="text-xs text-muted-foreground leading-snug pt-1">{isAr ? m.specialityAr : m.speciality}</p>
                      <p className="text-xs text-accent pt-2 group-hover:gap-3 inline-flex items-center gap-2 transition-all">
                        {t("View portfolio", "عرض الأعمال")} {isAr ? "←" : "→"}
                      </p>
                    </figcaption>
                  </div>
                </figure>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-6 mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">— {t("Carnet", "اليوميات")}</p>
          <h2 className="font-display text-5xl md:text-6xl">
            {isAr ? (<>يوميات من <em className="italic text-gradient-rose">الإشراق</em>.</>) : (<>A diary of <em className="italic text-gradient-rose">glow</em>.</>)}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">{t("Scroll to feel the velocity — the diary drifts with your motion.", "مرّري لتشعري بالحركة — تتحرك الصور مع تمريرك.")}</p>
        </div>
        <ScrollVelocityGallery images={gallery} />
      </section>

      {/* ABOUT */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-accent/30 to-primary/20 blur-2xl" />
            <img src={maisonAsset.url} alt="Zahoor Al Banafssaj atelier interior" loading="lazy" width={700} height={800} className="relative w-full rounded-[3rem] border border-primary/30 shadow-[var(--shadow-rose)] object-cover" />
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">— {t("Our maison", "صالوننا")}</p>
            <h2 className="font-display text-5xl md:text-6xl">
              {isAr ? (<>صالون منحوت من <em className="italic text-gradient-rose">منتصف الليل</em> والشمبانيا.</>) : (<>An atelier carved out of <em className="italic text-gradient-rose">midnight</em> and champagne.</>)}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              {t(
                "Zahoor Al Banafssaj is the opposite of the bright, hurried salon. Deep rosewood walls, brass-framed mirrors, and every appointment begins with a quiet moment.",
                "زهور البنفسج هو العكس تمامًا للصالون السريع والمزدحم. جدران من خشب الورد الداكن ومرايا بإطارات نحاسية، وكل موعد يبدأ بلحظة هدوء."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* OUR WORK */}
      <section id="work" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">— {t("View our work", "شاهدي أعمالنا")}</p>
            <h2 className="font-display text-5xl md:text-6xl max-w-2xl">
              {isAr ? (<>لمحات من <em className="italic text-gradient-rose">صالوننا</em>.</>) : (<>Glimpses from the <em className="italic text-gradient-rose">atelier</em>.</>)}
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">{t("A curated archive of brides, henna, hair and nail work. Tap any image to view it in full.", "أرشيف منتقى لأعمال العرائس والحناء والشعر والأظافر. اضغطي على أي صورة لعرضها بالكامل.")}</p>
        </div>
        <WorkGallery />
      </section>


      {/* WORDS ON VELVET */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="glass-card rounded-[2.5rem] p-10 md:p-16 space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary text-center">— {t("Words on velvet", "كلمات على المخمل")}</p>
          <div className="max-w-3xl mx-auto space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
            {isAr ? (
              <>
                <p>في صالوننا، كل خدمة تُقدَّم بشغف وتفانٍ واهتمام بالتفاصيل. فناناتنا الموهوبات يقضين سنوات في إتقان مهنتهن وصقل مهاراتهن باستمرار لمواكبة أحدث الصيحات والتقنيات.</p>
                <p>ندرك أن كل عميلة فريدة من نوعها، لذلك نأخذ وقتنا للاستماع إليك وفهم تفضيلاتك وابتكار نتائج مصممة خصيصًا لك. من الاستشارة الأولى وحتى اللمسة الأخيرة، يعمل فريقنا بدقة وإبداع وعناية لضمان تجربة استثنائية.</p>
                <p>رضاك هو أولويتنا القصوى. نحن ملتزمات بتقديم أعلى مستويات الخدمة ونسعى لتجاوز توقعاتك في كل موعد. عند اختيارنا، فإنك تختارين محترفات يهتممن فعلاً بتقديم نتائج جميلة تمنحك الثقة.</p>
              </>
            ) : (
              <>
                <p>At our salon, every service is delivered with passion, dedication, and attention to detail. Our talented artists invest years in mastering their craft and continuously refining their skills to stay up to date with the latest trends and techniques.</p>
                <p>We understand that every client is unique, which is why we take the time to listen, understand your preferences, and create results tailored specifically to you. From the initial consultation to the final touch, our team works with precision, creativity, and care to ensure an exceptional experience.</p>
                <p>Your satisfaction is our top priority. We are committed to providing the highest quality service and strive to exceed expectations with every appointment. When you choose us, you're choosing professionals who genuinely care about delivering beautiful, confidence-boosting results.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 3D MIRROR */}
      <section id="contact" className="relative z-10">
        <ScrollMirror />
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-primary/15 mt-12">
        <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-4 gap-10 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={logoAsset.url} alt="Zahoor Al Banafssaj" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
              <span className="font-display text-xl">Zahoor Al Banafssaj</span>
            </div>
            <p className="text-muted-foreground">{t("A maison de beauté across the Sultanate of Oman.", "صالون جمال في أنحاء سلطنة عُمان.")}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-primary mb-3">{t("Visit", "زورينا")}</p>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <p className="text-foreground text-xs uppercase tracking-widest mb-1">{t("Al Rustaq", "الرستاق")}</p>
                {t("Al Romaniya, near ALAZM TEA, Sultanate of Oman", "الرماينة، بجانب شاي العزم، سلطنة عُمان")}
              </li>
              <li>
                <p className="text-foreground text-xs uppercase tracking-widest mb-1">{t("Falaj Al Sharah", "فلج الشراة")}</p>
                {t("Near Rawabi Village Restaurant, next to dental clinic, Sultanate of Oman", "بجانب مطعم روابي القرية، بجوار عيادة الأسنان، سلطنة عُمان")}
              </li>
              <li>
                <p className="text-foreground text-xs uppercase tracking-widest mb-1">{t("Nakhal", "نخل")}</p>
                {t("Near Rial Mart Nakhal, Sultanate of Oman", "بجانب ريال مارت نخل، سلطنة عُمان")}
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-primary mb-3">{t("Hours", "ساعات العمل")}</p>
            <p className="text-muted-foreground">{t("9 AM – 10 PM", "٩ صباحًا – ١٠ مساءً")}<br/>{t("By appointment", "بحجز مسبق")}</p>
            <p className="text-xs uppercase tracking-widest text-primary mt-5 mb-2">{t("Contact", "تواصل")}</p>
            <p className="text-muted-foreground space-y-1">
              <a href="tel:+96877415629" className="block hover:text-primary transition-colors">+968 77415629</a>
              <a href="mailto:zahooralbanafssaj@gmail.com" className="block hover:text-primary transition-colors break-all">zahooralbanafssaj@gmail.com</a>
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-primary mb-3">{t("Follow", "تابعينا")}</p>
            <InstagramTrigger className="inline-flex items-center gap-3 rounded-full border border-primary/30 px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-xs">IG</span>
              @zahoor_al_banafssaj_beauty
            </InstagramTrigger>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground pb-8">© 2026 Zahoor Al Banafssaj · {t("Crafted with care", "صُنع بعناية")}</div>
      </footer>
    </div>
  );
}
