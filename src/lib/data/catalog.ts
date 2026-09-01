import type { Category, HeroSlide, PhoneBrand, Product, ProductVariant, ColorOption } from "../types";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import imgCharger from "@/assets/p-charger.jpg";
import imgCable from "@/assets/p-cable.jpg";
import imgCarMount from "@/assets/p-carmount.jpg";
import imgGlass from "@/assets/p-glass.jpg";
import imgClearCase from "@/assets/p-clearcase.jpg";
import imgAudio from "@/assets/p-audio.jpg";

/* ------------------------------------------------------------------
   MOCK CATALOG — shaped exactly like the future Supabase tables so the
   data source can be swapped without touching any UI component.
   ------------------------------------------------------------------ */

export const heroSlides: HeroSlide[] = [
  {
    id: "hs-1",
    image: hero1,
    mobileImage: hero1,
    label: { ar: "وصل حديثًا", en: "NEW COLLECTION" },
    title: { ar: "اختار ستايلك", en: "Choose Your Style" },
    subtitle: {
      ar: "إكسسوارات مميزة لموبايلك كل يوم.",
      en: "Premium accessories designed for your everyday life.",
    },
    cta: { ar: "تسوق الآن", en: "Shop Now" },
    ctaLink: "/products",
    secondaryCta: { ar: "اختار موبايلك", en: "Find your phone" },
    secondaryCtaLink: "/products",
    duration: 7000,
    active: true,
    sortOrder: 1,
  },
  {
    id: "hs-2",
    image: hero2,
    mobileImage: hero2,
    label: { ar: "شحن أسرع", en: "POWER SERIES" },
    title: { ar: "طاقة بلا انتظار", en: "Power Without Waiting" },
    subtitle: {
      ar: "شواحن وباور بانك بتقنيات سريعة وآمنة.",
      en: "Fast, safe charging built for a full day.",
    },
    cta: { ar: "اكتشف الشواحن", en: "Explore Chargers" },
    ctaLink: "/categories/chargers",
    duration: 7000,
    active: true,
    sortOrder: 2,
  },
  {
    id: "hs-3",
    image: hero3,
    mobileImage: hero3,
    label: { ar: "صوت نقي", en: "AUDIO" },
    title: { ar: "اسمع الفرق", en: "Hear the Difference" },
    subtitle: {
      ar: "سماعات بجودة صوت غنية وعزل ضوضاء.",
      en: "Rich sound and deep noise isolation.",
    },
    cta: { ar: "تسوق السماعات", en: "Shop Audio" },
    ctaLink: "/categories/earphones",
    duration: 7000,
    active: true,
    sortOrder: 3,
  },
];

export const categories: Category[] = [
  { id: "c1", slug: "phone-cases", name: { ar: "جرابات الموبايل", en: "Phone Cases" }, image: hero1, active: true },
  { id: "c2", slug: "chargers", name: { ar: "الشواحن", en: "Chargers" }, image: imgCharger, active: true },
  { id: "c3", slug: "charging-cables", name: { ar: "كابلات الشحن", en: "Charging Cables" }, image: imgCable, active: true },
  { id: "c4", slug: "power-banks", name: { ar: "باور بانك", en: "Power Banks" }, image: hero2, active: true },
  { id: "c5", slug: "wireless-chargers", name: { ar: "شواحن لاسلكية", en: "Wireless Chargers" }, image: hero2, active: true },
  { id: "c6", slug: "phone-holders", name: { ar: "حوامل الموبايل", en: "Phone Holders" }, image: imgCarMount, active: true },
  { id: "c7", slug: "screen-protectors", name: { ar: "واقي الشاشة", en: "Screen Protectors" }, image: imgGlass, active: true },
  { id: "c8", slug: "car-accessories", name: { ar: "إكسسوارات السيارة", en: "Car Accessories" }, image: imgCarMount, active: true },
  { id: "c9", slug: "audio-accessories", name: { ar: "إكسسوارات الصوت", en: "Audio Accessories" }, image: imgAudio, active: true },
  { id: "c10", slug: "earphones", name: { ar: "سماعات", en: "Earphones" }, image: hero3, active: true },
  { id: "c11", slug: "adapters", name: { ar: "محولات", en: "Adapters" }, image: imgCharger, active: true },
  { id: "c12", slug: "mobile-accessories", name: { ar: "إكسسوارات الموبايل", en: "Mobile Accessories" }, image: imgClearCase, active: true },
  { id: "c13", slug: "other-electronics", name: { ar: "إلكترونيات أخرى", en: "Other Electronics" }, image: imgAudio, active: true },
];

