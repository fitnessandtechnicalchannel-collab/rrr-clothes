'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, ChevronRight, Gift, ExternalLink, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';

const CATEGORIES = [
  { label: 'All Topwear', href: '/collections/topwear', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=120&q=70' },
  { label: 'T-Shirts', href: '/collections/t-shirts', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&q=70' },
  { label: 'Oversized', href: '/collections/oversized', img: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=120&q=70' },
  { label: 'Shirts', href: '/collections/shirts', img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=120&q=70' },
  { label: 'Hoodies', href: '/collections/hoodies', img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=120&q=70' },
  { label: 'Dresses', href: '/collections/dresses', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=120&q=70' },
  { label: 'Jeans', href: '/collections/jeans', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=120&q=70' },
  { label: 'Joggers', href: '/collections/joggers', img: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=120&q=70' },
  { label: 'Jackets', href: '/collections/jackets', img: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=120&q=70' },
];

const ACCORDION_SECTIONS = [
  {
    title: 'New Arrivals',
    links: [
      { label: 'Latest Drops', href: '/collections/new-arrivals' },
      { label: 'Trending Now', href: '/collections/trending' },
      { label: 'Fresh Arrivals', href: '/collections/new-arrivals' },
      { label: 'Best Sellers', href: '/collections/bestsellers' },
    ],
  },
  {
    title: 'Collections',
    links: [
      { label: 'Streetwear', href: '/collections/streetwear' },
      { label: 'Minimal', href: '/collections/minimal' },
      { label: 'Premium', href: '/collections/premium' },
      { label: 'Athleisure', href: '/collections/athleisure' },
      { label: 'Campus Fits', href: '/collections/campus' },
      { label: 'Party Wear', href: '/collections/party' },
    ],
  },
  {
    title: 'Sale',
    links: [
      { label: 'Under ₹999', href: '/collections/sale?max=999' },
      { label: 'Under ₹1499', href: '/collections/sale?max=1499' },
      { label: 'Under ₹1999', href: '/collections/sale?max=1999' },
      { label: 'Flat 40% Off', href: '/collections/sale?discount=40' },
      { label: 'Clearance', href: '/collections/sale?clearance=true' },
    ],
  },
];

export default function MobileSidebar() {
  const { isSidebarOpen, closeSidebar, activeGenderTab, setGenderTab } = useUIStore();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isSidebarOpen]);

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100]"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed left-0 top-0 bottom-0 z-[101] overflow-y-auto bg-white"
            style={{
              width: 'min(85vw, 400px)',
              borderRight: '1px solid rgba(212,175,55,0.2)',
              boxShadow: '8px 0 40px rgba(0,0,0,0.2)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="text-center">
                <div className="text-xl font-black tracking-widest" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.3em' }}>RRR</div>
                <div className="text-[9px] font-semibold tracking-widest uppercase" style={{ color: 'var(--gold)' }}>Rare • Rich • Right</div>
              </div>
              <button
                onClick={closeSidebar}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={20} style={{ color: 'var(--charcoal)' }} />
              </button>
            </div>

            {/* Login Card */}
            <div className="px-5 pt-5">
              <div className="rounded-xl p-4" style={{ border: '1px solid rgba(212,175,55,0.3)', background: 'var(--off-white)' }}>
                <p className="text-xs font-medium mb-1" style={{ color: 'var(--gray-dark)' }}>Welcome to RRR</p>
                <Link
                  href="/profile"
                  onClick={closeSidebar}
                  className="btn btn-outline-gold w-full text-xs py-2.5 mt-2"
                >
                  Log In / Register
                </Link>
                <div className="flex gap-3 mt-3">
                  {['Track orders', 'Save wishlist', 'Faster checkout'].map((t) => (
                    <span key={t} className="text-[10px] font-medium" style={{ color: 'var(--gray-mid)' }}>• {t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Cashback Banner */}
            <div className="mx-5 mt-4 rounded-lg px-4 py-3 flex items-center gap-3" style={{ background: 'var(--gold-gradient)' }}>
              <Gift size={18} color="#fff" />
              <p className="text-xs font-semibold text-white tracking-wide">Earn 10% Cashback on Every App Order</p>
            </div>

            {/* Gender Tabs */}
            <div className="flex gap-1 mx-5 mt-5 p-1 rounded-lg bg-gray-100">
              {(['Men', 'Women', 'Unisex'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setGenderTab(tab)}
                  className={`flex-1 py-2 rounded-md text-xs font-bold tracking-wider uppercase transition-all ${
                    activeGenderTab === tab
                      ? 'bg-white shadow-sm text-yellow-700'
                      : 'text-gray-500'
                  }`}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Categories Grid */}
            <div className="px-5 mt-5">
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>Shop by Category</p>
              <div className="grid grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    onClick={closeSidebar}
                    className="group flex flex-col items-center gap-1.5 rounded-lg p-2 transition-all hover:bg-yellow-50"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-yellow-400 transition-all">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cat.img} alt={cat.label} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-semibold text-center leading-tight" style={{ color: 'var(--charcoal)' }}>{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Accordion Nav Sections */}
            <div className="mt-5 border-t border-gray-100">
              {ACCORDION_SECTIONS.map((section) => (
                <details key={section.title} className="group">
                  <summary className="flex items-center justify-between px-5 py-3.5 cursor-pointer list-none border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-display)', color: 'var(--charcoal)', letterSpacing: '0.1em' }}>{section.title}</span>
                    <ChevronRight size={16} className="transition-transform group-open:rotate-90" style={{ color: 'var(--gold)' }} />
                  </summary>
                  <div className="px-5 py-2 bg-gray-50 border-b border-gray-100">
                    {section.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={closeSidebar}
                        className="flex items-center gap-2 py-2.5 text-sm font-medium transition-colors hover:text-yellow-700"
                        style={{ color: 'var(--gray-dark)' }}
                      >
                        <span className="w-1 h-1 rounded-full" style={{ background: 'var(--gold)' }} />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            {/* Help + Social */}
            <div className="px-5 pt-5 pb-3">
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>Help</p>
              <div className="grid grid-cols-2 gap-2">
                {['Help Center', 'FAQs', 'Shipping', 'Returns', 'Contact Us'].map((item) => (
                  <Link key={item} href="#" onClick={closeSidebar} className="text-sm font-medium py-1 transition-colors hover:text-yellow-700" style={{ color: 'var(--gray-dark)' }}>
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div className="px-5 py-4 border-t border-gray-100">
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: <ExternalLink size={18} />, label: 'Instagram' },
                  { icon: <Play size={18} />, label: 'YouTube' },
                  { icon: <ExternalLink size={18} />, label: 'Pinterest' },
                ].map((s) => (
                  <Link key={s.label} href="#" onClick={closeSidebar} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium transition-all hover:border-yellow-400 hover:text-yellow-700" style={{ color: 'var(--gray-dark)' }}>
                    {s.icon} {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* App Download */}
            <div className="px-5 pb-8">
              <button className="btn btn-gold w-full text-sm py-3 rounded-xl">
                📱 Download RRR App
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
