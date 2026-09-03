import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/sodfa/ProductCard";
import { useI18n } from "@/lib/i18n";
import { categoryBySlug, productsByCategory } from "@/lib/data/catalog";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.slug);
    if (!category) throw notFound();
    return { nameAr: category.name.ar };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "الفئة غير متاحة — صدفة" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.nameAr} — صدفة SODFA`;
    const description = `تسوق ${loaderData.nameAr} من صدفة بأفضل الأسعار في مصر مع شحن سريع.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const { t, tl } = useI18n();
  const category = categoryBySlug(slug)!;
  const products = productsByCategory(category.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <nav className="mb-4 flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Link to="/" className="hover:text-[var(--text-purple)]">
          {t("common.home")}
        </Link>
        <span>/</span>
        <Link to="/categories" className="hover:text-[var(--text-purple)]">
          {t("nav.categories")}
        </Link>
      </nav>

      <h1 className="text-3xl font-black text-[var(--text-primary)] sm:text-4xl">{tl(category.name)}</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">
        {products.length} {t("search.count")}
      </p>

      {products.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-lg font-bold text-[var(--text-primary)]">{t("empty.products")}</p>
          <p className="mt-2 text-sm text-[var(--text-muted)]">{t("empty.productsHint")}</p>
          <Link to="/products" className="mt-6 inline-flex rounded-full sodfa-button px-6 py-3 text-sm font-bold">
            {t("nav.products")}
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
