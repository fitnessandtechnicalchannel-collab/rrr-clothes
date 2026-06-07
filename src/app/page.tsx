import { Metadata } from 'next';
import { getBanners, getFeaturedProducts, getNewArrivals, getTrendingProducts, getCategories } from '@/services/api';
import HeroSlider from '@/components/home/HeroSlider';
import TrustBar from '@/components/home/TrustBar';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import CategoriesGrid from '@/components/home/CategoriesGrid';
import TrendingSection from '@/components/home/TrendingSection';
import ProductGrid from '@/components/product/ProductGrid';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'RRR — Rare · Rich · Right | Premium Fashion Store',
  description: 'Discover the latest in premium fashion. Shop men & women collections, new arrivals, streetwear, oversized fits, and more.',
};

export default async function HomePage() {
  const [banners, featured, newArrivals, trending, categories] = await Promise.all([
    getBanners(),
    getFeaturedProducts(),
    getNewArrivals(),
    getTrendingProducts(),
    getCategories(),
  ]);

  return (
    <>
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Featured Collections */}
      <FeaturedCollections />

      {/* 4. New Arrivals */}
      <NewArrivalsSection products={newArrivals} />

      {/* 5. Categories Grid */}
      <CategoriesGrid categories={categories} />

      {/* 6. Trending Now */}
      <TrendingSection products={trending} />

      {/* 7. Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-subtitle mb-1">Editor&apos;s Choice</p>
            <h2 className="section-title">Featured Products</h2>
          </div>
          <Link
            href="/collections"
            className="hidden md:flex items-center gap-2 text-sm font-semibold transition-colors hover:text-yellow-700"
            style={{ color: 'var(--gold)' }}
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <ProductGrid products={featured.slice(0, 8)} />
        <div className="mt-8 text-center">
          <Link href="/collections" className="btn btn-outline-gold px-10 py-3.5 text-sm">
            Shop All Products
          </Link>
        </div>
      </section>

      {/* 8. Summer Collection Banner */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-14">
        <div
          className="relative overflow-hidden rounded-3xl"
          style={{ minHeight: '300px', background: 'linear-gradient(135deg, #111 0%, #222 100%)' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80"
            alt="Summer Collection"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.4 }}
          />
          <div className="relative flex flex-col items-center justify-center text-center p-10 md:p-16 h-full min-h-[300px]">
            <span className="badge badge-gold mb-4">Limited Time</span>
            <h2
              className="text-white text-3xl md:text-5xl font-black mb-3"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}
            >
              Summer &apos;26 Edit
            </h2>
            <p className="text-white/70 text-base mb-7 max-w-md">
              Fresh drops for the season. Lightweight fabrics, bold prints, vacation-ready fits.
            </p>
            <Link href="/collections/summer" className="btn btn-gold px-8 py-3.5 text-sm">
              Shop Summer Collection
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
