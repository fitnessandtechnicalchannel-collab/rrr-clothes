'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Category } from '@/types';

interface CategoriesGridProps {
  categories: Category[];
}

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="section-subtitle mb-1">Browse</p>
          <h2 className="section-title">Shop by Category</h2>
        </div>
        <Link href="/collections" className="hidden md:flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-yellow-700" style={{ color: 'var(--gold)' }}>
          All Categories <ArrowRight size={15} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            <Link
              href={`/collections/${cat.slug}`}
              className="group flex flex-col items-center text-center"
            >
              <div
                className="w-full aspect-square rounded-2xl overflow-hidden mb-3 relative"
                style={{ border: '2px solid transparent' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ border: '2px solid var(--gold)', background: 'rgba(212,175,55,0.05)' }}
                />
              </div>
              <h3
                className="text-sm font-bold transition-colors group-hover:text-yellow-700"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)' }}
              >
                {cat.name}
              </h3>
              {cat.productCount && (
                <p className="text-xs mt-0.5" style={{ color: 'var(--gray-mid)' }}>
                  {cat.productCount}+ styles
                </p>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