export const phoneBrands: PhoneBrand[] = [
  {
    id: "apple",
    name: { ar: "آبل", en: "Apple" },
    models: [
      { id: "ip17pm", name: "iPhone 17 Pro Max" },
      { id: "ip17p", name: "iPhone 17 Pro" },
      { id: "ip17", name: "iPhone 17" },
      { id: "ip16pm", name: "iPhone 16 Pro Max" },
      { id: "ip16p", name: "iPhone 16 Pro" },
      { id: "ip16", name: "iPhone 16" },
      { id: "ip15pm", name: "iPhone 15 Pro Max" },
    ],
  },
  {
    id: "samsung",
    name: { ar: "سامسونج", en: "Samsung" },
    models: [
      { id: "s25u", name: "Galaxy S25 Ultra" },
      { id: "s25", name: "Galaxy S25" },
      { id: "s24u", name: "Galaxy S24 Ultra" },
      { id: "a55", name: "Galaxy A55" },
    ],
  },
  {
    id: "xiaomi",
    name: { ar: "شاومي", en: "Xiaomi" },
    models: [
      { id: "mi14", name: "Xiaomi 14" },
      { id: "note13", name: "Redmi Note 13 Pro" },
    ],
  },
  {
    id: "huawei",
    name: { ar: "هواوي", en: "Huawei" },
    models: [
      { id: "p60", name: "Huawei P60 Pro" },
      { id: "nova12", name: "Huawei Nova 12" },
    ],
  },
  {
    id: "universal",
    name: { ar: "يناسب كل الموبايلات", en: "All phones" },
    models: [{ id: "universal", name: "Universal" }],
  },
];

export const allPhoneModels = phoneBrands.flatMap((b) => b.models);

export function modelLabel(modelId: string, lang: "ar" | "en") {
  if (modelId === "universal") return lang === "ar" ? "يناسب كل الموبايلات" : "Universal";
  return allPhoneModels.find((m) => m.id === modelId)?.name ?? modelId;
}

export function brandOfModel(modelId: string) {
  return phoneBrands.find((b) => b.models.some((m) => m.id === modelId));
}

const COLORS: Record<string, ColorOption> = {
  black: { id: "black", name: { ar: "أسود", en: "Black" }, hex: "#111111" },
  pink: { id: "pink", name: { ar: "وردي", en: "Pink" }, hex: "#E8A0C0" },
  blue: { id: "blue", name: { ar: "أزرق", en: "Blue" }, hex: "#3B6FE0" },
  clear: { id: "clear", name: { ar: "شفاف", en: "Clear" }, hex: "#D8D8E0" },
  beige: { id: "beige", name: { ar: "بيج", en: "Beige" }, hex: "#D8C4A8" },
  purple: { id: "purple", name: { ar: "بنفسجي", en: "Purple" }, hex: "#8E2AA8" },
  white: { id: "white", name: { ar: "أبيض", en: "White" }, hex: "#F2F2F2" },
  silver: { id: "silver", name: { ar: "فضي", en: "Silver" }, hex: "#C4C7CC" },
};

let variantSeed = 0;
function buildVariants(
  productId: string,
  modelIds: string[],
  colorIds: string[],
  price: number,
  compareAtPrice?: number,
): ProductVariant[] {
  const out: ProductVariant[] = [];
  for (const modelId of modelIds) {
    for (const colorId of colorIds) {
      variantSeed += 1;
      const stock = [12, 4, 0, 25, 7, 2, 18, 9][variantSeed % 8] ?? 6;
      out.push({
        id: `${productId}-${modelId}-${colorId}`,
        productId,
        sku: `SD-${productId.toUpperCase()}-${modelId.toUpperCase()}-${colorId.slice(0, 3).toUpperCase()}`,
        barcode: `62${(600000 + variantSeed * 7).toString()}`,
        modelId,
        colorId,
        price,
        compareAtPrice,
        stock,
      });
    }
  }
  return out;
}

