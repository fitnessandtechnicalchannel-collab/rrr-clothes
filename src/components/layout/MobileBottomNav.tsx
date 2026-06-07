'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag as Shop, Heart, ShoppingCart, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';

const TABS = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Shop', icon: Shop, href: '/collections' },
  { label: 'Wishlist', icon: Heart, href: '/wishlist' },
  { label: 'Cart', icon: ShoppingCart, href: '/cart' },
  { label: 'Profile', icon: User, href: '/profile' },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) => s.itemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <nav
      className="lg:hidden fixed left-0 right-0 z-50 flex items-center"
      style={{
        bottom: 'var(--announcement-h, 36px)',   /* sit above announcement bar */
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(212,175,55,0.15)',
        height: '60px',
        paddingBottom: 'env(safe-area-inset-bottom)',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
      }}
    >
      {TABS.map((tab) => {
        const isActive = pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));
        const badgeCount = tab.href === '/cart' ? cartCount : tab.href === '/wishlist' ? wishlistCount : 0;

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 relative group"
          >
            {isActive && (
              <motion.div
                layoutId="mobile-nav-indicator"
                className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full"
                style={{ background: 'var(--gold)' }}
              />
            )}
            <div className="relative">
              <tab.icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.8}
                style={{ color: isActive ? 'var(--gold)' : 'var(--gray-mid)', transition: 'color 0.2s' }}
              />
              {badgeCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 h-4 w-4 text-[9px] font-bold rounded-full flex items-center justify-center text-white"
                  style={{ background: isActive ? 'var(--gold)' : 'var(--charcoal)' }}
                >
                  {badgeCount > 9 ? '9+' : badgeCount}
                </span>
              )}
            </div>
            <span
              className="text-[10px] font-semibold"
              style={{ color: isActive ? 'var(--gold)' : 'var(--gray-mid)', transition: 'color 0.2s' }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
