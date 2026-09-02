import { Link } from "@tanstack/react-router";
import { MessageCircle, Wallet } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";
import { storeSettings, whatsappLink } from "@/lib/store-config";

export function Footer() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[var(--border-primary)] bg-[var(--bg-secondary)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--text-muted)]">{t("tagline")}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={whatsappLink(lang === "ar" ? "مرحبًا صدفة" : "Hello SODFA")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full sodfa-button px-4 py-2 text-sm font-semibold"
            >
              <MessageCircle className="h-4 w-4" />
              {storeSettings.whatsappNumber}
            </a>
            <span className="inline-flex items-center gap-2 rounded-full sodfa-button-secondary px-4 py-2 text-sm">
              <Wallet className="h-4 w-4 text-[var(--text-purple)]" />
              InstaPay: {storeSettings.instapayNumber}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">{t("footer.shop")}</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-muted)]">
            <li>
              <Link to="/products" className="hover:text-[var(--text-purple)]">
                {t("nav.products")}
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-[var(--text-purple)]">
                {t("nav.categories")}
              </Link>
            </li>
            <li>
              <Link to="/offers" className="hover:text-[var(--text-purple)]">
                {t("nav.offers")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[var(--text-primary)]">{t("footer.help")}</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--text-muted)]">
            <li>
              <Link to="/track" className="hover:text-[var(--text-purple)]">
                {t("nav.track")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[var(--text-purple)]">
                {t("footer.contactUs")}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[var(--text-purple)]">
                {t("nav.about")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="sodfa-divider-purple" />
      <p className="px-4 py-6 text-center text-xs text-[var(--text-muted)]">
        © {year} {t("brand")} — {t("footer.rights")}
      </p>
    </footer>
  );
}