const modelsOf = (brandId: string) => phoneBrands.find((b) => b.id === brandId)?.models.map((m) => m.id) ?? [];
const appleModels = modelsOf("apple");
const samsungModels = modelsOf("samsung");
const xiaomiModels = modelsOf("xiaomi");
const huaweiModels = modelsOf("huawei");

type ProductSeed = Omit<Product, "variants" | "colors"> & { colorIds: string[]; modelIds: string[] };

const seeds: ProductSeed[] = [
  {
    id: "p1",
    slug: "premium-magsafe-case",
    name: { ar: "جراب فاخر ماج سيف", en: "Premium MagSafe Case" },
    description: {
      ar: "جراب سيليكون فاخر بملمس ناعم وحماية كاملة للحواف والكاميرا، متوافق مع الشحن اللاسلكي وماج سيف.",
      en: "Soft-touch premium silicone case with full edge and camera protection. Works with MagSafe and wireless charging.",
    },
    categoryId: "c1",
    brandIds: ["apple"],
    images: [hero1, imgClearCase],
    basePrice: 690,
    compareAtPrice: 890,
    specs: [
      { label: { ar: "الخامة", en: "Material" }, value: { ar: "سيليكون سائل", en: "Liquid silicone" } },
      { label: { ar: "الحماية", en: "Protection" }, value: { ar: "مقاومة الصدمات", en: "Shock absorbing" } },
      { label: { ar: "ماج سيف", en: "MagSafe" }, value: { ar: "متوافق", en: "Compatible" } },
    ],
    visible: true,
    featured: true,
    bestseller: true,
    newArrival: true,
    offer: true,
    trending: true,
    rating: 4.8,
    createdAt: "2026-08-01",
    colorIds: ["black", "pink", "blue", "beige", "purple"],
    modelIds: appleModels,
  },
  {
    id: "p2",
    slug: "clear-armor-case",
    name: { ar: "جراب شفاف مقاوم للصدمات", en: "Clear Armor Case" },
    description: {
      ar: "جراب شفاف لا يصفر مع أركان مقواة تمتص الصدمات وتحافظ على شكل موبايلك.",
      en: "Anti-yellowing clear case with reinforced shock-absorbing corners.",
    },
    categoryId: "c1",
    brandIds: ["apple", "samsung", "xiaomi"],
    images: [imgClearCase, hero1],
    basePrice: 420,
    specs: [
      { label: { ar: "الخامة", en: "Material" }, value: { ar: "TPU + بولي كربونات", en: "TPU + PC" } },
      { label: { ar: "السمك", en: "Thickness" }, value: { ar: "1.5 مم", en: "1.5 mm" } },
    ],
    visible: true,
    featured: true,
    bestseller: false,
    newArrival: true,
    offer: false,
    trending: true,
    rating: 4.6,
    createdAt: "2026-08-10",
    colorIds: ["clear", "black"],
    modelIds: [...appleModels.slice(0, 5), ...samsungModels, ...xiaomiModels],
  },
  {
    id: "p3",
    slug: "gan-fast-charger-45w",
    name: { ar: "شاحن سريع GaN بقوة 45 واط", en: "45W GaN Fast Charger" },
    description: {
      ar: "شاحن صغير الحجم بقوة 45 واط وتقنية GaN لشحن أسرع وأبرد مع حماية كاملة للبطارية.",
      en: "Compact 45W GaN charger — faster, cooler charging with full battery protection.",
    },
    categoryId: "c2",
    brandIds: ["universal"],
    images: [imgCharger],
    basePrice: 950,
    compareAtPrice: 1150,
    specs: [
      { label: { ar: "القدرة", en: "Output" }, value: { ar: "45 واط", en: "45W" } },
      { label: { ar: "المنافذ", en: "Ports" }, value: { ar: "USB-C + USB-A", en: "USB-C + USB-A" } },
    ],
    visible: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    offer: true,
    trending: true,
    rating: 4.9,
    createdAt: "2026-07-12",
    colorIds: ["white", "black"],
    modelIds: ["universal"],
  },
  {
    id: "p4",
    slug: "braided-usbc-cable-2m",
    name: { ar: "كابل USB-C مجدول 2 متر", en: "Braided USB-C Cable 2m" },
    description: {
      ar: "كابل مجدول متين يتحمل الاستخدام اليومي ويدعم الشحن السريع ونقل البيانات.",
      en: "Durable braided cable supporting fast charge and data transfer.",
    },
    categoryId: "c3",
    brandIds: ["universal"],
    images: [imgCable],
    basePrice: 260,
    specs: [
      { label: { ar: "الطول", en: "Length" }, value: { ar: "2 متر", en: "2 m" } },
      { label: { ar: "الشحن", en: "Charging" }, value: { ar: "حتى 60 واط", en: "Up to 60W" } },
    ],
    visible: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    offer: false,
    trending: true,
    rating: 4.5,
    createdAt: "2026-06-20",
    colorIds: ["black", "purple", "white"],
    modelIds: ["universal"],
  },
  {
    id: "p5",
    slug: "slim-power-bank-20000",
    name: { ar: "باور بانك نحيف 20000 مللي أمبير", en: "Slim Power Bank 20,000mAh" },
    description: {
      ar: "باور بانك بسعة كبيرة وتصميم نحيف يناسب الجيب، مع شحن سريع لجهازين في نفس الوقت.",
      en: "High capacity yet pocket-friendly, with fast charging for two devices at once.",
    },
    categoryId: "c4",
    brandIds: ["universal"],
    images: [hero2],
    basePrice: 1450,
    compareAtPrice: 1750,
    specs: [
      { label: { ar: "السعة", en: "Capacity" }, value: { ar: "20000 مللي أمبير", en: "20,000mAh" } },
      { label: { ar: "الخرج", en: "Output" }, value: { ar: "22.5 واط", en: "22.5W" } },
    ],
    visible: true,
    featured: true,
    bestseller: true,
    newArrival: false,
    offer: true,
    trending: false,
    rating: 4.7,
    createdAt: "2026-05-30",
    colorIds: ["black", "silver"],
    modelIds: ["universal"],
  },
  {
    id: "p6",
    slug: "magnetic-wireless-charger",
    name: { ar: "شاحن لاسلكي مغناطيسي 15 واط", en: "15W Magnetic Wireless Charger" },
    description: {
      ar: "قاعدة شحن لاسلكية مغناطيسية تلتصق بموبايلك بثبات وتشحن بسرعة وأمان.",
      en: "Magnetic wireless pad that snaps into place and charges fast and safely.",
    },
    categoryId: "c5",
    brandIds: ["universal"],
    images: [hero2, imgCharger],
    basePrice: 780,
    specs: [
      { label: { ar: "القدرة", en: "Output" }, value: { ar: "15 واط", en: "15W" } },
      { label: { ar: "التوافق", en: "Compatibility" }, value: { ar: "Qi / MagSafe", en: "Qi / MagSafe" } },
    ],
    visible: true,
    featured: false,
    bestseller: false,
    newArrival: true,
    offer: false,
    trending: true,
    rating: 4.4,
    createdAt: "2026-08-18",
    colorIds: ["black", "white"],
    modelIds: ["universal"],
  },
  {
    id: "p7",
    slug: "magnetic-car-mount",
    name: { ar: "حامل موبايل مغناطيسي للسيارة", en: "Magnetic Car Mount" },
    description: {
      ar: "حامل مغناطيسي قوي يثبت موبايلك أثناء القيادة مع إمكانية الدوران 360 درجة.",
      en: "Strong magnetic hold with full 360° rotation for safer driving.",
    },
    categoryId: "c8",
    brandIds: ["universal"],
    images: [imgCarMount],
    basePrice: 520,
    compareAtPrice: 650,
    specs: [
      { label: { ar: "التثبيت", en: "Mounting" }, value: { ar: "فتحة التكييف", en: "Air vent" } },
      { label: { ar: "الدوران", en: "Rotation" }, value: { ar: "360 درجة", en: "360°" } },
    ],
    visible: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    offer: true,
    trending: false,
    rating: 4.3,
    createdAt: "2026-04-11",
    colorIds: ["black", "silver"],
    modelIds: ["universal"],
  },
  {
    id: "p8",
    slug: "hd-tempered-glass",
    name: { ar: "واقي شاشة زجاجي HD", en: "HD Tempered Glass Protector" },
    description: {
      ar: "زجاج حماية بدرجة صلابة 9H مع طبقة مقاومة للبصمات وتركيب سهل بدون فقاعات.",
      en: "9H tempered glass with oleophobic coating and bubble-free installation.",
    },
    categoryId: "c7",
    brandIds: ["apple", "samsung", "huawei"],
    images: [imgGlass],
    basePrice: 180,
    specs: [
      { label: { ar: "الصلابة", en: "Hardness" }, value: { ar: "9H", en: "9H" } },
      { label: { ar: "العدد", en: "Pack" }, value: { ar: "قطعتان", en: "2 pieces" } },
    ],
    visible: true,
    featured: false,
    bestseller: true,
    newArrival: false,
    offer: false,
    trending: true,
    rating: 4.6,
    createdAt: "2026-03-02",
    colorIds: ["clear"],
    modelIds: [...appleModels.slice(0, 6), ...samsungModels, ...huaweiModels],
  },
  {
    id: "p9",
    slug: "pro-wireless-earbuds",
    name: { ar: "سماعات لاسلكية برو", en: "Pro Wireless Earbuds" },
    description: {
      ar: "سماعات لاسلكية بعزل ضوضاء نشط وبطارية تدوم طوال اليوم مع علبة شحن.",
      en: "Active noise cancelling earbuds with all-day battery and charging case.",
    },
    categoryId: "c10",
    brandIds: ["universal"],
    images: [hero3],
    basePrice: 1990,
    compareAtPrice: 2490,
    specs: [
      { label: { ar: "عزل الضوضاء", en: "ANC" }, value: { ar: "نشط", en: "Active" } },
      { label: { ar: "البطارية", en: "Battery" }, value: { ar: "حتى 30 ساعة", en: "Up to 30h" } },
    ],
    visible: true,
    featured: true,
    bestseller: true,
    newArrival: true,
    offer: true,
    trending: true,
    rating: 4.9,
    createdAt: "2026-08-22",
    colorIds: ["black", "white", "purple"],
    modelIds: ["universal"],
  },
  {
    id: "p10",
    slug: "studio-over-ear-headphones",
    name: { ar: "سماعة رأس استوديو", en: "Studio Over-Ear Headphones" },
    description: {
      ar: "سماعة رأس بصوت متوازن ووسائد مريحة للاستخدام الطويل.",
      en: "Balanced sound signature with plush cushions for long sessions.",
    },
    categoryId: "c9",
    brandIds: ["universal"],
    images: [imgAudio],
    basePrice: 2450,
    specs: [
      { label: { ar: "التوصيل", en: "Connection" }, value: { ar: "بلوتوث 5.3", en: "Bluetooth 5.3" } },
      { label: { ar: "البطارية", en: "Battery" }, value: { ar: "حتى 40 ساعة", en: "Up to 40h" } },
    ],
    visible: true,
    featured: false,
    bestseller: false,
    newArrival: true,
    offer: false,
    trending: false,
    rating: 4.5,
    createdAt: "2026-08-25",
    colorIds: ["black", "beige"],
    modelIds: ["universal"],
  },
  {
    id: "p11",
    slug: "usb-c-multiport-adapter",
    name: { ar: "محول USB-C متعدد المنافذ", en: "USB-C Multiport Adapter" },
    description: {
      ar: "محول عملي يضيف HDMI ومنافذ USB وقارئ كروت لموبايلك أو اللابتوب.",
      en: "Adds HDMI, USB ports and a card reader to your phone or laptop.",
    },
    categoryId: "c11",
    brandIds: ["universal"],
    images: [imgCharger, imgCable],
    basePrice: 890,
    specs: [
      { label: { ar: "المنافذ", en: "Ports" }, value: { ar: "6 منافذ", en: "6 ports" } },
      { label: { ar: "HDMI", en: "HDMI" }, value: { ar: "4K/60", en: "4K/60" } },
    ],
    visible: true,
    featured: false,
    bestseller: false,
    newArrival: false,
    offer: false,
    trending: false,
    rating: 4.2,
    createdAt: "2026-02-14",
    colorIds: ["silver", "black"],
    modelIds: ["universal"],
  },
  {
    id: "p12",
    slug: "desk-phone-stand",
    name: { ar: "حامل مكتبي للموبايل", en: "Aluminium Desk Phone Stand" },
    description: {
      ar: "حامل ألومنيوم أنيق بزاوية قابلة للتعديل يناسب المكتب.",
      en: "Sleek aluminium stand with adjustable viewing angle.",
    },
    categoryId: "c6",
    brandIds: ["universal"],
    images: [imgCarMount, imgClearCase],
    basePrice: 340,
    compareAtPrice: 430,
    specs: [
      { label: { ar: "الخامة", en: "Material" }, value: { ar: "ألومنيوم", en: "Aluminium" } },
      { label: { ar: "الزاوية", en: "Angle" }, value: { ar: "قابلة للتعديل", en: "Adjustable" } },
    ],
    visible: true,
    featured: false,
    bestseller: false,
    newArrival: true,
    offer: true,
    trending: false,
    rating: 4.4,
    createdAt: "2026-07-29",
    colorIds: ["silver", "black"],
    modelIds: ["universal"],
  },
];

