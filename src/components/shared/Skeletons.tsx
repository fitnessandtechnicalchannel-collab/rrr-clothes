'use client';

import { motion } from 'framer-motion';

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="skeleton rounded-xl" style={{ aspectRatio: '3/4' }} />
      <div className="mt-3 space-y-2">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-3 w-24 rounded" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="skeleton w-full" style={{ aspectRatio: '16/7', minHeight: '400px', maxHeight: '80vh' }} />
  );
}

export function SectionSkeleton({ rows = 1 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="skeleton h-4 w-24 rounded" />
        <div className="skeleton h-6 w-48 rounded" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 * rows }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
