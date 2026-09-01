import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-[var(--border-primary)] bg-[var(--bg-input)] p-0.5",
        className,
      )}
      role="group"
      aria-label="Language / اللغة"
    >
      {(["ar", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={cn(
            "min-w-11 rounded-full px-3 py-1.5 text-xs font-semibold transition-all",
            lang === code
              ? "sodfa-gradient-bg text-[var(--sodfa-white)] shadow-[var(--sodfa-glow-small)]"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)]",
          )}
        >
          {code === "ar" ? "العربية" : "EN"}
        </button>
      ))}
    </div>
  );
}
