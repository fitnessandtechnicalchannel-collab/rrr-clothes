import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  coupon: string;
  couponDiscount: number;
  isOpen: boolean;

  addItem: (product: Product, size: string, color: string, qty?: number) => void;
  removeItem: (productId: number, size: string, color: string) => void;
  updateQty: (productId: number, size: string, color: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Derived
  itemCount: () => number;
  subtotal: () => number;
  discount: () => number;
  total: () => number;
}

const VALID_COUPONS: Record<string, number> = {
  'RRR10': 10,
  'RRR20': 20,
  'FIRST15': 15,
  'SUMMER25': 25,
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: '',
      couponDiscount: 0,
      isOpen: false,

      addItem: (product, size, color, qty = 1) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.size === size && i.color === color
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.size === size && i.color === color
                  ? { ...i, qty: i.qty + qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, size, color, qty }] };
        });
      },

      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product.id === productId && i.size === size && i.color === color)
          ),
        }));
      },

      updateQty: (productId, size, color, qty) => {
        if (qty <= 0) {
          get().removeItem(productId, size, color);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId && i.size === size && i.color === color
              ? { ...i, qty }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [], coupon: '', couponDiscount: 0 }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      applyCoupon: (code) => {
        const discount = VALID_COUPONS[code.toUpperCase()];
        if (discount) {
          set({ coupon: code.toUpperCase(), couponDiscount: discount });
          return true;
        }
        return false;
      },

      removeCoupon: () => set({ coupon: '', couponDiscount: 0 }),

      itemCount: () => get().items.reduce((acc, i) => acc + i.qty, 0),

      subtotal: () =>
        get().items.reduce((acc, i) => {
          const price = Math.round(i.product.price - (i.product.price * i.product.discount) / 100);
          return acc + price * i.qty;
        }, 0),

      discount: () => {
        const sub = get().subtotal();
        const couponDiscount = get().couponDiscount;
        return couponDiscount > 0 ? Math.round((sub * couponDiscount) / 100) : 0;
      },

      total: () => get().subtotal() - get().discount(),
    }),
    { name: 'rrr-cart' }
  )
);
