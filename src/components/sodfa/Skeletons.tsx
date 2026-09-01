import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("sodfa-shimmer rounded-xl border border-[var(--border-primary)]", className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] p-3">
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="mt-4 h-4 w-3/4" />
      <Skeleton className="mt-2 h-4 w-1/3" />
      <Skeleton className="mt-4 h-9 w-full" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function CategoryGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="aspect-[4/3] w-full" />
      ))}
    </div>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Skeleton className="aspect-square w-full" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-11 w-full" />
      </div>
    </div>
  );
}
