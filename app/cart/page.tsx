"use client";
import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import Card from "@/components/ui/Card";
import CartItemCard from "@/components/CartItemCard";
import Button from "@/components/ui/Button";
import { useCartStore, getCartSubtotal } from "@/app/cartStore";
import { ShoppingCart, ChevronRight } from "lucide-react";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const changeQuantity = useCartStore((s) => s.changeQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const subtotal = getCartSubtotal(items);

  // Simulate loading state
  const isLoading = false; // change to `true` to see skeletons

  return (
    <main className="min-h-[70vh] bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950 px-4 sm:px-8 py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <ShoppingCart size={36} className="text-blue-600 dark:text-blue-400" />
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          Your Cart
        </h1>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && items.length === 0 && (
        <Card className="max-w-lg mx-auto text-center py-16 bg-white/80 dark:bg-gray-900/80 shadow-2xl rounded-2xl backdrop-blur-lg">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Your cart is empty.
          </p>
          <Link href="/#catalogue" passHref>
            <Button variant="primary" className="inline-flex items-center gap-2">
               Start Shopping <ChevronRight size={20} />
            </Button>
          </Link>
        </Card>
      )}

      {/* Cart & Summary */}
      {!isLoading && items.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
          {/* Items List */}
          <div className="space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                >
                  <CartItemCard
                    item={item}
                    removeItem={removeItem}
                    changeQuantity={changeQuantity}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary Panel */}
          <div className="sticky top-24 h-fit">
            <Card className="flex flex-col gap-6 p-6 bg-white/95 dark:bg-gray-900/95 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Subtotal: ${subtotal.toFixed(2)}
              </div>

              {/* Coupon Field */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none"
                />
                <Button
                  variant="secondary"
                  onClick={() => toast.success("Coupon applied!")}
                >
                  Apply
                </Button>
              </div>

              <Button
                variant="secondary"
                className="w-full py-3 text-lg"
                onClick={() => {
                  clearCart();
                  toast("Cart cleared.", { icon: "🗑️" });
                }}
              >
                Clear Cart
              </Button>

              <Link href="/checkout" passHref>
                <Button
                  variant="primary"
                  className="w-full py-3 text-lg flex justify-center"
                >
                  Proceed to Checkout
                </Button>
              </Link>

              {/* Policy Notes */}
              <div className="mt-4 flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Free shipping on orders over $50</span>
                <span>30‑day return policy</span>
                <span>Secure checkout</span>
              </div>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
