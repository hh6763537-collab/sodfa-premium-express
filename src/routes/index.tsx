import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck, Truck, Wallet } from "lucide-react";
import { HeroSlider } from "@/components/sodfa/HeroSlider";
import { PhoneFinder } from "@/components/sodfa/PhoneFinder";
import { ProductCard } from "@/components/sodfa/ProductCard";
import { SmartImage } from "@/components/sodfa/SmartImage";
import { useI18n } from "@/lib/i18n";
import { categories, visibleProducts } from "@/lib/data/catalog";
import { storeSettings } from "@/lib/store-config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "صدفة SODFA — إكسسوارات موبايل بريميوم في مصر" },
      {
        name: "description",
        content: "جرابات، شواحن، كابلات، سماعات وإكسسوارات سيارات. شحن سريع، دفع InstaPay أو عند الاستلام.",
      },
      { property: "og:title", content: "صدفة SODFA — إكسسوارات موبايل بريميوم" },
      { property: "og:description", content: "تسوق إكسسوارات الموبايل المميزة من صدفة." },
    ],
  }),
  component: Home,
});

function Section({
  title,
  subtitle,
  children,
  moreTo,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  moreTo?: "/products" | "/offers" | "/categories";
}) {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[var(--text-primary)] sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1.5 text-sm text-[var(--text-muted)]">{subtitle}</p>}
        </div>
        {moreTo && (
          <Link
            to={moreTo}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--text-purple)] hover:underline"
          >
            {t("home.viewAll")}
            <ArrowLeft className="h-4 w-4 ltr:rotate-180" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function Home() {
  const { t, tl, formatPrice } = useI18n();

  const featured = visibleProducts.filter((p) => p.featured).slice(0, 8);
  const bestsellers = visibleProducts.filter((p) => p.bestseller).slice(0, 4);
  const newArrivals = visibleProducts.filter((p) => p.newArrival).slice(0, 4);
  const offers = visibleProducts.filter((p) => p.offer).slice(0, 4);

  return (
    <div>
      <HeroSlider />

      <div className="border-y border-[var(--border-primary)] bg-[var(--bg-secondary)]">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-3 lg:px-8">
          {[
            { icon: Truck, ar: `شحن مجاني فوق ${formatPrice(storeSettings.freeShippingThreshold)}`, en: `Free shipping over ${formatPrice(storeSettings.freeShippingThreshold)}` },
            { icon: Wallet, ar: "دفع InstaPay أو عند الاستلام", en: "InstaPay or cash on delivery" },
            { icon: ShieldCheck, ar: "منتجات أصلية مضمونة", en: "Guaranteed authentic products" },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl sodfa-badge">
                <f.icon className="h-4 w-4" />
              </span>
              {tl({ ar: f.ar, en: f.en })}
            </div>
          ))}
        </div>
      </div>

      <Section title={t("home.categories.title")} subtitle={t("home.categories.subtitle")} moreTo="/categories">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {categories.slice(0, 8).map((c) => (
            <Link
              key={c.id}
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="group relative overflow-hidden rounded-2xl sodfa-card"
            >
              <SmartImage src={c.image} alt={tl(c.name)} className="aspect-[4/3] w-full" imgClassName="group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <span className="absolute bottom-3 text-sm font-bold text-white ltr:left-4 rtl:right-4">{tl(c.name)}</span>
            </Link>
          ))}
        </div>
      </Section>

      <PhoneFinder />

      <Section title={t("home.featured")} moreTo="/products">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
        </div>
      </Section>

      {offers.length > 0 && (
        <Section title={t("home.offers")} moreTo="/offers">
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {offers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>
      )}

      <Section title={t("home.bestsellers")} moreTo="/products">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      <Section title={t("home.new")} moreTo="/products">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>
    </div>
  );
}
