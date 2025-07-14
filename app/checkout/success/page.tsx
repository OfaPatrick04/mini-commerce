"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, Copy } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { toast } from "sonner";

function generateOrderId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default function SuccessPage() {
  const [orderId, setOrderId] = useState("");

  // fire confetti on mount
  useEffect(() => {
    setOrderId(generateOrderId());
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  const copyOrderId = useCallback(() => {
    navigator.clipboard.writeText(orderId).then(() => {
      toast.success("Order ID copied to clipboard!");
    });
  }, [orderId]);

  return (
    <main className="px-2 sm:px-8 py-12 min-h-screen flex flex-col items-center justify-center w-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        <Card className="flex flex-col items-center gap-6 p-8 bg-white/90 dark:bg-gray-900/90 shadow-2xl border border-gray-200 dark:border-gray-800 rounded-2xl backdrop-blur-lg">
          <CheckCircle2
            size={64}
            className="text-green-500 dark:text-green-400 drop-shadow-lg"
          />

          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 text-center">
            Thank You!
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            Your order has been placed successfully.
          </p>

          {/* Order ID + Copy */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
            <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">
              {orderId}
            </span>
            <Button
              variant="outline"
              // size="icon"
              onClick={copyOrderId}
              aria-label="Copy order ID"
              className="p-1"
            >
              <Copy size={16} />
            </Button>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <motion.div whileTap={{ scale: 0.95 }} className="flex-1">
              <Link href="/" passHref>
                <Button variant="primary" className="w-full py-3 flex items-center justify-center gap-2 text-lg">
                  Continue Shopping <ArrowRight size={20} />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="mt-6 flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400 text-center">
            <span>Free shipping on your next order</span>
            <span>
              Need help?{" "}
              <Link href="/contact" className="underline text-blue-600 dark:text-blue-400">
                Contact support
              </Link>
            </span>
            <span>Follow us on social for exclusive deals!</span>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}
