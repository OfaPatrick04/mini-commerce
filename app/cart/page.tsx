
"use client";
import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { useCartStore, getCartSubtotal } from '@/app/cartStore';
import { ShoppingCart, Trash2 } from 'lucide-react';

export default function CartPage() {
  const items = useCartStore(state => state.items);
  const removeItem = useCartStore(state => state.removeItem);
  const changeQuantity = useCartStore(state => state.changeQuantity);
  const clearCart = useCartStore(state => state.clearCart);
  const subtotal = getCartSubtotal(items);

  return (
    <main className="px-2 sm:px-8 py-8 min-h-[60vh] flex flex-col items-center w-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 text-blue-700 dark:text-blue-300 flex items-center gap-3">
        <ShoppingCart size={36} /> Cart
      </h1>
      {items.length === 0 ? (
        <Card className="max-w-lg w-full text-center py-16 bg-white/80 dark:bg-gray-900/80 shadow-xl rounded-2xl backdrop-blur-lg">
          <p className="text-xl text-gray-600 dark:text-gray-300">Your cart is empty.</p>
        </Card>
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10">
          <div className="flex flex-col gap-6">
            {items.map(item => (
              <Card key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 w-full bg-white/80 dark:bg-gray-900/80 shadow-lg rounded-xl border border-gray-200 dark:border-gray-800">
                <Image src={item.image} alt={item.name} width={80} height={80} className="w-20 h-20 object-contain rounded-xl bg-gray-100 dark:bg-gray-800 shadow" />
                <div className="flex-1 flex flex-col gap-2">
                  <h2 className="font-bold text-xl text-blue-700 dark:text-blue-300">{item.name}</h2>
                  <span className="text-gray-600 dark:text-gray-300 text-lg">${item.price.toFixed(2)}</span>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Qty:</span>
                    <button
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-lg text-lg font-bold"
                      onClick={() => item.quantity <= 1 ? removeItem(item.id) : changeQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 bg-blue-600 text-white rounded-lg font-bold text-lg">{item.quantity}</span>
                    <button
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-lg text-lg font-bold"
                      onClick={() => changeQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 sm:mt-0" onClick={() => removeItem(item.id)}>
                  <Trash2 size={20} />
                </Button>
              </Card>
            ))}
          </div>
          <div className="sticky top-24 h-fit">
            <Card className="flex flex-col gap-6 p-6 bg-white/90 dark:bg-gray-900/90 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">Subtotal: ${subtotal.toFixed(2)}</div>
              <Button variant="secondary" className="w-full py-3 text-lg" onClick={clearCart}>Clear Cart</Button>
              <Button variant="primary" className="w-full py-3 text-lg" onClick={() => window.location.href = '/checkout'}>
                Proceed to Checkout
              </Button>
              <div className="mt-4 flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Free shipping on orders over $50</span>
                <span>30-day return policy</span>
                <span>Secure checkout</span>
              </div>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
