'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';

interface TrendingSectionProps {
  products: Product[];
}

const INSPIRATION = [
  { label: 'Celebrity Inspired', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&q=80', href: '/collections/trending' },
  { label: 'Campus Looks', image: 'https://images.unsplash.com/photo-1542191904-ff9cfc2f1d37?w=300&q=80', href: '/collections/campus' },
  { label: 'Summer Fits', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&q=80', href: '/collections/summer' },
  { label: 'Street Essentials', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=80', href: '/collections/streetwear' },
];

export default function TrendingSection({ products }: TrendingSectionProps) {
  return (
    <section style={{ background: 'var(--black)' }} className="py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-subtitle mb-1">What&apos;s Hot</p>
            <h2 className="section-title text-white">Trending Now</h2>
          </div>
          <Link href="/collections/trending" className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80" style={{ color: 'var(--gold)' }}>
            View All <ArrowRight size={15} />
          </Link>
        </div>

        {/* Inspiration Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {INSPIRATION.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link href={item.href} className="group relative block overflow-hidden rounded-2xl" style={{ aspectRatio: '3/4' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: 'brightness(0.55)' }}
                />
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ border: '2px solid var(--gold)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>{item.label}</p>
                  <p className="text-[11px] mt-0.5 flex items-center gap-1" style={{ color: 'var(--gold-soft)' }}>
                    Explore <ArrowRight size={10} />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Trending Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
