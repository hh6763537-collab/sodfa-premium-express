import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PackageSearch } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { findOrder, orderStatusFlow } from "@/lib/orders";
import type { Order, OrderStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "تتبع طلبك — صدفة SODFA" },
      { name: "description", content: "تابع حالة طلبك من صدفة برقم الطلب خطوة بخطوة حتى التسليم." },
      { property: "og:title", content: "تتبع طلبك — صدفة SODFA" },
      { property: "og:description", content: "تابع حالة طلبك خطوة بخطوة." },
    ],
  }),
  component: TrackPage,
});

const statusKeys: Record<OrderStatus, Parameters<ReturnType<typeof useI18n>["t"]>[0]> = {
  pending: "status.pending",
  payment_verification: "status.payment_verification",
  confirmed: "status.confirmed",
  preparing: "status.preparing",
  ready: "status.ready",
  out_for_delivery: "status.out_for_delivery",
  delivered: "status.delivered",
  cancelled: "status.cancelled",
};

function TrackPage() {
  const { t, tl, formatPrice } = useI18n();
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setOrder(findOrder(orderNumber, phone));
    setSearched(true);
  }

  const activeIndex = order ? orderStatusFlow.indexOf(order.status) : -1;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-black text-[var(--text-primary)]">{t("track.title")}</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{t("track.subtitle")}</p>

      <form onSubmit={submit} className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <input
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          placeholder="SODFA-000001"
          aria-label={t("track.orderNumber")}
          className="sodfa-input h-12 rounded-xl px-4 text-sm"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t("track.phone")}
          inputMode="tel"
          className="sodfa-input h-12 rounded-xl px-4 text-sm"
        />
        <button type="submit" className="h-12 rounded-xl sodfa-button px-8 text-sm font-bold">
          {t("track.submit")}
        </button>
      </form>

      {searched && !order && (
        <div className="mt-10 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-8 text-center">
          <PackageSearch className="mx-auto h-8 w-8 text-[var(--text-muted)]" />
          <p className="mt-3 font-bold text-[var(--text-primary)]">{t("track.notFound")}</p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">{t("track.notFoundHint")}</p>
        </div>
      )}

      {order && (
        <div className="mt-10 space-y-4">
          <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-black tracking-wider text-[var(--text-primary)]">{order.orderNumber}</span>
              <span className="rounded-full sodfa-badge px-3 py-1 text-xs font-bold">{t(statusKeys[order.status])}</span>
            </div>

            <ol className="mt-6 space-y-4">
              {orderStatusFlow.map((s, i) => {
                const done = activeIndex >= i;
                return (
                  <li key={s} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                        done ? "sodfa-gradient-bg text-white" : "border border-[var(--border-secondary)] text-[var(--text-disabled)]",
                      )}
                    >
                      {i + 1}
                    </span>
                    <span className={cn("text-sm", done ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]")}>
                      {t(statusKeys[s])}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">{t("checkout.summary")}</h2>
            <ul className="mt-3 space-y-2 text-xs text-[var(--text-secondary)]">
              {order.items.map((l) => (
                <li key={l.key} className="flex justify-between gap-3">
                  <span>
                    {tl(l.name)} × {l.quantity}
                  </span>
                  <span>{formatPrice(l.unitPrice * l.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="sodfa-divider my-3" />
            <div className="flex justify-between text-sm font-black text-[var(--text-primary)]">
              <span>{t("cart.total")}</span>
              <span className="sodfa-gradient-text">{formatPrice(order.total)}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5 text-sm text-[var(--text-secondary)]">
            <h2 className="mb-2 text-sm font-bold text-[var(--text-primary)]">{t("track.delivery")}</h2>
            <p>{order.customer.name}</p>
            <p>{order.customer.phone}</p>
            <p className="text-[var(--text-muted)]">
              {[order.customer.governorate, order.customer.area, order.customer.address].filter(Boolean).join(" - ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