export const products: Product[] = seeds.map((s) => ({
  ...s,
  colors: s.colorIds.map((id) => COLORS[id]!),
  variants: buildVariants(s.id, s.modelIds, s.colorIds, s.basePrice, s.compareAtPrice),
}));

export const visibleProducts = products.filter((p) => p.visible);

export function productBySlug(slug: string) {
  return visibleProducts.find((p) => p.slug === slug);
}

export function categoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug && c.active);
}

export function productsByCategory(categoryId: string) {
  return visibleProducts.filter((p) => p.categoryId === categoryId);
}

export function totalStock(p: Product) {
  return p.variants.reduce((sum, v) => sum + v.stock, 0);
}

export function availabilityOf(stock: number) {
  if (stock <= 0) return "out_of_stock" as const;
  if (stock <= 5) return "limited" as const;
  return "in_stock" as const;
}

export function productsForModel(modelId: string) {
  return visibleProducts.filter((p) => p.variants.some((v) => v.modelId === modelId || v.modelId === "universal"));
}

export function searchProducts(query: string, lang: "ar" | "en") {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return visibleProducts.filter((p) => {
    const category = categories.find((c) => c.id === p.categoryId);
    const haystack = [
      p.name.ar,
      p.name.en,
      p.description.ar,
      p.description.en,
      category?.name.ar ?? "",
      category?.name.en ?? "",
      ...p.brandIds.flatMap((b) => {
        const brand = phoneBrands.find((x) => x.id === b);
        return brand ? [brand.name.ar, brand.name.en, ...brand.models.map((m) => m.name)] : [];
      }),
      ...p.variants.map((v) => v.sku),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export const governorates: { ar: string; en: string }[] = [
  { ar: "القاهرة", en: "Cairo" },
  { ar: "الجيزة", en: "Giza" },
  { ar: "الإسكندرية", en: "Alexandria" },
  { ar: "القليوبية", en: "Qalyubia" },
  { ar: "الدقهلية", en: "Dakahlia" },
  { ar: "الشرقية", en: "Sharqia" },
  { ar: "الغربية", en: "Gharbia" },
  { ar: "المنوفية", en: "Monufia" },
  { ar: "البحيرة", en: "Beheira" },
  { ar: "بورسعيد", en: "Port Said" },
  { ar: "السويس", en: "Suez" },
  { ar: "الإسماعيلية", en: "Ismailia" },
  { ar: "أسيوط", en: "Assiut" },
  { ar: "المنيا", en: "Minya" },
  { ar: "سوهاج", en: "Sohag" },
  { ar: "قنا", en: "Qena" },
  { ar: "الأقصر", en: "Luxor" },
  { ar: "أسوان", en: "Aswan" },
];
