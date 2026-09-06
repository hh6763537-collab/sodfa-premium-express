import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Copy, ShieldCheck, Upload, Wallet, X } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { governorates } from "@/lib/data/catalog";
import { computeDeposit, storeSettings } from "@/lib/store-config";
import { emptyCustomer, loadCustomer, nextOrderNumber, saveCustomer, saveOrder } from "@/lib/orders";
import type { CustomerInfo, Order, PaymentMethod } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "إتمام الطلب — صدفة SODFA" },
      { name: "description", content: "أكمل طلبك من صدفة: بيانات التوصيل والدفع عبر InstaPay أو عند الاستلام." },
      { property: "og:title", content: "إتمام الطلب — صدفة SODFA" },
      { property: "og:description", content: "أكمل طلبك بخطوات بسيطة." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const MAX_PROOF_SIZE = 5 * 1024 * 1024;

function CheckoutPage() {
  const { t, tl, lang, formatPrice } = useI18n();
  const { lines, subtotal, shipping, total, clear } = useCart();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<CustomerInfo>(emptyCustomer);
  const [restored, setRestored] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>("instapay_full");
  const [proof, setProof] = useState<{ name: string; url: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = loadCustomer();
    if (saved) {
      setCustomer(saved);
      setRestored(true);
    }
  }, []);

  const deposit = useMemo(
    () => (method === "instapay_full" ? total : computeDeposit(total)),
    [method, total],
  );
  const remaining = Math.max(0, total - deposit);

  function field(key: keyof CustomerInfo, value: string) {
    setCustomer((c) => ({ ...c, [key]: value }));
    setErrors((e) => {
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  function onProof(file: File | undefined) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error(t("validation.fileType"));
      return;
    }
    if (file.size > MAX_PROOF_SIZE) {
      toast.error(t("validation.fileSize"));
      return;
    }
    setProof({ name: file.name, url: URL.createObjectURL(file) });
    setErrors((e) => {
      const next = { ...e };
      delete next["proof"];
      return next;
    });
  }

  function validate() {
    const next: Record<string, string> = {};
    const required: (keyof CustomerInfo)[] = ["name", "phone", "governorate", "area", "address"];
    for (const key of required) if (!customer[key].trim()) next[key] = t("validation.required");
    if (customer.phone.trim() && !/^01\d{9}$/.test(customer.phone.trim())) next["phone"] = t("validation.phone");
    if (!proof) next["proof"] = t("validation.proof");
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (lines.length === 0) return;
    if (!validate()) {
      toast.error(t("validation.fixErrors"));
      return;
    }
    setSubmitting(true);
    const now = new Date().toISOString();
    const orderNumber = nextOrderNumber();
    const order: Order = {
      id: `${Date.now()}`,
      orderNumber,
      customer,
      items: lines,
      subtotal,
      shipping,
      total,
      paymentMethod: method,
      deposit,
      remaining,
      paymentProofName: proof?.name,
      paymentStatus: "awaiting_verification",
      status: "payment_verification",
      lang,
      createdAt: now,
      updatedAt: now,
    };
    saveOrder(order);
    saveCustomer(customer);
    clear();
    navigate({ to: "/order/$orderNumber", params: { orderNumber } });
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-2xl font-black text-[var(--text-primary)]">{t("cart.empty")}</h1>
        <Link to="/products" className="mt-6 inline-flex rounded-full sodfa-button px-6 py-3 text-sm font-bold">
          {t("cart.continue")}
        </Link>
      </div>
    );
  }

  const inputClass = (key: string) =>
    cn("sodfa-input h-11 w-full rounded-xl px-3 text-sm", errors[key] && "border-[var(--danger)]");

  return (
    <form onSubmit={submit} className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="text-3xl font-black text-[var(--text-primary)]">{t("checkout.title")}</h1>
      {restored && <p className="mt-2 text-xs text-[var(--text-purple)]">{t("checkout.savedInfo")}</p>}

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">{t("checkout.info")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                {t("checkout.name")}
                <input value={customer.name} onChange={(e) => field("name", e.target.value)} className={cn(inputClass("name"), "mt-1.5")} />
                {errors["name"] && <span className="mt-1 block text-[var(--danger)]">{errors["name"]}</span>}
              </label>
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                {t("checkout.phone")}
                <input
                  value={customer.phone}
                  inputMode="tel"
                  placeholder="01xxxxxxxxx"
                  onChange={(e) => field("phone", e.target.value)}
                  className={cn(inputClass("phone"), "mt-1.5")}
                />
                {errors["phone"] && <span className="mt-1 block text-[var(--danger)]">{errors["phone"]}</span>}
              </label>
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                {t("checkout.governorate")}
                <select
                  value={customer.governorate}
                  onChange={(e) => field("governorate", e.target.value)}
                  className={cn(inputClass("governorate"), "mt-1.5")}
                >
                  <option value="">—</option>
                  {governorates.map((g) => (
                    <option key={g.en} value={g.en}>
                      {tl(g)}
                    </option>
                  ))}
                </select>
                {errors["governorate"] && <span className="mt-1 block text-[var(--danger)]">{errors["governorate"]}</span>}
              </label>
              <label className="text-xs font-semibold text-[var(--text-muted)]">
                {t("checkout.area")}
                <input value={customer.area} onChange={(e) => field("area", e.target.value)} className={cn(inputClass("area"), "mt-1.5")} />
                {errors["area"] && <span className="mt-1 block text-[var(--danger)]">{errors["area"]}</span>}
              </label>
              <label className="text-xs font-semibold text-[var(--text-muted)] sm:col-span-2">
                {t("checkout.address")}
                <input value={customer.address} onChange={(e) => field("address", e.target.value)} className={cn(inputClass("address"), "mt-1.5")} />
                {errors["address"] && <span className="mt-1 block text-[var(--danger)]">{errors["address"]}</span>}
              </label>
              <div className="grid grid-cols-3 gap-3 sm:col-span-2">
                <label className="text-xs font-semibold text-[var(--text-muted)]">
                  {t("checkout.building")}
                  <input value={customer.building} onChange={(e) => field("building", e.target.value)} className={cn(inputClass("building"), "mt-1.5")} />
                </label>
                <label className="text-xs font-semibold text-[var(--text-muted)]">
                  {t("checkout.floor")}
                  <input value={customer.floor} onChange={(e) => field("floor", e.target.value)} className={cn(inputClass("floor"), "mt-1.5")} />
                </label>
                <label className="text-xs font-semibold text-[var(--text-muted)]">
                  {t("checkout.apartment")}
                  <input value={customer.apartment} onChange={(e) => field("apartment", e.target.value)} className={cn(inputClass("apartment"), "mt-1.5")} />
                </label>
              </div>
              <label className="text-xs font-semibold text-[var(--text-muted)] sm:col-span-2">
                {t("checkout.notes")} ({t("checkout.optional")})
                <textarea
                  value={customer.notes}
                  onChange={(e) => field("notes", e.target.value)}
                  rows={3}
                  className="sodfa-input mt-1.5 w-full rounded-xl p-3 text-sm"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">{t("checkout.payment")}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { id: "instapay_full", label: t("checkout.instapayFull") },
                  { id: "cod_deposit", label: t("checkout.cod") },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setMethod(opt.id)}
                  className={cn(
                    "rounded-xl border p-4 text-start text-sm font-semibold transition",
                    method === opt.id
                      ? "border-[var(--sodfa-purple)] bg-[var(--purple-bg)] text-[var(--text-primary)] sodfa-glow"
                      : "border-[var(--border-primary)] bg-[var(--bg-input)] text-[var(--text-secondary)]",
                  )}
                >
                  <Wallet className="mb-2 h-4 w-4 text-[var(--text-purple)]" />
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-input)] p-4">
              <p className="text-xs text-[var(--text-muted)]">{t("checkout.instapayHint")}</p>
              <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-black/40 px-3 py-2.5">
                <span className="text-sm font-bold tracking-wider text-[var(--text-primary)]">
                  {storeSettings.instapayNumber}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    void navigator.clipboard?.writeText(storeSettings.instapayNumber);
                    toast.success(t("checkout.copied"));
                  }}
                  className="inline-flex items-center gap-1.5 rounded-lg sodfa-button-secondary px-3 py-1.5 text-xs font-semibold"
                >
                  <Copy className="h-3.5 w-3.5" />
                  {t("checkout.copy")}
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-[var(--text-muted)]">
                  {method === "instapay_full" ? t("checkout.payFull") : t("checkout.deposit")}
                </span>
                <span className="font-black sodfa-gradient-text">{formatPrice(deposit)}</span>
              </div>
              {remaining > 0 && (
                <div className="mt-1.5 flex items-center justify-between text-sm">
                  <span className="text-[var(--text-muted)]">{t("checkout.remaining")}</span>
                  <span className="font-semibold text-[var(--text-secondary)]">{formatPrice(remaining)}</span>
                </div>
              )}
            </div>

            <div className="mt-5">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">{t("checkout.proof")}</h3>
              <p className="mt-1 text-xs text-[var(--text-muted)]">{t("checkout.proofHint")}</p>
              {proof ? (
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-input)] p-3">
                  <img src={proof.url} alt={proof.name} className="h-16 w-16 rounded-lg object-cover" />
                  <span className="flex-1 truncate text-xs text-[var(--text-secondary)]">{proof.name}</span>
                  <button
                    type="button"
                    onClick={() => setProof(null)}
                    aria-label={t("checkout.removeProof")}
                    className="grid h-8 w-8 place-items-center rounded-lg text-[var(--text-muted)] hover:text-[var(--danger)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  className={cn(
                    "mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed p-6 text-sm font-semibold text-[var(--text-muted)] transition hover:border-[var(--sodfa-purple)]",
                    errors["proof"] ? "border-[var(--danger)]" : "border-[var(--border-secondary)]",
                  )}
                >
                  <Upload className="h-4 w-4" />
                  {t("checkout.upload")}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => onProof(e.target.files?.[0])}
                  />
                </label>
              )}
              {errors["proof"] && <p className="mt-1 text-xs text-[var(--danger)]">{errors["proof"]}</p>}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-5 lg:sticky lg:top-24">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">{t("checkout.summary")}</h2>
          <ul className="mt-4 space-y-3">
            {lines.map((l) => (
              <li key={l.key} className="flex justify-between gap-3 text-xs">
                <span className="text-[var(--text-secondary)]">
                  {tl(l.name)} × {l.quantity}
                  <span className="block text-[10px] text-[var(--text-muted)]">
                    {l.modelLabel} — {tl(l.colorName)}
                  </span>
                </span>
                <span className="shrink-0 font-semibold text-[var(--text-primary)]">
                  {formatPrice(l.unitPrice * l.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="sodfa-divider my-4" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <dt>{t("cart.subtotal")}</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-[var(--text-secondary)]">
              <dt>{t("cart.shipping")}</dt>
              <dd>{shipping === 0 ? t("common.free") : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between text-base font-black text-[var(--text-primary)]">
              <dt>{t("cart.total")}</dt>
              <dd className="sodfa-gradient-text">{formatPrice(total)}</dd>
            </div>
          </dl>
          <button type="submit" disabled={submitting} className="mt-5 w-full rounded-xl sodfa-button py-3.5 text-sm font-bold">
            {t("checkout.submit")}
          </button>
          <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
            <ShieldCheck className="h-3.5 w-3.5 text-[var(--text-purple)]" />
            {t("payment.awaiting")}
          </p>
        </aside>
      </div>
    </form>
  );
}
