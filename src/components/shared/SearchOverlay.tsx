'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, X, ArrowLeft, TrendingUp, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useUIStore } from '@/store/uiStore';
import { searchProducts, getTrendingSearches } from '@/services/api';
import { Product } from '@/types';
import { discountedPrice, formatPrice } from '@/lib/utils';

export default function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [trending, setTrending] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
      getTrendingSearches().then(setTrending);
      const stored = JSON.parse(localStorage.getItem('rrr-recent-searches') || '[]');
      setRecent(stored);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const res = await searchProducts(query);
      setResults(res.slice(0, 6));
      setLoading(false);
    }, 300);
  }, [query]);

  const handleSearch = (term: string) => {
    const updated = [term, ...recent.filter((r) => r !== term)].slice(0, 6);
    localStorage.setItem('rrr-recent-searches', JSON.stringify(updated));
    setRecent(updated);
    closeSearch();
  };

  const clearRecent = () => {
    localStorage.removeItem('rrr-recent-searches');
    setRecent([]);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeSearch(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeSearch]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          className="fixed inset-0 z-[200]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
            onClick={closeSearch}
          />

          {/* Search Panel */}
          <motion.div
            className="relative bg-white shadow-2xl"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* Search Input */}
            <div
              className="flex items-center gap-3 px-4 md:px-8"
              style={{ height: '72px', borderBottom: '1px solid rgba(212,175,55,0.2)' }}
            >
              <button
                onClick={closeSearch}
                className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft size={20} style={{ color: 'var(--charcoal)' }} />
              </button>
              <Search size={20} style={{ color: 'var(--gold)' }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && query.trim()) handleSearch(query.trim()); }}
                placeholder="Search products, brands, categories…"
                className="flex-1 text-base font-medium outline-none bg-transparent"
                style={{ color: 'var(--black)', fontFamily: 'var(--font-display)' }}
              />
              {query && (
                <button onClick={() => setQuery('')} className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
                  <X size={16} style={{ color: 'var(--gray-mid)' }} />
                </button>
              )}
            </div>

            {/* Results Area */}
            <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 max-h-[60vh] overflow-y-auto">
              {/* Loading */}
              {loading && (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-3 items-center">
                      <div className="skeleton w-12 h-12 rounded-lg" />
                      <div className="flex-1 space-y-1.5">
                        <div className="skeleton h-3 w-3/4 rounded" />
                        <div className="skeleton h-3 w-1/3 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Search Results */}
              {!loading && results.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
                    Products ({results.length})
                  </p>
                  <div className="space-y-2">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        onClick={() => handleSearch(query)}
                        className="flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-yellow-50 group"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold line-clamp-1" style={{ color: 'var(--black)' }}>{product.name}</p>
                          <p className="text-xs" style={{ color: 'var(--gray-mid)' }}>{product.category} • {product.gender}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold" style={{ color: 'var(--black)' }}>
                            {formatPrice(discountedPrice(product.price, product.discount))}
                          </p>
                          {product.discount > 0 && (
                            <p className="text-xs price-discount">{product.discount}% off</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={() => handleSearch(query)}
                    className="block mt-4 text-center text-sm font-semibold py-2.5 rounded-xl transition-colors hover:bg-yellow-50"
                    style={{ color: 'var(--gold)', border: '1px solid rgba(212,175,55,0.3)' }}
                  >
                    View all results for &quot;{query}&quot;
                  </Link>
                </div>
              )}

              {/* No results */}
              {!loading && query && results.length === 0 && (
                <p className="text-center py-6 text-sm" style={{ color: 'var(--gray-mid)' }}>
                  No results found for &quot;{query}&quot;. Try a different keyword.
                </p>
              )}

              {/* Default State: Trending + Recent */}
              {!query && (
                <div className="space-y-6">
                  {recent.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--gray-mid)' }}>
                          <Clock size={12} className="inline mr-1.5" />Recent Searches
                        </p>
                        <button onClick={clearRecent} className="text-xs font-medium hover:text-red-500 transition-colors" style={{ color: 'var(--gray-mid)' }}>
                          Clear
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recent.map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="px-3 py-1.5 rounded-full text-sm font-medium border transition-all hover:border-yellow-400 hover:text-yellow-700"
                            style={{ borderColor: 'var(--gray-light)', color: 'var(--gray-dark)' }}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {trending.length > 0 && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
                        <TrendingUp size={12} className="inline mr-1.5" />Trending Searches
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {trending.map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105"
                            style={{ background: 'rgba(212,175,55,0.1)', color: 'var(--gold-deep)', border: '1px solid rgba(212,175,55,0.25)' }}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
