import ayeshaAsset from "@/assets/artist-ayesha.png.asset.json";
import aksaAsset from "@/assets/artist-aksa.png.asset.json";
import sarangAsset from "@/assets/artist-sarang.png.asset.json";
import rebinaAsset from "@/assets/artist-rebina.png.asset.json";
import rizwanaAsset from "@/assets/artist-rizwana.png.asset.json";
import binaAsset from "@/assets/artist-bina.png.asset.json";
import yusraAsset from "@/assets/artist-yusra.png.asset.json";

export type Artist = {
  slug: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  speciality: string;
  specialityAr: string;
  bio: string;
  bioAr: string;
  img: string;
};

export const ARTISTS: Artist[] = [
  {
    slug: "ayesha-hanif",
    name: "Ayesha Hanif",
    nameAr: "عائشة حنيف",
    role: "Henna Artist, Hairstylist, Makeup Artist",
    roleAr: "فنانة حناء، مصففة شعر، خبيرة مكياج",
    speciality: "Bridal henna, hair styling and soft-glam makeup",
    specialityAr: "حناء العرائس، تصفيف الشعر ومكياج السوفت جلام",
    bio: "A multi-skilled artisan equally at home with a henna cone, a curling iron or a beauty blender.",
    bioAr: "فنانة متعددة المهارات تتقن الحناء وتصفيف الشعر والمكياج بنفس الإتقان.",
    img: ayeshaAsset.url,
  },
  {
    slug: "aksa-sheikh",
    name: "Aksa Sheikh",
    nameAr: "أقصى شيخ",
    role: "Makeup Artist, Hairstylist, Henna Artist, Nail Artist",
    roleAr: "خبيرة مكياج، مصففة شعر، فنانة حناء، فنانة أظافر",
    speciality: "Full-look bridal beauty — face, hair, henna and nails",
    specialityAr: "إطلالة العروس الكاملة — وجه وشعر وحناء وأظافر",
    bio: "An all-rounder who can take a bride from bare-faced to fully styled in a single sitting.",
    bioAr: "فنانة شاملة تستطيع تجهيز العروس من البداية حتى النهاية في جلسة واحدة.",
    img: aksaAsset.url,
  },
  {
    slug: "ayesha-sarang",
    name: "Ayesha Sarang",
    nameAr: "عائشة سارنغ",
    role: "Nail Artist, Henna Artist",
    roleAr: "فنانة أظافر، فنانة حناء",
    speciality: "Chrome & gel nail art and freehand henna",
    specialityAr: "فن الأظافر بالكروم والجل والحناء الحرة",
    bio: "A miniaturist at heart — every nail and every henna line is a tiny canvas.",
    bioAr: "فنانة المنمنمات — كل ظفر وكل خط حناء لوحة صغيرة.",
    img: sarangAsset.url,
  },
  {
    slug: "rebina-magar",
    name: "Rebina Magar",
    nameAr: "ريبينا ماغار",
    role: "Brow & Lash Specialist, Nail Artist",
    roleAr: "خبيرة حواجب ورموش، فنانة أظافر",
    speciality: "Brow lamination, lash lifts and polished nail finishes",
    specialityAr: "تثبيت الحواجب، رفع الرموش، وتلميع الأظافر",
    bio: "Architectural brows, feather-light lashes — Rebina frames the face with surgical precision.",
    bioAr: "حواجب معمارية ورموش خفيفة — تؤطر الوجه بدقة جراحية.",
    img: rebinaAsset.url,
  },
  {
    slug: "rizwana-begum",
    name: "Rizwana Begum",
    nameAr: "رضوانة بيغوم",
    role: "Hairstylist",
    roleAr: "مصففة شعر",
    speciality: "Cuts, colour, blow-dries and treatments",
    specialityAr: "قصات، صبغة، تجفيف، وعلاجات الشعر",
    bio: "Hair painted like couture fabric — Rizwana lives behind the wash basin and brush.",
    bioAr: "شعر يُلوَّن كأنه قماش راقٍ — رضوانة تتقن فن الشعر بكل تفاصيله.",
    img: rizwanaAsset.url,
  },
  {
    slug: "bina-rumba",
    name: "Bina Rumba",
    nameAr: "بينا رومبا",
    role: "Nail Artist, Henna Artist",
    roleAr: "فنانة أظافر، فنانة حناء",
    speciality: "French nails, extensions and bridal mehendi",
    specialityAr: "الأظافر الفرنسية، التركيب، وحناء العرائس",
    bio: "A patient hand for long bridal mehendi sessions and intricate nail designs.",
    bioAr: "يد صبورة لجلسات الحناء الطويلة وتصاميم الأظافر الدقيقة.",
    img: binaAsset.url,
  },
  {
    slug: "yusra-iqbal",
    name: "Yusra Iqbal",
    nameAr: "يسرى إقبال",
    role: "Facial and Skin Therapist",
    roleAr: "أخصائية الوجه والعناية بالبشرة",
    speciality: "Full-day bridal styling & couture finishing",
    specialityAr: "تنسيق العروس ليوم كامل واللمسات الراقية النهائية",
    bio: "Yusra orchestrates the wedding-day ritual end-to-end — from veil to gloss.",
    bioAr: "تدير يسرى طقوس يوم الزفاف من الطرحة حتى آخر لمسة.",
    img: yusraAsset.url,
  },
];

export function getArtist(slug: string) {
  return ARTISTS.find((a) => a.slug === slug);
}
