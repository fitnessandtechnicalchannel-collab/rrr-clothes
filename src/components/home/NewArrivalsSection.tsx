'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

interface NewArrivalsSectionProps {
  products: Product[];
}

export default function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'right' ? 280 : -280, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-14" style={{ background: 'var(--off-white)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="section-subtitle mb-1">Just Dropped</p>
            <h2 className="section-title">New Arrivals</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ border: '1.5px solid var(--gold)', color: 'var(--gold)' }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'var(--gold)', color: 'white' }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <Link href="/collections/new-arrivals" className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-yellow-700" style={{ color: 'var(--gold)' }}>
              View All <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
        >
          {products.map((product, i) => (
            <div key={product.id} style={{ minWidth: '220px', maxWidth: '220px' }}>
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
