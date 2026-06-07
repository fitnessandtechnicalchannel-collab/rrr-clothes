'use client';

import { useState } from 'react';
import { Heart, ShoppingBag, Zap, Star, ChevronRight, Minus, Plus, RotateCcw, Truck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { discountedPrice, formatPrice } from '@/lib/utils';
import ProductGrid from '@/components/product/ProductGrid';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const { addItem, openCart } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { addToast } = useUIStore();

  const wishlisted = isWishlisted(product.id);
  const finalPrice = discountedPrice(product.price, product.discount);
  const savings = product.price - finalPrice;

  const handleAddToCart = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addItem(product, selectedSize, selectedColor, qty);
    addToast(`${product.name} added to cart!`, 'success');
    openCart();
  };

  const handleBuyNow = () => {
    if (!selectedSize) { setSizeError(true); return; }
    setSizeError(false);
    addItem(product, selectedSize, selectedColor, qty);
    window.location.href = '/checkout';
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--gray-mid)' }}>
        <Link href="/" className="hover:text-yellow-700 transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link href="/collections" className="hover:text-yellow-700 transition-colors">Collections</Link>
        <ChevronRight size={12} />
        <Link href={`/collections/${product.category.toLowerCase()}`} className="hover:text-yellow-700 transition-colors">{product.category}</Link>
        <ChevronRight size={12} />
        <span className="line-clamp-1" style={{ color: 'var(--charcoal)' }}>{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        {/* LEFT: Gallery */}
        <div>
          {/* Main Image */}
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl mb-3"
            style={{ aspectRatio: '3/4', background: '#f8f8f8' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount > 0 && (
              <div className="absolute top-4 left-4">
                <span className="badge badge-red">{product.discount}% OFF</span>
              </div>
            )}
          </motion.div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className="w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 transition-all"
                style={{
                  border: `2px solid ${selectedImage === i ? 'var(--gold)' : 'transparent'}`,
                  opacity: selectedImage === i ? 1 : 0.65,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div>
          {/* Brand + Rating */}
          <div className="flex items-start justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--gold)' }}>{product.brand}</p>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    fill={i < Math.round(product.rating) ? 'var(--gold)' : 'none'}
                    style={{ color: 'var(--gold)' }}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold" style={{ color: 'var(--charcoal)' }}>{product.rating}</span>
              <span className="text-xs" style={{ color: 'var(--gray-mid)' }}>({product.reviewCount} reviews)</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-black mb-4" style={{ fontFamily: 'var(--font-display)', lineHeight: '1.2' }}>
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-3xl font-black price-current">{formatPrice(finalPrice)}</span>
            {product.discount > 0 && (
              <>
                <span className="text-lg price-original">{formatPrice(product.price)}</span>
                <span className="badge badge-red text-sm">{product.discount}% OFF</span>
              </>
            )}
          </div>
          {savings > 0 && (
            <p className="text-sm mb-4" style={{ color: '#16a34a' }}>You save {formatPrice(savings)}</p>
          )}

          {/* Color Selector */}
          <div className="mb-5">
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--charcoal)' }}>
              Color: <span style={{ color: 'var(--gold)' }}>{selectedColor}</span>
            </p>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  title={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className="w-8 h-8 rounded-full transition-all hover:scale-110"
                  style={{
                    background: color.hex,
                    border: selectedColor === color.name ? '3px solid var(--gold)' : '2px solid #e5e7eb',
                    outline: selectedColor === color.name ? '2px solid rgba(212,175,55,0.3)' : 'none',
                    outlineOffset: '2px',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-5">
            <p className={`text-sm font-semibold mb-2 ${sizeError ? 'text-red-500' : ''}`} style={sizeError ? {} : { color: 'var(--charcoal)' }}>
              {sizeError ? '⚠ Please select a size' : 'Size'}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setSizeError(false); }}
                  className="min-w-[48px] h-11 px-3 rounded-xl text-sm font-semibold border transition-all hover:border-yellow-400"
                  style={{
                    background: selectedSize === size ? 'var(--gold)' : 'white',
                    color: selectedSize === size ? 'white' : 'var(--charcoal)',
                    borderColor: selectedSize === size ? 'var(--gold)' : sizeError ? '#ef4444' : '#e5e7eb',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Qty */}
          <div className="flex items-center gap-4 mb-6">
            <p className="text-sm font-semibold" style={{ color: 'var(--charcoal)' }}>Quantity</p>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-gray-100">
                <Minus size={14} />
              </button>
              <span className="w-12 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-gray-100">
                <Plus size={14} />
              </button>
            </div>
            <p className="text-xs" style={{ color: product.stock < 10 ? '#ef4444' : 'var(--gray-mid)' }}>
              {product.stock < 10 ? `Only ${product.stock} left!` : `${product.stock} in stock`}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3 mb-6">
            <button onClick={handleAddToCart} className="btn btn-black flex-1 py-4 gap-2">
              <ShoppingBag size={18} />
              Add to Cart
            </button>
            <button
              onClick={() => toggleItem(product)}
              className="w-14 h-14 rounded-xl flex items-center justify-center transition-all hover:scale-105"
              style={{
                background: wishlisted ? 'rgba(212,175,55,0.1)' : 'white',
                border: `1.5px solid ${wishlisted ? 'var(--gold)' : '#e5e7eb'}`,
              }}
              aria-label="Toggle wishlist"
            >
              <Heart size={20} fill={wishlisted ? 'var(--gold)' : 'none'} style={{ color: wishlisted ? 'var(--gold)' : 'var(--charcoal)' }} />
            </button>
          </div>
          <button onClick={handleBuyNow} className="btn btn-gold w-full py-4 mb-6 gap-2">
            <Zap size={18} />
            Buy Now
          </button>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 py-4 border-y border-gray-100 mb-5">
            {[
              { icon: Truck, label: 'Free Delivery', sub: 'Above ₹999' },
              { icon: RotateCcw, label: 'Easy Returns', sub: '30 days' },
              { icon: Shield, label: '100% Genuine', sub: 'Authentic only' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center">
                <item.icon size={20} style={{ color: 'var(--gold)' }} />
                <p className="text-xs font-semibold mt-1.5" style={{ color: 'var(--charcoal)' }}>{item.label}</p>
                <p className="text-[10px]" style={{ color: 'var(--gray-mid)' }}>{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--gold)' }}>About this Product</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--gray-dark)' }}>{product.description}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {product.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'var(--gray-pale)', color: 'var(--gray-dark)' }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <div className="mb-6">
            <p className="section-subtitle mb-1">You May Also Like</p>
            <h2 className="section-title">Related Products</h2>
          </div>
          <ProductGrid products={relatedProducts.slice(0, 4)} />
        </section>
      )}
    </div>
  );
}
