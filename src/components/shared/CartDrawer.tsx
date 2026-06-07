'use client';

import { useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { discountedPrice, formatPrice } from '@/lib/utils';
import { useState } from 'react';

export default function CartDrawer() {
  const { isOpen, items, closeCart, removeItem, updateQty, subtotal, total, discount, coupon, couponDiscount, applyCoupon, removeCoupon } = useCartStore();
  const { addToast } = useUIStore();
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleCoupon = () => {
    const success = applyCoupon(couponInput);
    if (success) {
      addToast(`Coupon ${couponInput.toUpperCase()} applied!`, 'success');
      setCouponError('');
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[150]"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          <motion.div
            className="fixed right-0 top-0 bottom-0 z-[151] flex flex-col bg-white"
            style={{ width: 'min(420px, 100vw)', boxShadow: '-8px 0 40px rgba(0,0,0,0.15)' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} style={{ color: 'var(--gold)' }} />
                <h2 className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                  Your Cart
                  {items.length > 0 && (
                    <span className="ml-2 text-sm font-medium" style={{ color: 'var(--gray-mid)' }}>
                      ({items.reduce((a, i) => a + i.qty, 0)} items)
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <X size={18} style={{ color: 'var(--charcoal)' }} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
                  <ShoppingBag size={48} style={{ color: 'var(--gray-light)' }} />
                  <h3 className="font-bold text-lg mt-4 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Your cart is empty</h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--gray-mid)' }}>Add some amazing pieces to get started!</p>
                  <Link href="/collections" onClick={closeCart} className="btn btn-gold px-6 py-2.5 text-xs">
                    Browse Collections
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {items.map((item) => {
                    const price = discountedPrice(item.product.price, item.product.discount);
                    return (
                      <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3 p-4">
                        <Link href={`/product/${item.product.slug}`} onClick={closeCart}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-20 h-24 object-cover rounded-lg flex-shrink-0"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-semibold line-clamp-1" style={{ color: 'var(--black)' }}>{item.product.name}</p>
                              <p className="text-[11px] mt-0.5" style={{ color: 'var(--gray-mid)' }}>
                                {item.size} • {item.color}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id, item.size, item.color)}
                              className="p-1 rounded hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={13} style={{ color: '#ef4444' }} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => updateQty(item.product.id, item.size, item.color, item.qty - 1)}
                                className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-gray-100"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                              <button
                                onClick={() => updateQty(item.product.id, item.size, item.color, item.qty + 1)}
                                className="w-7 h-7 flex items-center justify-center transition-colors hover:bg-gray-100"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <p className="font-bold text-sm" style={{ color: 'var(--black)' }}>
                              {formatPrice(price * item.qty)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Section */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-5 py-4 space-y-3">
                {/* Coupon */}
                {!coupon ? (
                  <div>
                    <div className="flex gap-2">
                      <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                        <Tag size={14} style={{ color: 'var(--gold)' }} />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
                          placeholder="Enter coupon code"
                          className="flex-1 text-sm outline-none bg-transparent"
                          onKeyDown={(e) => e.key === 'Enter' && handleCoupon()}
                        />
                      </div>
                      <button
                        onClick={handleCoupon}
                        className="px-4 py-2 rounded-lg text-xs font-bold transition-all hover:opacity-90"
                        style={{ background: 'var(--gold)', color: 'white' }}
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-xs text-red-500 mt-1">{couponError}</p>}
                  </div>
                ) : (
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)' }}>
                    <div className="flex items-center gap-2">
                      <Tag size={14} style={{ color: 'var(--gold)' }} />
                      <span className="text-xs font-bold" style={{ color: 'var(--gold)' }}>{coupon} — {couponDiscount}% Off</span>
                    </div>
                    <button onClick={removeCoupon} className="text-xs text-gray-400 hover:text-red-500 transition-colors">
                      Remove
                    </button>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm" style={{ color: 'var(--gray-dark)' }}>
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal())}</span>
                  </div>
                  {discount() > 0 && (
                    <div className="flex justify-between text-sm" style={{ color: '#16a34a' }}>
                      <span>Coupon Discount</span>
                      <span>−{formatPrice(discount())}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm" style={{ color: 'var(--gray-mid)' }}>
                    <span>Shipping</span>
                    <span>{subtotal() >= 999 ? <span style={{ color: '#16a34a' }}>Free</span> : '₹99'}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100" style={{ color: 'var(--black)' }}>
                    <span>Total</span>
                    <span>{formatPrice(total() + (subtotal() < 999 ? 99 : 0))}</span>
                  </div>
                </div>

                <Link href="/checkout" onClick={closeCart} className="btn btn-gold w-full text-sm py-3.5">
                  Proceed to Checkout
                </Link>
                <button onClick={closeCart} className="w-full text-center text-xs font-medium" style={{ color: 'var(--gray-mid)' }}>
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
