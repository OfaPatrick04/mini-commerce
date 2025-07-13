import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(i => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        });
      },
      removeItem: (id) => {
        set((state) => ({ items: state.items.filter(i => i.id !== id) }));
      },
      changeQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map(i =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'mini-commerce-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
);


// Selectors for derived state
export const getCartSubtotal = (items: CartItem[]) => items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const getCartTotal = (items: CartItem[]) => getCartSubtotal(items); // Add shipping/tax logic if needed
