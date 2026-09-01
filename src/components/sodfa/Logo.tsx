import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("group flex shrink-0 items-center gap-2", className)} aria-label="SODFA">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl sodfa-gradient-bg shadow-[var(--sodfa-glow-small)]">
        <span className="text-sm font-black text-[var(--sodfa-white)]">S</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-base font-black tracking-[0.18em] sodfa-gradient-text">SODFA</span>
        <span className="mt-0.5 text-[10px] font-medium tracking-widest text-[var(--text-muted)]">صــدفــة</span>
      </span>
    </Link>
  );
}
