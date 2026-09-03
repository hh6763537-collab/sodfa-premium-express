import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/sodfa/ProductCard";
import { useI18n } from "@/lib/i18n";
import { categories, phoneBrands, searchProducts, totalStock, visibleProducts } from "@/lib/data/catalog";
import type { Product } from "@/lib/types";

type Search = {
  q?: string;
  category?: string;
  brand?: string;
  model?: string;
  sort?: "recommended" | "priceAsc" | "priceDesc" | "newest";
  inStock?: boolean;
  offers?: boolean;
};

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    ...(typeof search["q"] === "string" && search["q"] ? { q: search["q"] } : {}),
    ...(typeof search["category"] === "string" && search["category"] ? { category: search["category"] } : {}),
    ...(typeof search["brand"] === "string" && search["brand"] ? { brand: search["brand"] } : {}),
    ...(typeof search["model"] === "string" && search["model"] ? { model: search["model"] } : {}),
    ...(typeof search["sort"] === "string" &&
    ["recommended", "priceAsc", "priceDesc", "newest"].includes(search["sort"])
      ? { sort: search["sort"] as Search["sort"] }
      : {}),
    ...(search["inStock"] ? { inStock: true } : {}),
    ...(search["offers"] ? { offers: true } : {}),
  }),
  head: () => ({
    meta: [
      { title: "كل المنتجات — صدفة SODFA" },
      { name: "description", content: "تصفح كل إكسسوارات الموبايل من صدفة: جرابات، شواحن، كابلات، سماعات وأكثر." },
      { property: "og:title", content: "كل المنتجات — صدفة SODFA" },
      { property: "og:description", content: "تصفح كل إكسسوارات الموبايل من صدفة." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { t, tl, lang } = useI18n();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/products" });

  const setSearch = (patch: Partial<Search>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) as Search, replace: true });

  const results = useMemo(() => {
    let list: Product[] = search.q ? searchProducts(search.q, lang) : [...visibleProducts];

    if (search.category) {
      const cat = categories.find((c) => c.slug === search.category);
      list = cat ? list.filter((p) => p.categoryId === cat.id) : list;
    }
    if (search.brand) list = list.filter((p) => p.brandIds.includes(search.brand!) || p.brandIds.includes("universal"));
    if (search.model)
      list = list.filter((p) => p.variants.some((v) => v.modelId === search.model || v.modelId === "universal"));
    if (search.inStock) list = list.filter((p) => totalStock(p) > 0);
    if (search.offers) list = list.filter((p) => p.offer);

    switch (search.sort) {
      case "priceAsc":
        return [...list].sort((a, b) => a.basePrice - b.basePrice);
      case "priceDesc":
        return [...list].sort((a, b) => b.basePrice - a.basePrice);
      case "newest":
        return [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      default:
        return [...list].sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
    }
  }, [search, lang]);

  const brand = phoneBrands.find((b) => b.id === search.brand);
  const hasFilters = Boolean(
    search.q || search.category || search.brand || search.model || search.inStock || search.offers,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-black text-[var(--text-primary)] sm:text-4xl">
        {search.q ? `${t("search.resultsFor")} “${search.q}”` : t("nav.products")}
      </h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        {results.length} {t("search.count")}
      </p>

      <div className="mt-6 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
          <SlidersHorizontal className="h-4 w-4 text-[var(--text-purple)]" />
          {t("filters.title")}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <select
            aria-label={t("filters.category")}
            value={search.category ?? ""}
            onChange={(e) => setSearch({ category: e.target.value || undefined })}
            className="sodfa-input h-11 rounded-xl px-3 text-sm"
          >
            <option value="">{t("filters.category")}</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {tl(c.name)}
              </option>
            ))}
          </select>

          <select
            aria-label={t("filters.brand")}
            value={search.brand ?? ""}
            onChange={(e) => setSearch({ brand: e.target.value || undefined, model: undefined })}
            className="sodfa-input h-11 rounded-xl px-3 text-sm"
          >
            <option value="">{t("filters.brand")}</option>
            {phoneBrands.map((b) => (
              <option key={b.id} value={b.id}>
                {tl(b.name)}
              </option>
            ))}
          </select>

          <select
            aria-label={t("filters.model")}
            value={search.model ?? ""}
            disabled={!brand}
            onChange={(e) => setSearch({ model: e.target.value || undefined })}
            className="sodfa-input h-11 rounded-xl px-3 text-sm disabled:opacity-50"
          >
            <option value="">{brand ? t("filters.model") : t("finder.pickBrand")}</option>
            {brand?.models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <select
            aria-label={t("filters.sort")}
            value={search.sort ?? "recommended"}
            onChange={(e) => setSearch({ sort: e.target.value as Search["sort"] })}
            className="sodfa-input h-11 rounded-xl px-3 text-sm"
          >
            <option value="recommended">{t("sort.recommended")}</option>
            <option value="priceAsc">{t("sort.priceAsc")}</option>
            <option value="priceDesc">{t("sort.priceDesc")}</option>
            <option value="newest">{t("sort.newest")}</option>
          </select>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSearch({ inStock: search.inStock ? undefined : true })}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${search.inStock ? "sodfa-button" : "sodfa-button-secondary"}`}
          >
            {t("filters.inStockOnly")}
          </button>
          <button
            type="button"
            onClick={() => setSearch({ offers: search.offers ? undefined : true })}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${search.offers ? "sodfa-button" : "sodfa-button-secondary"}`}
          >
            {t("filters.offers")}
          </button>
          {hasFilters && (
            <button
              type="button"
              onClick={() => navigate({ search: {} as Search, replace: true })}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="h-3.5 w-3.5" />
              {t("filters.clear")}
            </button>
          )}
        </div>
      </div>

      {results.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-lg font-bold text-[var(--text-primary)]">{t("empty.products")}</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{t("empty.productsHint")}</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {results.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
