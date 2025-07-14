"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useCartStore, getCartSubtotal } from "@/app/cartStore";
import { ShoppingCart, BadgeDollarSign, ChevronLeft } from "lucide-react";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = getCartSubtotal(items);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();
  const [placingOrder, setPlacingOrder] = useState(false);

  const handlePlaceOrder = () => {
    setPlacingOrder(true);
    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950 px-4 sm:px-8 py-12">
      {/* Breadcrumb & Step */}
      <nav className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        /
        <Link href="/cart" className="hover:underline">
          Cart
        </Link>
        /
        <span className="font-semibold">Checkout</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
        {/* Left: Order Items */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="space-y-6 bg-white/90 dark:bg-gray-900/90 shadow-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <ShoppingCart size={28} /> Order Summary
            </h2>

            {items.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-300 py-8">
                No items in your order.
              </p>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4"
                  >
                    <span className="flex-1 font-medium text-gray-900 dark:text-gray-100">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <Link href="/cart" passHref>
              <Button
                variant="outline"
                className="mt-6 flex items-center gap-2 text-sm"
              >
                <ChevronLeft size={16} /> Back to Cart
              </Button>
            </Link>
          </Card>
        </motion.div>

        {/* Right: Total & Action */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="sticky top-24"
        >
          <Card className="flex flex-col gap-6 bg-white/95 dark:bg-gray-900/95 shadow-xl rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Total:
              </span>
              <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                ${subtotal.toFixed(2)} <BadgeDollarSign size={28} />
              </span>
            </div>

            <motion.div
              whileTap={{ scale: 0.97 }}
              className="w-full"
            >
              <Button
                variant="primary"
                className="w-full py-4 text-lg"
                onClick={handlePlaceOrder}
                disabled={items.length === 0 || placingOrder}
              >
                {placingOrder ? "Placing Order..." : "Place Order"}
              </Button>
            </motion.div>

            <div className="mt-4 flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              <span>Secure &amp; fast checkout</span>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
