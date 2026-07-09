import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ARTISTS, getArtist } from "@/lib/artists";
import Petals from "@/components/Petals";
import { useLang, LangToggle } from "@/lib/lang";
import { InstagramTrigger } from "@/components/InstagramModal";

export const Route = createFileRoute("/artist/$slug")({
  loader: ({ params }) => {
    const artist = getArtist(params.slug);
    if (!artist) throw notFound();
    return { artist };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.artist.name} — Zahoor Al Banafssaj` },
          { name: "description", content: `${loaderData.artist.name}, ${loaderData.artist.role}. Speciality: ${loaderData.artist.speciality}.` },
        ]
      : [],
  }),
  component: ArtistPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen grid place-items-center text-center p-10">
        <div>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <button onClick={() => { reset(); router.invalidate(); }} className="rounded-full bg-primary px-6 py-2 text-primary-foreground">Retry</button>
        </div>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-center p-10">
      <div>
        <h1 className="font-display text-4xl mb-4">Artist not found</h1>
        <Link to="/" className="text-primary underline">Back home</Link>
      </div>
    </div>
  ),
});

type Review = { id: string; name: string; rating: number; text: string; date: string };

function storageKey(slug: string) {
  return `zab-reviews:${slug}`;
}

function loadReviews(slug: string): Review[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    return raw ? (JSON.parse(raw) as Review[]) : [];
  } catch {
    return [];
  }
}

function saveReviews(slug: string, reviews: Review[]) {
  window.localStorage.setItem(storageKey(slug), JSON.stringify(reviews));
}

function Stars({ value, onChange, size = "text-2xl" }: { value: number; onChange?: (n: number) => void; size?: string }) {
  return (
    <div className={`flex gap-1 ${size}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          disabled={!onChange}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={`${onChange ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform ${
            n <= value ? "text-primary" : "text-muted-foreground/40"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ArtistPage() {
  const { artist } = Route.useLoaderData();
  const { isAr, t } = useLang();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setReviews(loadReviews(artist.slug));
  }, [artist.slug]);

  const avg = reviews.length
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : 0;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !text.trim() || rating < 1) return;
    const next: Review[] = [
      {
        id: crypto.randomUUID(),
        name: name.trim().slice(0, 60),
        text: text.trim().slice(0, 600),
        rating,
        date: new Date().toISOString(),
      },
      ...reviews,
    ];
    setReviews(next);
    saveReviews(artist.slug, next);
    setName("");
    setText("");
    setRating(0);
  }

  function deleteReview(id: string) {
    const next = reviews.filter((r) => r.id !== id);
    setReviews(next);
    saveReviews(artist.slug, next);
  }

  const router = useRouter();
  const displayName = isAr ? artist.nameAr : artist.name;
  const displayRole = isAr ? artist.roleAr : artist.role;
  const displaySpec = isAr ? artist.specialityAr : artist.speciality;
  const displayBio = isAr ? artist.bioAr : artist.bio;

  return (
    <div className="relative min-h-screen text-foreground" dir={isAr ? "rtl" : "ltr"}>
      <Petals />
      <header className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-4 sm:py-8 flex items-center justify-between gap-2 sm:gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => router.history.back()}
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-card/40 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm backdrop-blur-md hover:bg-primary hover:text-primary-foreground transition-all"
        >
          {isAr ? "→ رجوع" : "← Go back"}
        </button>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <LangToggle />
          <InstagramTrigger className="rounded-full border border-primary/40 bg-card/40 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm backdrop-blur-md hover:bg-primary hover:text-primary-foreground transition-all">
            <span className="hidden sm:inline">{t("Instagram", "إنستغرام")}</span>
            <span className="sm:hidden">IG</span>
          </InstagramTrigger>
          <Link to="/" className="rounded-full border border-primary/40 bg-card/40 px-2.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm backdrop-blur-md hover:bg-primary hover:text-primary-foreground transition-all">{t("Home", "الرئيسية")}</Link>
        </div>
      </header>


      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-12">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-[2.5rem] border border-primary/30 shadow-[var(--shadow-rose)] bg-black">
              <img src={artist.img} alt={displayName} width={800} height={1000} className="w-full h-[480px] object-contain" />
            </div>
          </div>
          <div className="md:col-span-7 space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-primary">— {displayRole}</p>
            <h1 className="font-display text-5xl md:text-6xl">{displayName}</h1>
            <div className="glass-card rounded-2xl p-5 inline-flex flex-wrap items-center gap-4">
              <Stars value={Math.round(avg)} size="text-xl" />
              <span className="font-display text-2xl text-gradient-rose">{avg.toFixed(1)}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {reviews.length} {t(reviews.length === 1 ? "review" : "reviews", "تقييم")}
              </span>
            </div>
            <p className="text-sm uppercase tracking-widest text-accent">{t("Speciality", "التخصص")}</p>
            <p className="text-lg">{displaySpec}</p>
            <p className="text-muted-foreground leading-relaxed max-w-xl">{displayBio}</p>
          </div>
        </div>
      </section>




      {/* REVIEWS */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">— {t("Reviews", "التقييمات")}</p>
        <h2 className="font-display text-4xl md:text-5xl mb-8">
          {t(`Rate ${artist.name.split(" ")[0]}`, `قيّمي ${artist.nameAr.split(" ")[0]}`)}
        </h2>

        <form onSubmit={submit} className="glass-card rounded-3xl p-6 md:p-8 space-y-5 mb-10">
          <div className="flex items-center gap-4">
            <span className="text-sm uppercase tracking-widest text-muted-foreground">{t("Your rating", "تقييمك")}</span>
            <Stars value={rating} onChange={setRating} />
          </div>
          <input
            type="text"
            required
            maxLength={60}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("Your name", "اسمك")}
            className="w-full rounded-full bg-card/60 border border-primary/30 px-5 py-3 text-sm focus:outline-none focus:border-primary backdrop-blur-md"
          />
          <textarea
            required
            maxLength={600}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("Share your experience…", "شاركينا تجربتك…")}
            rows={4}
            className="w-full rounded-2xl bg-card/60 border border-primary/30 px-5 py-3 text-sm focus:outline-none focus:border-primary backdrop-blur-md resize-none"
          />
          <button
            type="submit"
            disabled={rating < 1 || !name.trim() || !text.trim()}
            className="rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-rose)] hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {t("Submit review", "إرسال التقييم")}
          </button>
        </form>

        {reviews.length === 0 ? (
          <p className="text-muted-foreground italic">
            {t("No reviews yet — be the first to share your experience.", "لا توجد تقييمات بعد — كوني أول من يشاركنا تجربتها.")}
          </p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li key={r.id} className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <p className="font-display text-lg">{r.name}</p>
                    <Stars value={r.rating} size="text-base" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {new Date(r.date).toLocaleDateString(isAr ? "ar" : "en")}
                  </p>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">{r.text}</p>
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => deleteReview(r.id)}
                    className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t("Delete review", "حذف التقييم")}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* OTHER ARTISTS */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">— {t("Meet the rest", "تعرّفي على البقية")}</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ARTISTS.filter((a) => a.slug !== artist.slug).map((a) => (
            <Link key={a.slug} to="/artist/$slug" params={{ slug: a.slug }} className="group">
              <div className="overflow-hidden rounded-2xl border border-primary/20 aspect-[3/4] bg-black">
                <img src={a.img} alt={a.name} loading="lazy" width={300} height={400} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
              </div>
              <p className="font-display text-sm mt-2">{isAr ? a.nameAr : a.name}</p>
              <p className="text-xs text-muted-foreground">{isAr ? a.roleAr : a.role}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
