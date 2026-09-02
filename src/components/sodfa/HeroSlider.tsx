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

  return (
    <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden bg-black">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(142,42,168,0.35),transparent_60%)]" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-20 lg:px-8 lg:pb-28">
        {slides.map(
          (slide, i) =>
            i === index && (
              <div key={slide.id} className="max-w-2xl">
                <span className="animate-rise inline-flex rounded-full sodfa-badge px-3 py-1 text-[11px] font-bold tracking-[0.2em]">
                  {tl(slide.label)}
                </span>
                <h1
                  className="animate-rise mt-5 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
                  style={{ animationDelay: "120ms" }}
                >
                  {tl(slide.title)}
                </h1>
                <p
                  className="animate-rise mt-4 max-w-lg text-base text-[var(--text-secondary)] sm:text-lg"
                  style={{ animationDelay: "240ms" }}
                >
                  {tl(slide.subtitle)}
                </p>
                <div className="animate-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
                  <Link
                    to="/products"
                    className="rounded-full sodfa-button px-7 py-3.5 text-sm font-bold"
                  >
                    {tl(slide.cta)}
                  </Link>
                  {slide.secondaryCta && (
                    <Link
                      to="/categories"
                      className="rounded-full sodfa-button-secondary px-7 py-3.5 text-sm font-bold"
                    >
                      {tl(slide.secondaryCta)}
                    </Link>
                  )}
                </div>
              </div>
            ),
        )}

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
                  i === index ? "w-10 sodfa-gradient-bg" : "w-4 bg-white/25 hover:bg-white/50",
                )}
              />
            ))}
          </div>
          <div className="ms-auto flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition hover:border-[var(--sodfa-purple)]"
            >
              <Arrow className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition hover:border-[var(--sodfa-purple)]"
            >
              <ArrowNext className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
