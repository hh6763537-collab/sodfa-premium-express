import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Phone, Wallet, Clock, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { storeSettings, whatsappLink } from "@/lib/store-config";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل مع صدفة — واتساب ودعم الطلبات" },
      {
        name: "description",
        content: "كلّمنا على واتساب لأي استفسار عن إكسسوارات الموبايل، حالة الطلب، أو الدفع عبر InstaPay.",
      },
      { property: "og:title", content: "تواصل مع صدفة" },
      { property: "og:description", content: "دعم سريع على واتساب لطلبات وإكسسوارات الموبايل." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { tl } = useI18n();

  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="text-4xl font-black sodfa-gradient-text">{tl({ ar: "تواصل معنا", en: "Contact Us" })}</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
        {tl({
          ar: "فريق صدفة موجود يساعدك تختار الإكسسوار المناسب أو يتابع طلبك. أسرع طريقة للرد هي واتساب.",
          en: "The SODFA team is here to help you choose the right accessory or follow up on your order. WhatsApp is the fastest way to reach us.",
        })}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <a
          href={whatsappLink(tl({ ar: "مرحبًا صدفة، عندي استفسار", en: "Hello SODFA, I have a question" }))}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl sodfa-card p-6 transition-transform hover:-translate-y-1"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl sodfa-badge">
            <MessageCircle className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-sm font-bold text-[var(--text-primary)]">
            {tl({ ar: "واتساب", en: "WhatsApp" })}
          </h2>
          <p className="mt-1.5 text-sm text-[var(--text-muted)]" dir="ltr">
            {storeSettings.whatsappNumber}
          </p>
        </a>

        <div className="rounded-2xl sodfa-card p-6">
          <span className="grid h-11 w-11 place-items-center rounded-xl sodfa-badge">
            <Wallet className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-sm font-bold text-[var(--text-primary)]">
            {tl({ ar: "الدفع عبر InstaPay", en: "InstaPay Payments" })}
          </h2>
          <p className="mt-1.5 text-sm text-[var(--text-muted)]" dir="ltr">
            {storeSettings.instapayNumber}
          </p>
        </div>

        <div className="rounded-2xl sodfa-card p-6">
          <span className="grid h-11 w-11 place-items-center rounded-xl sodfa-badge">
            <Clock className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-sm font-bold text-[var(--text-primary)]">
            {tl({ ar: "مواعيد الرد", en: "Response Hours" })}
          </h2>
          <p className="mt-1.5 text-sm text-[var(--text-muted)]">
            {tl({ ar: "يوميًا من 10 صباحًا حتى 10 مساءً", en: "Daily, 10:00 AM – 10:00 PM" })}
          </p>
        </div>

        <div className="rounded-2xl sodfa-card p-6">
          <span className="grid h-11 w-11 place-items-center rounded-xl sodfa-badge">
            <MapPin className="h-5 w-5" />
          </span>
          <h2 className="mt-4 text-sm font-bold text-[var(--text-primary)]">
            {tl({ ar: "التوصيل", en: "Delivery" })}
          </h2>
          <p className="mt-1.5 text-sm text-[var(--text-muted)]">
            {tl({ ar: "شحن لكل محافظات مصر", en: "Shipping to all Egyptian governorates" })}
          </p>
        </div>
      </div>

      <a
        href={whatsappLink(tl({ ar: "مرحبًا صدفة", en: "Hello SODFA" }))}
        target="_blank"
        rel="noreferrer"
        className="mt-10 inline-flex items-center gap-2 rounded-full sodfa-button px-7 py-3.5 text-sm font-bold"
      >
        <Phone className="h-4 w-4" />
        {tl({ ar: "ابدأ محادثة واتساب", en: "Start a WhatsApp chat" })}
      </a>
    </div>
  );
}
