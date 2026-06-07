import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function discountedPrice(price: number, discount: number): number {
  return Math.round(price - (price * discount) / 100);
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}
