
"use client";
import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { useCartStore } from '@/app/cartStore';
import { ShoppingCart, Trash2 } from 'lucide-react';

export default function CartPage() {
  const items = useCartStore(state => state.items);
  const removeItem = useCartStore(state => state.removeItem);
  const changeQuantity = useCartStore(state => state.changeQuantity);
  const clearCart = useCartStore(state => state.clearCart);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="p-8 min-h-[60vh] flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-blue-700 dark:text-blue-300 flex items-center gap-2">
        <ShoppingCart size={32} /> Cart
      </h1>
      {items.length === 0 ? (
        <Card className="max-w-lg w-full text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-300">Your cart is empty.</p>
        </Card>
      ) : (
        <div className="w-full max-w-2xl flex flex-col gap-6">
          {items.map(item => (
            <Card key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4">
              <Image src={item.image} alt={item.name} width={64} height={64} className="w-16 h-16 object-contain rounded bg-gray-100 dark:bg-gray-800" />
              <div className="flex-1 flex flex-col gap-2">
                <h2 className="font-semibold text-lg text-blue-700 dark:text-blue-300">{item.name}</h2>
                <span className="text-gray-600 dark:text-gray-300">${item.price.toFixed(2)}</span>
                <div className="flex items-center gap-2">
                  <label htmlFor={`qty-${item.id}`} className="text-sm text-gray-500 dark:text-gray-400">Qty:</label>
                  <input
                    id={`qty-${item.id}`}
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e => changeQuantity(item.id, Number(e.target.value))}
                    className="w-16 px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
              <Button variant="outline" className="mt-2 sm:mt-0" onClick={() => removeItem(item.id)}>
                <Trash2 size={18} /> Remove
              </Button>
            </Card>
          ))}
          <Card className="flex flex-col items-end gap-4 p-4">
            <div className="text-xl font-bold text-blue-700 dark:text-blue-300">Subtotal: ${subtotal.toFixed(2)}</div>
            <Button variant="secondary" onClick={clearCart}>Clear Cart</Button>
            <Button variant="primary" className="mt-2" onClick={() => window.location.href = '/checkout'}>
              Proceed to Checkout
            </Button>
          </Card>
        </div>
      )}
    </main>
  );
}
