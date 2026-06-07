import { getProductBySlug, getProducts, getRelatedProducts } from '@/services/api';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} — RRR Fashion`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product);
  return <ProductDetailClient product={product} relatedProducts={related} />;
}
