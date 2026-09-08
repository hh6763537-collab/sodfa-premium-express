import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { heroSlides } from "@/lib/data/catalog";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const slides = heroSlides.filter((s) => s.active).sort((a, b) => a.sortOrder - b.sortOrder);

export function HeroSlider() {
  const { tl, isRTL } = useI18n();
  const [index, setIndex] = useState(0);

  const go = useCallback((next: number) => {
    setIndex((prev) => (next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const slide = slides[index];
    if (!slide) return;
    const timer = window.setTimeout(() => go(index + 1), slide.duration);
    return () => window.clearTimeout(timer);
  }, [index, go]);

  const Arrow = isRTL ? ArrowRight : ArrowLeft;
  const ArrowNext = isRTL ? ArrowLeft : ArrowRight;

  const active = slides[index];

  return (
    <section className="relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(142,42,168,0.10),transparent_55%),radial-gradient(circle_at_85%_15%,rgba(192,107,207,0.10),transparent_55%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:py-20">
        {active && (
          <div key={active.id} className="order-2 lg:order-1">
            <span className="animate-rise inline-flex rounded-full sodfa-badge px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em]">
              {tl(active.label)}
            </span>
            <h1
              className="animate-rise mt-6 text-4xl font-black leading-[1.12] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "120ms" }}
            >
              {tl(active.title)}
            </h1>
            <p
              className="animate-rise mt-5 max-w-lg text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg"
              style={{ animationDelay: "240ms" }}
            >
              {tl(active.subtitle)}
            </p>
            <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
              <Link to="/products" className="rounded-full sodfa-button px-7 py-3.5 text-sm font-bold">
                {tl(active.cta)}
              </Link>
              {active.secondaryCta && (
                <Link to="/categories" className="rounded-full sodfa-button-secondary px-7 py-3.5 text-sm font-bold">
                  {tl(active.secondaryCta)}
                </Link>
              )}
            </div>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={tl(s.title)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      i === index
                        ? "w-10 sodfa-gradient-bg"
                        : "w-4 bg-[var(--border-secondary)] hover:bg-[var(--sodfa-purple-soft)]",
                    )}
                  />
                ))}
              </div>
              <div className="ms-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  aria-label="Previous"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-secondary)] transition hover:border-[var(--sodfa-purple)] hover:text-[var(--text-purple)]"
                >
                  <Arrow className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  aria-label="Next"
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border-primary)] bg-[var(--bg-card)] text-[var(--text-secondary)] transition hover:border-[var(--sodfa-purple)] hover:text-[var(--text-purple)]"
                >
                  <ArrowNext className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="relative order-1 h-[320px] overflow-hidden rounded-[2rem] border border-[var(--border-primary)] shadow-[var(--shadow-lg)] sm:h-[420px] lg:order-2 lg:h-[540px]">
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className={cn(
                "absolute inset-0 transition-opacity duration-[1400ms] ease-out",
                i === index ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              aria-hidden={i !== index}
            >
              <img
                src={slide.image}
                alt={tl(slide.title)}
                {...(i === 0 ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
                className={cn("h-full w-full object-cover", i === index && "animate-ken-burns")}
              />
            </div>
          ))}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(142,42,168,0.22),transparent_65%)]" />
        </div>
      </div>
    </section>
  );
}
