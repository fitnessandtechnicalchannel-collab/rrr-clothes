'use client';

import { useWishlistStore } from '@/store/wishlistStore';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { discountedPrice, formatPrice } from '@/lib/utils';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem, openCart } = useCartStore();
  const { addToast } = useUIStore();

  const moveToCart = (product: (typeof items)[0]) => {
    const defaultSize = product.sizes[Math.floor(product.sizes.length / 2)] || product.sizes[0];
    const defaultColor = product.colors[0].name;
    addItem(product, defaultSize, defaultColor);
    removeItem(product.id);
    addToast(`Moved to cart!`, 'success');
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black" style={{ fontFamily: 'var(--font-display)' }}>My Wishlist</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--gray-mid)' }}>{items.length} saved items</p>
        </div>
        {items.length > 0 && (
          <button onClick={clearWishlist} className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors">
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Heart size={56} style={{ color: 'var(--gray-light)' }} />
          <h2 className="text-2xl font-bold mt-5 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Your wishlist is empty</h2>
          <p className="text-sm mb-6" style={{ color: 'var(--gray-mid)' }}>Save your favourite items and shop them later.</p>
          <Link href="/collections" className="btn btn-gold px-8 py-3">
            Browse Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          <AnimatePresence>
            {items.map((product) => {
              const finalPrice = discountedPrice(product.price, product.discount);
              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl" style={{ background: '#f8f8f8' }}>
                    <Link href={`/product/${product.slug}`}>
                      <div style={{ aspectRatio: '3/4' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-white/90 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} style={{ color: '#ef4444' }} />
                    </button>
                  </div>
                  <div className="mt-3 px-0.5">
                    <Link href={`/product/${product.slug}`}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--gold)' }}>{product.brand}</p>
                      <h3 className="text-sm font-semibold line-clamp-1 mb-1.5">{product.name}</h3>
                      <div className="flex items-baseline gap-1.5 mb-3">
                        <span className="font-bold text-sm">{formatPrice(finalPrice)}</span>
                        {product.discount > 0 && <span className="text-xs price-original">{formatPrice(product.price)}</span>}
                      </div>
                    </Link>
                    <button
                      onClick={() => moveToCart(product)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:opacity-90"
                      style={{ background: 'var(--black)', color: 'white', letterSpacing: '0.08em', fontFamily: 'var(--font-display)' }}
                    >
                      <ShoppingBag size={13} />
                      Move to Cart
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
