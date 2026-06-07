import { Product, Category, Banner, User, FilterState } from '@/types';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import bannersData from '@/data/banners.json';
import usersData from '@/data/users.json';

// Simulate a network delay for realistic async behavior
const delay = (ms: number = 400) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ----- PRODUCTS -----

export const getProducts = async (filters?: Partial<FilterState>): Promise<Product[]> => {
  await delay();
  let products = productsData as Product[];

  if (!filters) return products;

  if (filters.category?.length) {
    products = products.filter((p) => filters.category!.includes(p.category));
  }
  if (filters.gender?.length) {
    products = products.filter((p) =>
      filters.gender!.includes(p.gender) || p.gender === 'Unisex'
    );
  }
  if (filters.size?.length) {
    products = products.filter((p) =>
      p.sizes.some((s) => filters.size!.includes(s))
    );
  }
  if (filters.color?.length) {
    products = products.filter((p) =>
      p.colors.some((c) => filters.color!.includes(c.name))
    );
  }
  if (filters.priceMin !== undefined) {
    products = products.filter((p) => {
      const finalPrice = Math.round(p.price - (p.price * p.discount) / 100);
      return finalPrice >= filters.priceMin!;
    });
  }
  if (filters.priceMax !== undefined && filters.priceMax > 0) {
    products = products.filter((p) => {
      const finalPrice = Math.round(p.price - (p.price * p.discount) / 100);
      return finalPrice <= filters.priceMax!;
    });
  }
  if (filters.rating) {
    products = products.filter((p) => p.rating >= filters.rating!);
  }
  if (filters.availability) {
    products = products.filter((p) => p.stock > 0);
  }

  // Sort
  switch (filters.sortBy) {
    case 'price-asc':
      products = products.sort((a, b) => {
        const pa = Math.round(a.price - (a.price * a.discount) / 100);
        const pb = Math.round(b.price - (b.price * b.discount) / 100);
        return pa - pb;
      });
      break;
    case 'price-desc':
      products = products.sort((a, b) => {
        const pa = Math.round(a.price - (a.price * a.discount) / 100);
        const pb = Math.round(b.price - (b.price * b.discount) / 100);
        return pb - pa;
      });
      break;
    case 'rating':
      products = products.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      products = products.filter((p) => p.newArrival);
      break;
    default:
      break;
  }

  return products;
};

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
  await delay();
  return (productsData as Product[]).find((p) => p.slug === slug);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  await delay(300);
  return (productsData as Product[]).filter((p) => p.featured);
};

export const getNewArrivals = async (): Promise<Product[]> => {
  await delay(300);
  return (productsData as Product[]).filter((p) => p.newArrival);
};

export const getTrendingProducts = async (): Promise<Product[]> => {
  await delay(300);
  return (productsData as Product[]).filter((p) => p.trending);
};

export const getBestSellers = async (): Promise<Product[]> => {
  await delay(300);
  return (productsData as Product[]).filter((p) => p.bestSeller);
};

export const getProductsByCollection = async (collection: string): Promise<Product[]> => {
  await delay();
  return (productsData as Product[]).filter((p) => p.collection === collection);
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  await delay(200);
  const q = query.toLowerCase();
  return (productsData as Product[]).filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q))
  );
};

export const getRelatedProducts = async (product: Product): Promise<Product[]> => {
  await delay(300);
  return (productsData as Product[])
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 8);
};

// ----- CATEGORIES -----

export const getCategories = async (): Promise<Category[]> => {
  await delay(200);
  return categoriesData as Category[];
};

// ----- BANNERS -----

export const getBanners = async (): Promise<Banner[]> => {
  await delay(200);
  return bannersData as Banner[];
};

// ----- USER -----

export const getCurrentUser = async (): Promise<User> => {
  await delay(300);
  return (usersData as User[])[0];
};

// ----- SEARCH SUGGESTIONS -----

export const getTrendingSearches = async (): Promise<string[]> => {
  await delay(100);
  return [
    'Oversized Tee',
    'Cargo Pants',
    'Hoodies',
    'Denim Jacket',
    'Co-ord Set',
    'Printed Shirt',
    'Mini Dress',
    'Joggers',
  ];
};
