export type ServiceGroup = {
  key: string;
  title: string;
  desc: string;
  // Either a flat list of options or sub-categories with options
  options?: string[];
  subcategories?: { key: string; title: string; options: string[] }[];
};

export const SERVICE_CATALOG: ServiceGroup[] = [
  {
    key: "henna",
    title: "Henna",
    desc: "Bridal and occasion mehendi designs, hand-drawn with natural henna.",
    options: ["Custom"],
  },
  {
    key: "hair-makeover",
    title: "Hair Makeovers",
    desc: "Couture cuts, colour, styling and treatments by our hair couturières.",
    subcategories: [
      {
        key: "hair-cut",
        title: "Hair Cut",
        options: [
          "Straight Cut",
          "U Cut",
          "V Cut",
          "Layer Cut",
          "Step Cut",
          "Step and Layer",
          "Short Cut",
          "Front Cut",
          "Ear to Ear Cut",
          "Only Back",
          "Baby Hair Cut",
          "Bob",
          "Wedge and Blunt",
          "Custom",
        ],
      },
      {
        key: "hair-colour",
        title: "Hair Colour",
        options: [
          "Single",
          "Highlights",
          "Base Colour Change with Highlights",
          "Fashion Shade",
          "Permanent Colour with Cut Down",
          "Henna Hair Colour (Black/Brown)",
          "Highlights Downside",
          "Custom",
        ],
      },
      {
        key: "hair-treatment",
        title: "Hair Treatment",
        options: [
          "Protein",
          "Keratin",
          "Botox",
          "Nano Plasty",
          "Straightening",
          "Hair Spa",
          "Hair Treatment",
          "Dandruff Removal",
          "Hairfall Treatment",
          "Dry and Rough Hair Treatment",
          "Hair Mask Treatment",
        ],
      },
      {
        key: "hair-styling",
        title: "Styling & Others",
        options: [
          "Blow Dry Straight",
          "Blow Dry Curls",
          "Iron Straight",
          "Iron Curls",
          "Iron Waves",
          "Hair Wash",
          "Hair Wash with Normal Dry",
          "Hair Wash with Blow Dry (Straight)",
          "Hair Wash with Blow Dry (Curls)",
        ],
      },
    ],
  },
  {
    key: "makeup",
    title: "Couture Makeup",
    desc: "Editorial-grade glam for weddings, runway, and red-carpet moments.",
    options: ["Custom"],
  },
  {
    key: "bridal-works",
    title: "Bridal Works",
    desc: "Full bridal packages — hair, makeup, henna and finishing touches.",
    options: ["Custom"],
  },
  {
    key: "facial-threading-waxing",
    title: "Facial, Threading & Waxing",
    desc: "Facials, brow shaping and full body waxing in a quiet, private suite.",
    options: ["Custom"],
  },
  {
    key: "nails",
    title: "Manicure & Pedicure",
    desc: "Chrome, gel and hand-painted nail artistry with metallic finishes.",
    subcategories: [
      {
        key: "manicure",
        title: "Manicure",
        options: [
          "Manicure with Massage and Nail Clean",
          "Nail Clean",
          "Nail Shape",
          "Normal Polish",
          "Gel Polish",
          "Nail Clean with Extensions",
          "French Nail",
          "Custom Design",
        ],
      },
      {
        key: "pedicure",
        title: "Pedicure",
        options: [
          "Pedicure with Massage and Nail Clean",
          "Nail Clean",
          "Nail Shape",
          "Normal Polish",
          "Gel Polish",
          "Nail Clean with Extensions",
          "French Nail",
          "Custom Design",
        ],
      },
    ],
  },
  {
    key: "packages",
    title: "Packages",
    desc: "Curated combinations for brides, parties and seasonal refreshes.",
    options: ["Custom"],
  },
];

export const findService = (key: string) =>
  SERVICE_CATALOG.find((s) => s.key === key);
