'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const COLLECTIONS = [
  {
    title: 'Streetwear',
    subtitle: 'Urban edge, redefined',
    href: '/collections/streetwear',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    span: 'col-span-2 row-span-2',
  },
  {
    title: 'Oversized',
    subtitle: 'Big fits, bigger vibes',
    href: '/collections/oversized',
    image: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=400&q=80',
    span: 'col-span-1',
  },
  {
    title: 'Minimal Basics',
    subtitle: 'Less is more',
    href: '/collections/minimal',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80',
    span: 'col-span-1',
  },
  {
    title: 'Premium Linen',
    subtitle: 'Luxury in every thread',
    href: '/collections/premium',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400&q=80',
    span: 'col-span-1',
  },
  {
    title: 'Athleisure',
    subtitle: 'Move. Style. Repeat.',
    href: '/collections/athleisure',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&q=80',
    span: 'col-span-1',
  },
];

export default function FeaturedCollections() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="section-subtitle mb-1">Curated For You</p>
          <h2 className="section-title">Featured Collections</h2>
        </div>
        <Link href="/collections" className="hidden md:flex items-center gap-2 text-sm font-semibold transition-colors hover:text-yellow-700" style={{ color: 'var(--gold)' }}>
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" style={{ gridAutoRows: '200px' }}>
        {COLLECTIONS.map((col, i) => (
          <motion.div
            key={col.title}
            className={`${col.span} relative group overflow-hidden rounded-2xl cursor-pointer`}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={col.image}
              alt={col.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              style={{ filter: 'brightness(0.55)' }}
            />

            {/* Gold border on hover */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ border: '2px solid var(--gold)' }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <h3
                className="text-white font-bold text-lg md:text-xl leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {col.title}
              </h3>
              <p className="text-xs mt-1 mb-3 font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {col.subtitle}
              </p>
              <Link
                href={col.href}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-all group-hover:gap-2.5"
                style={{ color: 'var(--gold-soft)' }}
              >
                Explore <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
