export interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  category: string;
  subcategory?: string;
  gender: 'Men' | 'Women' | 'Unisex';
  price: number;
  discount: number;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: ProductColor[];
  images: string[];
  featured: boolean;
  newArrival: boolean;
  trending?: boolean;
  bestSeller?: boolean;
  description: string;
  tags: string[];
  stock: number;
  collection?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  gender?: 'Men' | 'Women' | 'Unisex' | 'All';
  productCount?: number;
}

export interface Banner {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  image: string;
  mobileImage?: string;
  badge?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  addresses: Address[];
  orders: Order[];
}

export interface Address {
  id: string;
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled';
  items: OrderItem[];
  total: number;
}

export interface OrderItem {
  productId: number;
  name: string;
  image: string;
  size: string;
  color: string;
  qty: number;
  price: number;
}

export interface CartItem {
  product: Product;
  size: string;
  color: string;
  qty: number;
}

export interface FilterState {
  category: string[];
  gender: string[];
  size: string[];
  color: string[];
  priceMin: number;
  priceMax: number;
  rating: number;
  availability: boolean;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
