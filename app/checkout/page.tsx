
"use client";
import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useCartStore, getCartSubtotal } from '@/app/cartStore';
import { ShoppingCart, BadgeDollarSign, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const items = useCartStore(state => state.items);
  const subtotal = getCartSubtotal(items);
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
    <main className="px-2 sm:px-8 py-8 min-h-[60vh] flex flex-col items-center w-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-10 text-blue-700 dark:text-blue-300 flex items-center gap-3">
        <CheckCircle2 size={36} /> Checkout
      </h1>
      <Card className="max-w-2xl w-full p-8 flex flex-col gap-8 bg-white/80 dark:bg-gray-900/80 shadow-2xl border border-gray-200 dark:border-gray-800 rounded-2xl backdrop-blur-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300 flex items-center gap-2">
          <ShoppingCart size={28} className="text-blue-500 dark:text-blue-400" /> Order Summary
        </h2>
        {items.length === 0 ? (
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center py-8">Your cart is empty.</p>
        ) : (
          <ul className="flex flex-col gap-6">
            {items.map(item => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="font-semibold text-blue-700 dark:text-blue-300">{item.name}</span>
                <span className="text-gray-600 dark:text-gray-300">x{item.quantity}</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between items-center mt-8">
          <span className="text-xl font-bold text-blue-700 dark:text-blue-300">Total:</span>
          <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            ${subtotal.toFixed(2)} <BadgeDollarSign size={28} />
          </span>
        </div>
        <Button
          variant="primary"
          className="mt-10 w-full flex items-center justify-center gap-2 py-4 text-lg"
          onClick={handlePlaceOrder}
          disabled={items.length === 0 || placingOrder}
        >
          {placingOrder ? 'Placing Order...' : 'Place Order'}
        </Button>
        <div className="mt-6 flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400 text-center">
          <span>Free shipping on orders over $50</span>
          <span>30-day return policy</span>
          <span>Secure checkout</span>
        </div>
      </Card>
    </main>
  );
}
