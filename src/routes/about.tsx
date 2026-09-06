import { createFileRoute, Link } from "@tanstack/react-router";
import { Gem, Sparkles, Truck } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "عن صدفة — قصة المتجر" },
      { name: "description", content: "صدفة متجر مصري لإكسسوارات الموبايل المختارة بعناية: جودة أصلية وخدمة سريعة." },
      { property: "og:title", content: "عن صدفة — قصة المتجر" },
      { property: "og:description", content: "متجر مصري لإكسسوارات الموبايل المختارة بعناية." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, tl } = useI18n();

  const values = [
    {
      icon: Gem,
      title: { ar: "جودة مختارة", en: "Curated Quality" },
      body: {
        ar: "كل منتج بنختاره بنفسنا ونجربه قبل ما ينزل المتجر.",
        en: "Every product is hand-picked and tested before it reaches the store.",
      },
    },
    {
      icon: Truck,
      title: { ar: "توصيل لكل مصر", en: "Delivery Across Egypt" },
      body: {
        ar: "شحن سريع لكل المحافظات مع إمكانية الدفع عند الاستلام.",
        en: "Fast shipping to every governorate with cash-on-delivery available.",
      },
    },
    {
      icon: Sparkles,
      title: { ar: "خدمة شخصية", en: "Personal Service" },
      body: {
        ar: "فريقنا على واتساب يساعدك تختار الإكسسوار المناسب لموبايلك.",
        en: "Our team is on WhatsApp to help you pick the right accessory.",
      },
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-4xl font-black sodfa-gradient-text">{t("nav.about")}</h1>
      <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
        {tl({
          ar: "صدفة متجر مصري متخصص في إكسسوارات الموبايل. بدأنا بفكرة بسيطة: الإكسسوار مش مجرد قطعة إضافية، ده جزء من شكل يومك. عشان كده بنختار كل منتج بعناية ونقدّمه بسعر عادل وخدمة سريعة.",
          en: "SODFA is an Egyptian store specialised in mobile accessories. We started with a simple idea: an accessory is not an afterthought, it is part of how your day looks. That is why we curate every product carefully and offer it at a fair price with fast service.",
        })}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {values.map((v, i) => (
          <div key={i} className="rounded-2xl sodfa-card p-5">
            <span className="grid h-11 w-11 place-items-center rounded-xl sodfa-badge">
              <v.icon className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-sm font-bold text-[var(--text-primary)]">{tl(v.title)}</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">{tl(v.body)}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/products" className="rounded-full sodfa-button px-7 py-3.5 text-sm font-bold">
          {t("nav.products")}
        </Link>
        <Link to="/contact" className="rounded-full sodfa-button-secondary px-7 py-3.5 text-sm font-bold">
          {t("nav.contact")}
        </Link>
      </div>
    </div>
  );
}
