import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { SmartImage } from "./SmartImage";
import { useI18n } from "@/lib/i18n";
import { availabilityOf, totalStock } from "@/lib/data/catalog";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { t, tl, formatPrice } = useI18n();
  const stock = totalStock(product);
  const availability = availabilityOf(stock);
  const price = product.basePrice;
  const compare = product.compareAtPrice;
  const discount = compare ? Math.round(((compare - price) / compare) * 100) : 0;

  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl sodfa-card"
    >
      <div className="relative">
        <SmartImage
          src={product.images[0] ?? ""}
          alt={tl(product.name)}
          className="aspect-square w-full"
          imgClassName="group-hover:scale-[1.06]"
          {...(priority ? { priority: true } : {})}
        />
        <div className="absolute top-3 flex flex-col gap-1.5 ltr:left-3 rtl:right-3">
          {discount > 0 && (
            <span className="rounded-full sodfa-gradient-bg px-2.5 py-1 text-[10px] font-bold text-white">
              -{discount}%
            </span>
          )}
          {product.newArrival && (
            <span className="rounded-full sodfa-badge px-2.5 py-1 text-[10px] font-bold">{t("common.new")}</span>
          )}
        </div>
        {availability === "out_of_stock" && (
          <div className="absolute inset-0 grid place-items-center bg-white/75 text-xs font-bold text-[var(--text-primary)] backdrop-blur-sm">
            {t("stock.out")}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--text-primary)] transition-colors group-hover:text-[var(--text-purple)]">
          {tl(product.name)}
        </h3>
        <div className="mt-1.5 flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
          <Star className="h-3 w-3 fill-[var(--sodfa-purple-light)] text-[var(--sodfa-purple-light)]" />
          {product.rating.toFixed(1)}
          <span
            className={cn(
              "ms-auto",
              availability === "in_stock" && "text-[var(--success)]",
              availability === "limited" && "text-[var(--warning)]",
              availability === "out_of_stock" && "text-[var(--danger)]",
            )}
          >
            {availability === "in_stock" ? t("stock.in") : availability === "limited" ? t("stock.limited") : t("stock.out")}
          </span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base font-black sodfa-gradient-text">{formatPrice(price)}</span>
          {compare && (
            <span className="text-xs text-[var(--text-disabled)] line-through">{formatPrice(compare)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
