import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { SmartImage } from "@/components/sodfa/SmartImage";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سلة التسوق — صدفة SODFA" },
      { name: "description", content: "راجع منتجات سلتك وأكمل طلبك من متجر صدفة." },
      { property: "og:title", content: "سلة التسوق — صدفة SODFA" },
      { property: "og:description", content: "راجع منتجات سلتك وأكمل طلبك." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { t, tl, formatPrice } = useI18n();
  const { lines, subtotal, shipping, total, updateQuantity, removeLine } = useCart();

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl sodfa-badge">
          <ShoppingBag className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-2xl font-black text-[var(--text-primary)]">{t("cart.empty")}</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">{t("cart.emptyHint")}</p>
        <Link to="/products" className="mt-8 inline-flex rounded-full sodfa-button px-7 py-3.5 text-sm font-bold">
          {t("cart.continue")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-black text-[var(--text-primary)]">{t("cart.title")}</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {lines.map((line) => (
            <div key={line.key} className="flex gap-4 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-3">
              <Link to="/products/$slug" params={{ slug: line.slug }} className="shrink-0">
                <SmartImage src={line.image} alt={tl(line.name)} className="h-24 w-24 rounded-xl" />
              </Link>
              <div className="flex flex-1 flex-col">
                <Link
                  to="/products/$slug"
                  params={{ slug: line.slug }}
                  className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--text-purple)]"
                >
                  {tl(line.name)}
                </Link>
                <p className="mt-1 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  {line.modelLabel} •
                  <span className="inline-flex items-center gap-1">
                    <span className="h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: line.colorHex }} />
                    {tl(line.colorName)}
                  </span>
                </p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  {t("cart.unitPrice")}: {formatPrice(line.unitPrice)}
                </p>

                <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                  <div className="inline-flex items-center rounded-xl sodfa-button-secondary">
                    <button
                      type="button"
                      aria-label="-"
                      onClick={() => updateQuantity(line.key, line.quantity - 1)}
                      className="grid h-9 w-9 place-items-center"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{line.quantity}</span>
                    <button
                      type="button"
                      aria-label="+"
                      onClick={() => updateQuantity(line.key, line.quantity + 1)}
                      className="grid h-9 w-9 place-items-center"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <span className="text-sm font-black sodfa-gradient-text">
                    {formatPrice(line.unitPrice * line.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeLine(line.key)}
                    aria-label={t("cart.remove")}
                    className="grid h-9 w-9 place-items-center rounded-xl text-[var(--text-muted)] hover:text-[var(--danger)]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5 lg:sticky lg:top-24">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">{t("checkout.summary")}</h2>
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <dt>{t("cart.subtotal")}</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-[var(--text-secondary)]">
              <dt>{t("cart.shipping")}</dt>
              <dd>{shipping === 0 ? t("common.free") : formatPrice(shipping)}</dd>
            </div>
            <div className="sodfa-divider my-3" />
            <div className="flex justify-between text-base font-black text-[var(--text-primary)]">
              <dt>{t("cart.total")}</dt>
              <dd className="sodfa-gradient-text">{formatPrice(total)}</dd>
            </div>
          </dl>
          <Link
            to="/checkout"
            className="mt-5 block rounded-xl sodfa-button py-3.5 text-center text-sm font-bold"
          >
            {t("cart.checkout")}
          </Link>
          <Link
            to="/products"
            className="mt-2 block rounded-xl sodfa-button-secondary py-3.5 text-center text-sm font-bold"
          >
            {t("cart.continue")}
          </Link>
        </aside>
      </div>
    </div>
  );
}
