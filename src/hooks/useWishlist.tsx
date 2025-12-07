import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: number;
  title: string;
  artist: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
  clearWishlist: () => void;
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (item) => set((state) => {
        if (state.items.find((i) => i.id === item.id)) {
          return state;
        }
        return { items: [...state.items, item] };
      }),
      removeFromWishlist: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      isInWishlist: (id) => {
        return get().items.some((i) => i.id === id);
      },
      clearWishlist: () => set({ items: [] }),
    }),
    { name: 'vinylverse-wishlist' }
  )
);
