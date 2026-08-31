import type { Localized } from "./i18n";

export type Availability = "in_stock" | "limited" | "out_of_stock";

export type Category = {
  id: string;
  slug: string;
  name: Localized;
  image: string;
  active: boolean;
};

export type PhoneBrand = {
  id: string;
  name: Localized;
  models: PhoneModel[];
};

export type PhoneModel = {
  id: string;
  name: string;
};

export type ColorOption = {
  id: string;
  name: Localized;
  hex: string;
};

export type ProductVariant = {
  id: string;
  productId: string;
  sku: string;
  barcode?: string;
  /** phone model id, or "universal" */
  modelId: string;
  colorId: string;
  price: number;
  compareAtPrice?: number;
  /** stock already filtered to the warehouses this store may sell from */
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  name: Localized;
  description: Localized;
  categoryId: string;
  brandIds: string[];
  images: string[];
  basePrice: number;
  compareAtPrice?: number;
  colors: ColorOption[];
  variants: ProductVariant[];
  specs: { label: Localized; value: Localized }[];
  visible: boolean;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  offer: boolean;
  trending: boolean;
  rating: number;
  createdAt: string;
};

export type HeroSlide = {
  id: string;
  image: string;
  mobileImage: string;
  label: Localized;
  title: Localized;
  subtitle: Localized;
  cta: Localized;
  ctaLink: string;
  secondaryCta?: Localized;
  secondaryCtaLink?: string;
  duration: number;
  active: boolean;
  sortOrder: number;
};

export type CartLine = {
  key: string;
  productId: string;
  variantId: string;
  slug: string;
  name: Localized;
  image: string;
  modelLabel: string;
  colorName: Localized;
  colorHex: string;
  unitPrice: number;
  quantity: number;
};

export type PaymentMethod = "instapay_full" | "cod_deposit";

export type OrderStatus =
  | "pending"
  | "payment_verification"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type CustomerInfo = {
  name: string;
  phone: string;
  governorate: string;
  area: string;
  address: string;
  building: string;
  floor: string;
  apartment: string;
  notes: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  customer: CustomerInfo;
  items: CartLine[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  deposit: number;
  remaining: number;
  paymentProofName?: string;
  paymentStatus: "awaiting_verification" | "verified";
  status: OrderStatus;
  lang: "ar" | "en";
  createdAt: string;
  updatedAt: string;
};
