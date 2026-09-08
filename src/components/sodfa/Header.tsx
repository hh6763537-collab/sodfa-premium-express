import { useEffect, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { storeSettings, whatsappLink } from "@/lib/store-config";

const links = [
  { to: "/", key: "nav.home" },
  { to: "/products", key: "nav.products" },
  { to: "/categories", key: "nav.categories" },
  { to: "/offers", key: "nav.offers" },
  { to: "/track", key: "nav.track" },
  { to: "/about", key: "nav.about" },
] as const;

export function Header() {
  const { t } = useI18n();
  const { count } = useCart();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate({ to: "/products", search: { q } });
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-[var(--border-primary)] bg-white/85 shadow-[var(--shadow-sm)] backdrop-blur-xl"
          : "border-transparent bg-white/70 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 lg:h-20 lg:px-8">
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-xl sodfa-button-secondary lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("nav.menu")}
        >
          {open ? <Menu className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Logo />

        <nav className="mx-4 hidden flex-1 items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-3 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]"
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "!text-[var(--text-purple)] bg-[var(--bg-card)]" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="relative hidden max-w-xs flex-1 lg:block">
          <Search className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)] ltr:left-3 rtl:right-3" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search.placeholder")}
            aria-label={t("nav.search")}
            className="sodfa-input h-10 w-full rounded-full text-sm ltr:pl-9 ltr:pr-4 rtl:pr-9 rtl:pl-4"
          />
        </form>

        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <a
            href={whatsappLink(`${storeSettings.storeName.en} — `)}
            target="_blank"
            rel="noreferrer"
            aria-label={t("nav.whatsapp")}
            className="hidden h-10 w-10 place-items-center rounded-xl sodfa-button-secondary sm:grid"
          >
            <Phone className="h-4 w-4" />
          </a>
          <Link
            to="/cart"
            aria-label={t("nav.cart")}
            className="relative grid h-10 w-10 place-items-center rounded-xl sodfa-button-secondary"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1.5 grid h-5 min-w-5 place-items-center rounded-full sodfa-gradient-bg px-1 text-[10px] font-bold text-white ltr:-right-1.5 rtl:-left-1.5">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--border-primary)] bg-black/95 px-4 pb-6 pt-4 backdrop-blur-xl lg:hidden">
          <form onSubmit={submitSearch} className="relative mb-4">
            <Search className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)] ltr:left-3 rtl:right-3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search.placeholder")}
              className="sodfa-input h-11 w-full rounded-full text-sm ltr:pl-9 ltr:pr-4 rtl:pr-9 rtl:pl-4"
            />
          </form>
          <nav className="grid gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-xl px-3 py-3 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card)]"
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "!text-[var(--text-purple)] bg-[var(--bg-card)]" }}
              >
                {t(l.key)}
              </Link>
            ))}
            <Link to="/contact" className="rounded-xl px-3 py-3 text-sm font-medium text-[var(--text-secondary)]">
              {t("nav.contact")}
            </Link>
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-xl sodfa-button-secondary"
              aria-label={t("common.close")}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
