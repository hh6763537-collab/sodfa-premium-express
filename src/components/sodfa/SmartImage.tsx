import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
};

/**
 * SODFA image loader: branded shimmer skeleton, smooth fade-in,
 * graceful error state, lazy loading by default.
 */
export function SmartImage({ src, alt, className, imgClassName, width, height, priority, sizes }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-[var(--bg-card)]", className)}>
      {!loaded && !failed && <div className="sodfa-shimmer absolute inset-0" aria-hidden />}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center text-[var(--text-disabled)]">
          <ImageOff className="h-6 w-6" aria-hidden />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          {...(width ? { width } : {})}
          {...(height ? { height } : {})}
          {...(sizes ? { sizes } : {})}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-full object-cover transition-all duration-700 ease-out",
            loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-md",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
