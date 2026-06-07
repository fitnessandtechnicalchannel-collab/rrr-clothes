import { getProducts, getCategories } from '@/services/api';
import CollectionsClient from '../CollectionsClient';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `${name} Collection`,
    description: `Shop the ${name} collection at RRR. Premium fashion for the modern generation.`,
  };
}

export default async function CollectionSlugPage({ params }: Props) {
  const { slug } = await params;
  const [allProducts, categories] = await Promise.all([getProducts(), getCategories()]);

  // Filter products based on slug (collection, category, gender, etc.)
  let filtered = allProducts;
  if (slug === 'new-arrivals') filtered = allProducts.filter((p) => p.newArrival);
  else if (slug === 'trending') filtered = allProducts.filter((p) => p.trending);
  else if (slug === 'bestsellers') filtered = allProducts.filter((p) => p.bestSeller);
  else if (slug === 'men') filtered = allProducts.filter((p) => p.gender === 'Men' || p.gender === 'Unisex');
  else if (slug === 'women') filtered = allProducts.filter((p) => p.gender === 'Women' || p.gender === 'Unisex');
  else {
    // Try matching by collection or category slug
    const byCollection = allProducts.filter((p) => p.collection === slug);
    const byCategory = allProducts.filter((p) => p.category.toLowerCase().replace(/ /g, '-') === slug);
    filtered = byCollection.length ? byCollection : byCategory.length ? byCategory : allProducts;
  }

  return <CollectionsClient initialProducts={filtered} categories={categories} />;
}
