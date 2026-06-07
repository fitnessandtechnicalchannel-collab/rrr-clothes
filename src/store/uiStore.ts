import { create } from 'zustand';

interface UIStore {
  isSidebarOpen: boolean;
  isSearchOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProductSlug: string | null;
  activeGenderTab: 'Men' | 'Women' | 'Unisex';
  activeCategoryTab: string;
  toasts: Toast[];

  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  openSearch: () => void;
  closeSearch: () => void;

  openQuickView: (slug: string) => void;
  closeQuickView: () => void;

  setGenderTab: (tab: 'Men' | 'Women' | 'Unisex') => void;
  setCategoryTab: (tab: string) => void;

  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const useUIStore = create<UIStore>((set, get) => ({
  isSidebarOpen: false,
  isSearchOpen: false,
  isQuickViewOpen: false,
  quickViewProductSlug: null,
  activeGenderTab: 'Women',
  activeCategoryTab: 'all',
  toasts: [],

  openSidebar: () => set({ isSidebarOpen: true }),
  closeSidebar: () => set({ isSidebarOpen: false }),
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),

  openQuickView: (slug) => set({ isQuickViewOpen: true, quickViewProductSlug: slug }),
  closeQuickView: () => set({ isQuickViewOpen: false, quickViewProductSlug: null }),

  setGenderTab: (tab) => set({ activeGenderTab: tab }),
  setCategoryTab: (tab) => set({ activeCategoryTab: tab }),

  addToast: (message, type = 'success') => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => get().removeToast(id), 3500);
  },

  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
