
"use client";
import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/app/cartStore';
import { ShoppingCart, BadgeDollarSign, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const items = useCartStore(state => state.items);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const clearCart = useCartStore(state => state.clearCart);
  const router = useRouter();
  const [placingOrder, setPlacingOrder] = useState(false);

  const handlePlaceOrder = () => {
    setPlacingOrder(true);
    setTimeout(() => {
      clearCart();
      router.push('/checkout/success');
    }, 1200);
  };

  return (
    <main className="p-8 min-h-[60vh] flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-blue-700 dark:text-blue-300 flex items-center gap-2">
        <CheckCircle2 size={32} /> Checkout
      </h1>
      <Card className="max-w-2xl w-full p-6 flex flex-col gap-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {items.length === 0 ? (
          <p className="text-lg text-gray-600 dark:text-gray-300">Your cart is empty.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {items.map(item => (
              <li key={item.id} className="flex items-center gap-4">
                <ShoppingCart size={22} className="text-blue-500 dark:text-blue-400" />
                <span className="font-semibold text-blue-700 dark:text-blue-300">{item.name}</span>
                <span className="text-gray-600 dark:text-gray-300">x{item.quantity}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between items-center mt-6">
          <span className="text-lg font-bold text-blue-700 dark:text-blue-300">Total:</span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            ${subtotal.toFixed(2)} <BadgeDollarSign size={24} />
          </span>
        </div>
        <Button
          variant="primary"
          className="mt-8 w-full flex items-center justify-center gap-2"
          onClick={handlePlaceOrder}
          disabled={items.length === 0 || placingOrder}
        >
          {placingOrder ? 'Placing Order...' : 'Place Order'}
        </Button>
      </Card>
    </main>
  );
}
