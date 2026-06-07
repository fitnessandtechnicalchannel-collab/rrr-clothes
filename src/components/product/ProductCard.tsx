'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { discountedPrice, formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { addItem, openCart } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { addToast, openQuickView } = useUIStore();

  const wishlisted = isWishlisted(product.id);
  const finalPrice = discountedPrice(product.price, product.discount);
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultSize = product.sizes[Math.floor(product.sizes.length / 2)] || product.sizes[0];
    const defaultColor = product.colors[0].name;
    addItem(product, defaultSize, defaultColor);
    addToast(`${product.name} added to cart`, 'success');
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
    addToast(
      wishlisted ? 'Removed from wishlist' : `${product.name} saved!`,
      wishlisted ? 'info' : 'success'
    );
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    openQuickView(product.slug);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.45 }}
      className="group"
    >
      <div
        className="relative overflow-hidden rounded-xl"
        style={{ background: '#f8f8f8' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link href={`/product/${product.slug}`}>
          {/* Image Container */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
            {/* Primary Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageError ? `https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80` : primaryImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
              style={{ opacity: hovered && secondaryImage !== primaryImage ? 0 : 1 }}
              onError={() => setImageError(true)}
            />

            {/* Secondary Image (hover) */}
            {secondaryImage !== primaryImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={secondaryImage}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
                style={{ opacity: hovered ? 1 : 0 }}
              />
            )}

            {/* Scale on hover */}
            <div
              className="absolute inset-0 transition-transform duration-500"
              style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
            />
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.newArrival && (
              <span className="badge badge-black text-[9px]">NEW</span>
            )}
            {product.discount > 0 && (
              <span className="badge badge-red text-[9px]">{product.discount}% OFF</span>
            )}
            {product.bestSeller && (
              <span className="badge badge-gold text-[9px]">BESTSELLER</span>
            )}
          </div>
        </Link>

        {/* Action Buttons (appear on hover) */}
        <div
          className="absolute right-3 top-3 flex flex-col gap-2 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(8px)' }}
        >
          <button
            onClick={handleWishlist}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{
              background: wishlisted ? 'var(--gold)' : 'rgba(255,255,255,0.95)',
              boxShadow: 'var(--shadow-md)',
            }}
            aria-label="Toggle wishlist"
          >
            <Heart
              size={16}
              style={{ color: wishlisted ? 'white' : 'var(--charcoal)' }}
              fill={wishlisted ? 'white' : 'none'}
            />
          </button>
          <button
            onClick={handleQuickView}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.95)', boxShadow: 'var(--shadow-md)' }}
            aria-label="Quick view"
          >
            <Eye size={16} style={{ color: 'var(--charcoal)' }} />
          </button>
        </div>

        {/* Add to Cart (slide up on hover) */}
        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-300"
          style={{ transform: hovered ? 'translateY(0)' : 'translateY(100%)', opacity: hovered ? 1 : 0 }}
        >
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90"
            style={{ background: 'var(--black)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <Link href={`/product/${product.slug}`}>
        <div className="mt-3 px-0.5">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--gold)' }}>
            {product.brand}
          </p>
          <h3 className="text-sm font-semibold line-clamp-1 mb-1.5" style={{ color: 'var(--black)' }}>
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="price-current text-sm">{formatPrice(finalPrice)}</span>
              {product.discount > 0 && (
                <span className="price-original text-xs">{formatPrice(product.price)}</span>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star size={11} fill="var(--gold)" style={{ color: 'var(--gold)' }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--gray-dark)' }}>
                {product.rating.toFixed(1)}
              </span>
              <span className="text-[10px]" style={{ color: 'var(--gray-light)' }}>
                ({product.reviewCount})
              </span>
            </div>
          </div>
          {/* Color Swatches */}
          <div className="flex gap-1 mt-2">
            {product.colors.slice(0, 4).map((c) => (
              <div
                key={c.name}
                title={c.name}
                className="w-3.5 h-3.5 rounded-full border border-gray-200"
                style={{ background: c.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] font-medium" style={{ color: 'var(--gray-mid)' }}>+{product.colors.length - 4}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
