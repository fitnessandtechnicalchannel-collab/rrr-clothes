import { Metadata } from 'next';
import { getProducts, getCategories } from '@/services/api';
import CollectionsClient from './CollectionsClient';

export const metadata: Metadata = {
  title: 'All Collections',
  description: 'Browse all RRR fashion collections. Filter by category, size, color, price, and more.',
};

export default async function CollectionsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return <CollectionsClient initialProducts={products} categories={categories} />;
}
