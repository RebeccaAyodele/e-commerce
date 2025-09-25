import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type WishlistItem = {
  id: string;
  title: string;
  price: number;
  thumbnail?: string;
  brand?: string;
};

type WishlistState = {
  items: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist<WishlistState>(
    (set) => ({
      items: [],
      addToWishlist: (item) =>
        set((state) => {
          if (state.items.find((i) => i.id === item.id)) return state;
          return { items: [...state.items, item] };
        }),
      removeFromWishlist: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
