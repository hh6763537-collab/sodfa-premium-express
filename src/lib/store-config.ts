/**
 * Centralised store settings.
 * These values will later come from Supabase `store_settings`
 * (managed in the SODFA Dashboard). Nothing else in the UI should
 * hard-code phone numbers, shipping fees or deposit rules.
 */

export type StoreSettings = {
  storeId: string;
  storeName: { ar: string; en: string };
  defaultLang: "ar" | "en";
  instapayNumber: string;
  whatsappNumber: string;
  /** E.164 form used for wa.me links */
  whatsappIntl: string;
  shippingFee: number;
  freeShippingThreshold: number;
  /** COD deposit = max(minDeposit, total * codDepositRate) rounded to 10 EGP */
  codDepositRate: number;
  minCodDeposit: number;
  orderNumberPrefix: string;
  /** Warehouses this storefront is allowed to sell from (never shown to customers) */
  allowedWarehouseIds: string[];
};

export const storeSettings: StoreSettings = {
  storeId: "sodfa-main",
  storeName: { ar: "صدفة", en: "SODFA" },
  defaultLang: "ar",
  instapayNumber: "01100090629",
  whatsappNumber: "01041243135",
  whatsappIntl: "201041243135",
  shippingFee: 60,
  freeShippingThreshold: 1500,
  codDepositRate: 0.2,
  minCodDeposit: 100,
  orderNumberPrefix: "SODFA",
  allowedWarehouseIds: ["wh-1", "wh-3"],
};

export function computeShipping(subtotal: number) {
  if (subtotal <= 0) return 0;
  return subtotal >= storeSettings.freeShippingThreshold ? 0 : storeSettings.shippingFee;
}

export function computeDeposit(total: number) {
  const raw = Math.max(storeSettings.minCodDeposit, total * storeSettings.codDepositRate);
  return Math.min(total, Math.round(raw / 10) * 10);
}

export function whatsappLink(message: string) {
  return `https://wa.me/${storeSettings.whatsappIntl}?text=${encodeURIComponent(message)}`;
}
