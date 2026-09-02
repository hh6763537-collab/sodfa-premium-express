import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Smartphone } from "lucide-react";
import { phoneBrands } from "@/lib/data/catalog";
import { useI18n } from "@/lib/i18n";

export function PhoneFinder() {
  const { t, tl } = useI18n();
  const navigate = useNavigate();
  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");

  const brand = phoneBrands.find((b) => b.id === brandId);

  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl sodfa-gradient-border p-6 sm:p-10">
        <div className="pointer-events-none absolute -top-24 h-56 w-56 rounded-full bg-[var(--sodfa-purple)]/25 blur-3xl ltr:-left-16 rtl:-right-16" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full sodfa-badge px-3 py-1 text-[11px] font-bold">
            <Smartphone className="h-3.5 w-3.5" />
            {t("finder.title")}
          </span>
          <h2 className="mt-4 text-2xl font-black text-[var(--text-primary)] sm:text-3xl">{t("finder.title")}</h2>
          <p className="mt-2 max-w-xl text-sm text-[var(--text-muted)]">{t("finder.subtitle")}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <select
              value={brandId}
              onChange={(e) => {
                setBrandId(e.target.value);
                setModelId("");
              }}
              aria-label={t("finder.brand")}
              className="sodfa-input h-12 rounded-xl px-4 text-sm"
            >
              <option value="">{t("finder.brand")}</option>
              {phoneBrands.map((b) => (
                <option key={b.id} value={b.id}>
                  {tl(b.name)}
                </option>
              ))}
            </select>

            <select
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              disabled={!brand}
              aria-label={t("finder.model")}
              className="sodfa-input h-12 rounded-xl px-4 text-sm disabled:opacity-50"
            >
              <option value="">{brand ? t("finder.model") : t("finder.pickBrand")}</option>
              {brand?.models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              disabled={!modelId}
              onClick={() => navigate({ to: "/products", search: { model: modelId } })}
              className="h-12 rounded-xl sodfa-button px-6 text-sm font-bold"
            >
              {t("finder.show")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
