import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { buildWhatsappMessage, findOrder } from "@/lib/orders";
import { whatsappLink } from "@/lib/store-config";
import type { Order } from "@/lib/types";

export const Route = createFileRoute("/order/$orderNumber")({
  head: () => ({
    meta: [
      { title: "تم استلام طلبك — صدفة SODFA" },
      { name: "description", content: "تفاصيل طلبك من صدفة وتأكيده عبر واتساب." },
      { property: "og:title", content: "تم استلام طلبك — صدفة SODFA" },
      { property: "og:description", content: "تفاصيل طلبك من صدفة." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const { orderNumber } = Route.useParams();
  const { t, tl, lang, formatPrice } = useI18n();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrder(findOrder(orderNumber));
  }, [orderNumber]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl sodfa-badge animate-pulse-glow">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-3xl font-black text-[var(--text-primary)]">{t("success.title")}</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{t("success.subtitle")}</p>
        <p className="mt-5 inline-flex rounded-full sodfa-gradient-border px-5 py-2.5 text-sm font-black tracking-wider">
          {t("success.orderNumber")}: {orderNumber}
        </p>
      </div>

      {order && (
        <>
          <div className="mt-8 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">{t("checkout.summary")}</h2>
            <ul className="mt-4 space-y-3">
              {order.items.map((l) => (
                <li key={l.key} className="flex justify-between gap-3 text-xs">
                  <span className="text-[var(--text-secondary)]">
                    {tl(l.name)} × {l.quantity}
                    <span className="block text-[10px] text-[var(--text-muted)]">
                      {l.modelLabel} — {tl(l.colorName)}
                    </span>
                  </span>
                  <span className="font-semibold">{formatPrice(l.unitPrice * l.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="sodfa-divider my-4" />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <dt>{t("cart.shipping")}</dt>
                <dd>{order.shipping === 0 ? t("common.free") : formatPrice(order.shipping)}</dd>
              </div>
              <div className="flex justify-between font-black text-[var(--text-primary)]">
                <dt>{t("cart.total")}</dt>
                <dd className="sodfa-gradient-text">{formatPrice(order.total)}</dd>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <dt>{t("checkout.deposit")}</dt>
                <dd>{formatPrice(order.deposit)}</dd>
              </div>
              {order.remaining > 0 && (
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <dt>{t("checkout.remaining")}</dt>
                  <dd>{formatPrice(order.remaining)}</dd>
                </div>
              )}
              <div className="flex justify-between text-[var(--warning)]">
                <dt>{t("payment.status")}</dt>
                <dd>{t("payment.awaiting")}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-4 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5 text-sm text-[var(--text-secondary)]">
            <h2 className="mb-3 text-sm font-bold text-[var(--text-primary)]">{t("success.customerInfo")}</h2>
            <p>{order.customer.name}</p>
            <p>{order.customer.phone}</p>
            <p className="text-[var(--text-muted)]">
              {[order.customer.governorate, order.customer.area, order.customer.address].filter(Boolean).join(" - ")}
            </p>
          </div>

          <a
            href={whatsappLink(buildWhatsappMessage(order, lang))}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex items-center justify-center gap-2 rounded-xl sodfa-button py-4 text-sm font-bold"
          >
            <MessageCircle className="h-4 w-4" />
            {t("success.whatsapp")}
          </a>
        </>
      )}

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Link to="/track" className="rounded-xl sodfa-button-secondary py-3.5 text-center text-sm font-bold">
          {t("nav.track")}
        </Link>
        <Link to="/products" className="rounded-xl sodfa-button-secondary py-3.5 text-center text-sm font-bold">
          {t("cart.continue")}
        </Link>
      </div>
    </div>
  );
}
