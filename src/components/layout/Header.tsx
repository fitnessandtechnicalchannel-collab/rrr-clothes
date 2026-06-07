'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, User, Menu, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';

const NAV_LEFT = [
  { label: 'Men', href: '/collections/men' },
  { label: 'Women', href: '/collections/women' },
  { label: 'New Arrivals', href: '/collections/new-arrivals' },
  { label: 'Collections', href: '/collections', hasDropdown: true },
];

const COLLECTIONS_DROPDOWN = [
  { label: 'Streetwear', href: '/collections/streetwear' },
  { label: 'Oversized', href: '/collections/oversized' },
  { label: 'Minimal Basics', href: '/collections/minimal' },
  { label: 'Premium Linen', href: '/collections/premium' },
  { label: 'Athleisure', href: '/collections/athleisure' },
  { label: 'Campus Fits', href: '/collections/campus' },
  { label: 'Summer Picks', href: '/collections/summer' },
  { label: 'Party Wear', href: '/collections/party' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { openCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { openSearch, openSidebar } = useUIStore();
  const cartCount = useCartStore((s) => s.itemCount());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-md' : 'bg-white border-b border-gray-100'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="relative w-full max-w-7xl px-6 lg:px-10" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between" style={{ height: 'var(--header-h)' }}>
          {/* Left Nav */}
          <nav className="flex items-center gap-6">
            <button
              onClick={openSidebar}
              className="p-1.5 rounded-full transition-all hover:bg-gray-100 mr-1 ml-2 lg:ml-4"
              aria-label="Open menu"
            >
              <Menu size={20} style={{ color: 'var(--charcoal)' }} />
            </button>
            {NAV_LEFT.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  className="gold-underline flex items-center gap-1 text-sm font-semibold tracking-widest uppercase transition-colors hover:text-yellow-600"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)', letterSpacing: '0.1em' }}
                  onMouseEnter={() => item.hasDropdown && setDropdownOpen(true)}
                  onMouseLeave={() => item.hasDropdown && setDropdownOpen(false)}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown size={14} />}
                </Link>
                {item.hasDropdown && (
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full pt-3 z-50"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <div className="bg-white shadow-xl border border-gray-100 rounded-lg p-2 min-w-[180px]">
                          {COLLECTIONS_DROPDOWN.map((col) => (
                            <Link
                              key={col.label}
                              href={col.href}
                              className="block px-4 py-2.5 text-sm font-medium rounded-md transition-all hover:bg-yellow-50 hover:text-yellow-700"
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              {col.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Center Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center select-none group">
            <div
              className="text-3xl font-normal tracking-[0.2em] leading-none transition-all group-hover:opacity-85 font-serif"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--black)' }}
            >
              RRR
            </div>
            <div className="text-[9px] font-semibold tracking-[0.25em] uppercase animate-pulse" style={{ color: 'var(--gold)', letterSpacing: '0.25em' }}>
              Rare • Rich • Right
            </div>
          </Link>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={openSearch}
              className="p-2 rounded-full transition-all hover:bg-gray-100 hover:scale-110"
              aria-label="Search"
            >
              <Search size={20} style={{ color: 'var(--charcoal)' }} />
            </button>
            <Link href="/wishlist" className="relative p-2 rounded-full transition-all hover:bg-gray-100 hover:scale-110">
              <Heart size={20} style={{ color: 'var(--charcoal)' }} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 text-[10px] font-bold rounded-full flex items-center justify-center text-white" style={{ background: 'var(--gold)' }}>
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button
              onClick={openCart}
              className="relative p-2 rounded-full transition-all hover:bg-gray-100 hover:scale-110"
              aria-label="Open cart"
            >
              <ShoppingBag size={20} style={{ color: 'var(--charcoal)' }} />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 h-4 w-4 text-[10px] font-bold rounded-full flex items-center justify-center text-white"
                  style={{ background: 'var(--gold)' }}
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <Link href="/profile" className="p-2 rounded-full transition-all hover:bg-gray-100 hover:scale-110">
              <User size={20} style={{ color: 'var(--charcoal)' }} />
            </Link>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex lg:hidden items-center justify-between" style={{ height: 'var(--header-h-mobile)' }}>
          <button
            onClick={openSidebar}
            className="p-2 rounded-full transition-all hover:bg-gray-100 ml-2"
            aria-label="Open menu"
          >
            <Menu size={22} style={{ color: 'var(--charcoal)' }} />
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center select-none">
            <div
              className="text-2xl font-normal tracking-[0.2em] leading-none font-serif"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--black)' }}
            >
              RRR
            </div>
            <div className="text-[8px] font-semibold tracking-widest uppercase" style={{ color: 'var(--gold)' }}>
              Rare • Rich • Right
            </div>
          </Link>

          <div className="flex items-center gap-1">
            <button onClick={openSearch} className="p-2 rounded-full transition-all hover:bg-gray-100" aria-label="Search">
              <Search size={20} style={{ color: 'var(--charcoal)' }} />
            </button>
            <Link href="/wishlist" className="relative p-2 rounded-full transition-all hover:bg-gray-100">
              <Heart size={20} style={{ color: 'var(--charcoal)' }} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 h-3.5 w-3.5 text-[8px] font-bold rounded-full flex items-center justify-center text-white" style={{ background: 'var(--gold)' }}>
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button onClick={openCart} className="relative p-2 rounded-full transition-all hover:bg-gray-100" aria-label="Cart">
              <ShoppingBag size={20} style={{ color: 'var(--charcoal)' }} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 h-3.5 w-3.5 text-[8px] font-bold rounded-full flex items-center justify-center text-white" style={{ background: 'var(--gold)' }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
