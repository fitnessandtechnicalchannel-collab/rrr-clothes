'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, Category } from '@/types';
import ProductGrid from '@/components/product/ProductGrid';
import { discountedPrice } from '@/lib/utils';

interface CollectionsClientProps {
  initialProducts: Product[];
  categories: Category[];
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const GENDER_OPTIONS = ['Men', 'Women', 'Unisex'];
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function CollectionsClient({ initialProducts, categories }: CollectionsClientProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(10000);
  const [sortBy, setSortBy] = useState('relevance');

  const toggleFilter = <T extends string>(arr: T[], val: T, setter: (a: T[]) => void) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    let products = [...initialProducts];
    if (selectedCategories.length) products = products.filter((p) => selectedCategories.includes(p.category));
    if (selectedGender.length) products = products.filter((p) => selectedGender.includes(p.gender) || p.gender === 'Unisex');
    if (selectedSizes.length) products = products.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    products = products.filter((p) => discountedPrice(p.price, p.discount) <= priceMax);
    switch (sortBy) {
      case 'price-asc': return products.sort((a, b) => discountedPrice(a.price, a.discount) - discountedPrice(b.price, b.discount));
      case 'price-desc': return products.sort((a, b) => discountedPrice(b.price, b.discount) - discountedPrice(a.price, a.discount));
      case 'rating': return products.sort((a, b) => b.rating - a.rating);
      case 'newest': return products.filter((p) => p.newArrival);
      default: return products;
    }
  }, [initialProducts, selectedCategories, selectedGender, selectedSizes, priceMax, sortBy]);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedGender([]);
    setSelectedSizes([]);
    setPriceMax(10000);
    setSortBy('relevance');
  };

  const activeFilters = selectedCategories.length + selectedGender.length + selectedSizes.length + (priceMax < 10000 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black" style={{ fontFamily: 'var(--font-display)' }}>All Collections</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-mid)' }}>{filtered.length} products</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white cursor-pointer focus:outline-none focus:border-yellow-400"
              style={{ color: 'var(--charcoal)' }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--gray-mid)' }} />
          </div>
          {/* Filter Toggle */}
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-all hover:border-yellow-400"
            style={{ borderColor: activeFilters > 0 ? 'var(--gold)' : '#e5e7eb', color: activeFilters > 0 ? 'var(--gold)' : 'var(--charcoal)' }}
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilters > 0 && (
              <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white" style={{ background: 'var(--gold)' }}>
                {activeFilters}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Drawer (mobile) */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[100]"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterOpen(false)}
            />
            <motion.div
              className="fixed left-0 top-0 bottom-0 z-[101] bg-white overflow-y-auto"
              style={{ width: 'min(320px, 100vw)', boxShadow: '4px 0 32px rgba(0,0,0,0.12)' }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            >
              <div className="sticky top-0 bg-white px-5 py-4 flex items-center justify-between border-b border-gray-100 z-10">
                <h2 className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>Filters</h2>
                <div className="flex items-center gap-3">
                  {activeFilters > 0 && (
                    <button onClick={clearAll} className="text-xs font-semibold" style={{ color: 'var(--gold)' }}>
                      Clear All
                    </button>
                  )}
                  <button onClick={() => setFilterOpen(false)}>
                    <X size={20} style={{ color: 'var(--charcoal)' }} />
                  </button>
                </div>
              </div>

              <div className="px-5 py-4 space-y-6">
                {/* Gender */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>Gender</h3>
                  <div className="flex flex-wrap gap-2">
                    {GENDER_OPTIONS.map((g) => (
                      <button
                        key={g}
                        onClick={() => toggleFilter(selectedGender, g, setSelectedGender)}
                        className="px-4 py-2 rounded-full text-sm font-semibold border transition-all"
                        style={{
                          background: selectedGender.includes(g) ? 'var(--gold)' : 'white',
                          color: selectedGender.includes(g) ? 'white' : 'var(--charcoal)',
                          borderColor: selectedGender.includes(g) ? 'var(--gold)' : '#e5e7eb',
                        }}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>Category</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.name)}
                          onChange={() => toggleFilter(selectedCategories, cat.name, setSelectedCategories)}
                          className="w-4 h-4 rounded accent-yellow-500"
                        />
                        <span className="text-sm font-medium" style={{ color: 'var(--charcoal)' }}>{cat.name}</span>
                        {cat.productCount && (
                          <span className="ml-auto text-xs" style={{ color: 'var(--gray-mid)' }}>{cat.productCount}+</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleFilter(selectedSizes, size, setSelectedSizes)}
                        className="w-12 h-10 rounded-lg text-sm font-semibold border transition-all"
                        style={{
                          background: selectedSizes.includes(size) ? 'var(--gold)' : 'white',
                          color: selectedSizes.includes(size) ? 'white' : 'var(--charcoal)',
                          borderColor: selectedSizes.includes(size) ? 'var(--gold)' : '#e5e7eb',
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>Max Price: ₹{priceMax.toLocaleString('en-IN')}</h3>
                  <input
                    type="range"
                    min={500}
                    max={10000}
                    step={100}
                    value={priceMax}
                    onChange={(e) => setPriceMax(Number(e.target.value))}
                    className="w-full accent-yellow-500"
                  />
                  <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--gray-mid)' }}>
                    <span>₹500</span>
                    <span>₹10,000</span>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-5">
                <button onClick={() => setFilterOpen(false)} className="btn btn-gold w-full text-sm py-3">
                  Apply Filters ({filtered.length} results)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Products */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>No products found</p>
          <p className="text-sm mb-4" style={{ color: 'var(--gray-mid)' }}>Try adjusting your filters.</p>
          <button onClick={clearAll} className="btn btn-outline-gold px-6 py-2.5 text-sm">
            Clear All Filters
          </button>
        </div>
      ) : (
        <ProductGrid products={filtered} />
      )}
    </div>
  );
}
