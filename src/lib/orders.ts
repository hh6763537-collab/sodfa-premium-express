import type { CustomerInfo, Order, OrderStatus } from "./types";
import { storeSettings } from "./store-config";
import type { Lang } from "./i18n";

/**
 * Local persistence layer for orders + the saved customer profile.
 * Mirrors the future Supabase tables (`customers`, `orders`, `order_items`,
 * `payments`) so swapping to Supabase only changes this module.
 */

const ORDERS_KEY = "sodfa.orders";
const CUSTOMER_KEY = "sodfa.customer";
const COUNTER_KEY = "sodfa.orderCounter";

export const emptyCustomer: CustomerInfo = {
  name: "",
  phone: "",
  governorate: "",
  area: "",
  address: "",
  building: "",
  floor: "",
  apartment: "",
  notes: "",
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function loadCustomer(): CustomerInfo | null {
  const saved = read<CustomerInfo | null>(CUSTOMER_KEY, null);
  return saved && saved.phone ? saved : null;
}

export function saveCustomer(customer: CustomerInfo) {
  write(CUSTOMER_KEY, customer);
}

export function nextOrderNumber(): string {
  const current = read<number>(COUNTER_KEY, 0) + 1;
  write(COUNTER_KEY, current);
  return `${storeSettings.orderNumberPrefix}-${String(current).padStart(6, "0")}`;
}

export function loadOrders(): Order[] {
  return read<Order[]>(ORDERS_KEY, []);
}

export function saveOrder(order: Order) {
  write(ORDERS_KEY, [order, ...loadOrders()]);
}

export function findOrder(orderNumber: string, phone?: string): Order | null {
  const needle = orderNumber.trim().toUpperCase();
  const order = loadOrders().find((o) => o.orderNumber.toUpperCase() === needle);
  if (!order) return null;
  if (phone && phone.trim() && order.customer.phone.trim() !== phone.trim()) return null;
  return order;
}

export const orderStatusFlow: OrderStatus[] = [
  "pending",
  "payment_verification",
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "delivered",
];

export function buildWhatsappMessage(order: Order, lang: Lang): string {
  const ar = lang === "ar";
  const money = (v: number) => `${v.toLocaleString(ar ? "ar-EG" : "en-EG")} ${ar ? "ج.م" : "EGP"}`;
  const c = order.customer;
  const lines: string[] = [];

  lines.push(`${ar ? "طلب صدفة رقم" : "SODFA Order"} #${order.orderNumber}`);
  lines.push("");
  lines.push(`${ar ? "الاسم" : "Customer"}: ${c.name}`);
  lines.push(`${ar ? "الهاتف" : "Phone"}: ${c.phone}`);
  lines.push(
    `${ar ? "العنوان" : "Address"}: ${[c.governorate, c.area, c.address, c.building && `${ar ? "عمارة" : "Bldg"} ${c.building}`, c.floor && `${ar ? "دور" : "Floor"} ${c.floor}`, c.apartment && `${ar ? "شقة" : "Apt"} ${c.apartment}`]
      .filter(Boolean)
      .join(" - ")}`,
  );
  if (c.notes) lines.push(`${ar ? "ملاحظات" : "Notes"}: ${c.notes}`);
  lines.push("");
  lines.push(`${ar ? "المنتجات" : "Products"}:`);
  for (const item of order.items) {
    lines.push(
      `• ${item.name[lang]} — ${item.modelLabel} — ${item.colorName[lang]} × ${item.quantity} = ${money(item.unitPrice * item.quantity)}`,
    );
  }
  lines.push("");
  lines.push(
    `${ar ? "طريقة الدفع" : "Payment"}: ${
      order.paymentMethod === "instapay_full"
        ? ar
          ? "دفع كامل عبر InstaPay"
          : "Full payment via InstaPay"
        : ar
          ? "دفع عند الاستلام بمقدم InstaPay"
          : "Cash on delivery with InstaPay deposit"
    }`,
  );
  lines.push(`${ar ? "الشحن" : "Shipping"}: ${order.shipping === 0 ? (ar ? "مجاني" : "Free") : money(order.shipping)}`);
  lines.push(`${ar ? "الإجمالي" : "Total"}: ${money(order.total)}`);
  lines.push(`${ar ? "المدفوع" : "Paid"}: ${money(order.deposit)}`);
  if (order.remaining > 0) lines.push(`${ar ? "المتبقي عند الاستلام" : "Remaining on delivery"}: ${money(order.remaining)}`);
  return lines.join("\n");
}
