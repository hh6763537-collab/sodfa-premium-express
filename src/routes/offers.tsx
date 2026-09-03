import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/sodfa/ProductCard";
import { useI18n } from "@/lib/i18n";
import { visibleProducts } from "@/lib/data/catalog";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "العروض — صدفة SODFA" },
      { name: "description", content: "أقوى عروض وخصومات إكسسوارات الموبايل من صدفة لفترة محدودة." },
      { property: "og:title", content: "العروض — صدفة SODFA" },
      { property: "og:description", content: "خصومات على الجرابات والشواحن والسماعات." },
    ],
  }),
  component: OffersPage,
});

function OffersPage() {
  const { t } = useI18n();
  const offers = visibleProducts.filter((p) => p.offer);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-black sodfa-gradient-text sm:text-4xl">{t("home.offers")}</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        {offers.length} {t("search.count")}
      </p>

      {offers.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-lg font-bold text-[var(--text-primary)]">{t("empty.offers")}</p>
          <Link to="/products" className="mt-6 inline-flex rounded-full sodfa-button px-6 py-3 text-sm font-bold">
            {t("nav.products")}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {offers.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
