'use client';

import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  cols?: 2 | 3 | 4;
}

export default function ProductGrid({ products, cols = 4 }: ProductGridProps) {
  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[cols];

  return (
    <div className={`grid ${gridClass} gap-4 md:gap-5`}>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
