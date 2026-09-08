import { createFileRoute, Link } from "@tanstack/react-router";
import { SmartImage } from "@/components/sodfa/SmartImage";
import { useI18n } from "@/lib/i18n";
import { categories, productsByCategory } from "@/lib/data/catalog";

export const Route = createFileRoute("/categories/")({
  head: () => ({
    meta: [
      { title: "الفئات — صدفة SODFA" },
      { name: "description", content: "تصفح فئات إكسسوارات الموبايل: جرابات، شواحن، كابلات، سماعات، إكسسوارات سيارة." },
      { property: "og:title", content: "الفئات — صدفة SODFA" },
      { property: "og:description", content: "تصفح كل فئات إكسسوارات الموبايل من صدفة." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { t, tl } = useI18n();
  const active = categories.filter((c) => c.active);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-black text-[var(--text-primary)] sm:text-4xl">{t("home.categories.title")}</h1>
      <p className="mt-2 text-sm text-[var(--text-muted)]">{t("home.categories.subtitle")}</p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {active.map((c) => (
          <Link
            key={c.id}
            to="/categories/$slug"
            params={{ slug: c.slug }}
            className="group relative overflow-hidden rounded-2xl sodfa-card"
          >
            <SmartImage src={c.image} alt={tl(c.name)} className="aspect-[4/3] w-full" imgClassName="group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/75 to-transparent" />
            <div className="absolute bottom-3 ltr:left-4 rtl:right-4">
              <p className="text-sm font-bold text-[var(--text-primary)]">{tl(c.name)}</p>
              <p className="text-[11px] text-[var(--text-muted)]">
                {productsByCategory(c.id).length} {t("search.count")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
