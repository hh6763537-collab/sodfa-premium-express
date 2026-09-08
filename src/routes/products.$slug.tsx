import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { SmartImage } from "@/components/sodfa/SmartImage";
import { ProductCard } from "@/components/sodfa/ProductCard";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { availabilityOf, categories, modelLabel, productBySlug, visibleProducts } from "@/lib/data/catalog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { slug: product.slug, nameAr: product.name.ar, nameEn: product.name.en, descAr: product.description.ar };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "المنتج غير متاح — صدفة" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.nameAr} — صدفة SODFA` },
        { name: "description", content: loaderData.descAr },
        { property: "og:title", content: `${loaderData.nameAr} — صدفة` },
        { property: "og:description", content: loaderData.descAr },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { t, tl, lang, formatPrice } = useI18n();
  const { addLine } = useCart();
  const navigate = useNavigate();
  const product = productBySlug(slug)!;

  const modelIds = useMemo(() => [...new Set(product.variants.map((v) => v.modelId))], [product]);
  const [modelId, setModelId] = useState(modelIds[0]!);
  const colorIds = useMemo(
    () => product.variants.filter((v) => v.modelId === modelId).map((v) => v.colorId),
    [product, modelId],
  );
  const [colorId, setColorId] = useState(colorIds[0]!);
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const activeColorId = colorIds.includes(colorId) ? colorId : colorIds[0]!;
  const variant = product.variants.find((v) => v.modelId === modelId && v.colorId === activeColorId)!;
  const color = product.colors.find((c) => c.id === activeColorId)!;
  const availability = availabilityOf(variant.stock);
  const category = categories.find((c) => c.id === product.categoryId);
  const related = visibleProducts.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);

  function add(buyNow = false) {
    addLine({
      productId: product.id,
      variantId: variant.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? "",
      modelLabel: modelLabel(modelId, lang),
      colorName: color.name,
      colorHex: color.hex,
      unitPrice: variant.price,
      quantity,
    });
    toast.success(t("product.added"));
    if (buyNow) navigate({ to: "/cart" });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link to="/" className="hover:text-[var(--text-purple)]">
          {t("common.home")}
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              to="/categories/$slug"
              params={{ slug: category.slug }}
              className="hover:text-[var(--text-purple)]"
            >
              {tl(category.name)}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-[var(--text-secondary)]">{tl(product.name)}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <SmartImage
            src={product.images[imageIndex] ?? product.images[0] ?? ""}
            alt={tl(product.name)}
            priority
            className="aspect-square w-full rounded-3xl border border-[var(--border-primary)]"
          />
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  className={cn(
                    "h-20 w-20 overflow-hidden rounded-xl border transition",
                    i === imageIndex ? "border-[var(--sodfa-purple)]" : "border-[var(--border-primary)]",
                  )}
                >
                  <SmartImage src={img} alt="" className="h-full w-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-black text-[var(--text-primary)] sm:text-4xl">{tl(product.name)}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 fill-[var(--sodfa-purple-light)] text-[var(--sodfa-purple-light)]" />
              {product.rating.toFixed(1)}
            </span>
            <span
              className={cn(
                availability === "in_stock" && "text-[var(--success)]",
                availability === "limited" && "text-[var(--warning)]",
                availability === "out_of_stock" && "text-[var(--danger)]",
              )}
            >
              {availability === "in_stock"
                ? t("stock.in")
                : availability === "limited"
                  ? t("stock.limited")
                  : t("stock.out")}
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-black sodfa-gradient-text">{formatPrice(variant.price)}</span>
            {variant.compareAtPrice && (
              <span className="text-base text-[var(--text-disabled)] line-through">
                {formatPrice(variant.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)]">{tl(product.description)}</p>

          <div className="mt-7">
            <p className="mb-2 text-xs font-bold tracking-wide text-[var(--text-muted)]">{t("product.selectModel")}</p>
            <div className="flex flex-wrap gap-2">
              {modelIds.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setModelId(id)}
                  className={cn(
                    "rounded-xl px-4 py-2.5 text-xs font-semibold transition",
                    id === modelId ? "sodfa-button" : "sodfa-button-secondary",
                  )}
                >
                  {modelLabel(id, lang)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-2 text-xs font-bold tracking-wide text-[var(--text-muted)]">
              {t("product.selectColor")} — {tl(color.name)}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {colorIds.map((id) => {
                const c = product.colors.find((x) => x.id === id)!;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setColorId(id)}
                    aria-label={tl(c.name)}
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-full border-2 transition",
                      id === activeColorId ? "border-[var(--sodfa-purple)] sodfa-glow" : "border-[var(--border-secondary)]",
                    )}
                  >
                    <span className="h-7 w-7 rounded-full" style={{ backgroundColor: c.hex }} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-xl sodfa-button-secondary">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="grid h-11 w-11 place-items-center"
                aria-label="-"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-bold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="grid h-11 w-11 place-items-center"
                aria-label="+"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              disabled={variant.stock <= 0}
              onClick={() => add(false)}
              className="h-11 flex-1 rounded-xl sodfa-button px-6 text-sm font-bold"
            >
              {t("product.addToCart")}
            </button>
            <button
              type="button"
              disabled={variant.stock <= 0}
              onClick={() => add(true)}
              className="h-11 rounded-xl sodfa-button-secondary px-6 text-sm font-bold"
            >
              {t("product.buyNow")}
            </button>
          </div>

          <div className="mt-6 grid gap-2 text-xs text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4 text-[var(--text-purple)]" /> {t("cart.shipping")} — {t("common.free")} +1500
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[var(--text-purple)]" /> SKU: {variant.sku}
            </span>
          </div>

          {product.specs.length > 0 && (
            <div className="mt-8 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5">
              <h2 className="text-sm font-bold text-[var(--text-primary)]">{t("product.specs")}</h2>
              <dl className="mt-3 grid gap-2 text-sm">
                {product.specs.map((s, i) => (
                  <div key={i} className="flex justify-between gap-4 border-b border-[var(--border-primary)] pb-2 last:border-0">
                    <dt className="text-[var(--text-muted)]">{tl(s.label)}</dt>
                    <dd className="text-[var(--text-secondary)]">{tl(s.value)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-black text-[var(--text-primary)]">{t("product.related")}</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
