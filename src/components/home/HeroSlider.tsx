'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PILLARS = [
  {
    id: 'rare',
    title: 'RARE',
    subtitle: 'LIMITED ATELIER PIECES',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85', // Woman in yellow streetwear crop top hoodie and sweatpants
    ctaLink: '/collections/streetwear',
    hasCenterCta: false,
  },
  {
    id: 'rich',
    title: 'RICH',
    subtitle: 'ULTRA-PREMIUM FABRICS',
    image: 'https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=1200&q=85', // Luxury suit closeup adjusting tie
    ctaLink: '/collections/premium',
    hasCenterCta: true, // Center R R R logo and Enter Atelier CTA
  },
  {
    id: 'right',
    title: 'RIGHT',
    subtitle: 'THE ABSOLUTE FIT',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=85', // Premium sneaker close-up
    ctaLink: '/collections',
    hasCenterCta: false,
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const next = useCallback(() => go((current + 1) % PILLARS.length), [current, go]);
  const prev = useCallback(() => go((current - 1 + PILLARS.length) % PILLARS.length), [current, go]);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className="w-full bg-[#111] overflow-hidden">
      {/* ================= DESKTOP VIEW (3-Panel Split Hero) ================= */}
      <div className="hidden lg:grid grid-cols-3 w-full h-[75vh] min-h-[520px] max-h-[850px] overflow-hidden relative">
        {PILLARS.map((pillar) => (
          <Link
            key={pillar.id}
            href={pillar.ctaLink}
            className="relative group overflow-hidden h-full flex flex-col justify-end p-10 select-none border-r border-black/20 last:border-r-0"
          >
            {/* Background Image with Zoom on Hover */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pillar.image}
              alt={pillar.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] cubic-bezier(0.25, 0.46, 0.45, 0.94) group-hover:scale-105"
              style={{ filter: 'brightness(0.65)' }}
            />

            {/* Dark/Dim Overlay */}
            <div className="absolute inset-0 bg-black/15 transition-opacity duration-500 group-hover:bg-black/5" />

            {/* Bottom Gradient for Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

            {/* Center RRR + ENTER ATELIER (for Rich panel) */}
            {pillar.hasCenterCta && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6">
                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 0.95, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="font-serif text-5xl font-medium text-white tracking-[0.3em] mb-6 select-none"
                >
                  R R R
                </motion.h2>
                <span className="inline-block border border-[var(--gold)] text-white text-xs font-semibold tracking-[0.25em] px-8 py-3 uppercase transition-all duration-300 hover:bg-[var(--gold)] hover:text-black">
                  ENTER ATELIER
                </span>
              </div>
            )}

            {/* Bottom Panel Text */}
            <div className="relative z-10 text-center w-full flex flex-col items-center gap-1">
              <h3 className="font-serif text-4xl font-normal text-white tracking-[0.2em] leading-none mb-1">
                {pillar.title}
              </h3>
              <p className="text-[10px] tracking-[0.3em] font-semibold text-[var(--gold-soft)] uppercase">
                {pillar.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ================= MOBILE VIEW (Single-Slide Carousel) ================= */}
      <div className="lg:hidden relative w-full overflow-hidden" style={{ aspectRatio: '4/5', minHeight: '420px' }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={PILLARS[current].id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PILLARS[current].image}
              alt={PILLARS[current].title}
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(0.6)' }}
            />

            {/* Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

            {/* Slide Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-8 pb-16 text-center">
              {PILLARS[current].hasCenterCta && (
                <div className="mb-8 select-none">
                  <h2 className="font-serif text-4xl font-semibold text-white tracking-[0.25em] mb-4">R R R</h2>
                </div>
              )}
              <h1
                className="font-serif text-4xl font-normal text-white tracking-[0.2em] mb-2"
              >
                {PILLARS[current].title}
              </h1>
              <p
                className="text-xs tracking-[0.25em] font-semibold mb-6 uppercase"
                style={{ color: 'var(--gold-soft)' }}
              >
                {PILLARS[current].subtitle}
              </p>
              <Link
                href={PILLARS[current].ctaLink}
                className="btn btn-gold px-8 py-3 text-xs tracking-[0.15em]"
              >
                {PILLARS[current].hasCenterCta ? 'ENTER ATELIER' : 'SHOP NOW'}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Prev/Next Navigation */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all bg-black/40 border border-[var(--gold)]/30 text-[var(--gold-soft)]"
          aria-label="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all bg-black/40 border border-[var(--gold)]/30 text-[var(--gold-soft)]"
          aria-label="Next slide"
        >
          <ChevronRight size={18} />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {PILLARS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="transition-all"
              style={{
                width: i === current ? '16px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === current ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
