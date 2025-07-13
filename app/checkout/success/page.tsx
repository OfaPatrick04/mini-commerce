"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from "next/link";

function generateOrderId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default function SuccessPage() {
  const [orderId, setOrderId] = useState("");
  useEffect(() => {
    setOrderId(generateOrderId());
  }, []);

  return (
    <main className="px-2 sm:px-8 py-12 min-h-[60vh] flex flex-col items-center justify-center w-full bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-col items-center"
      >
        <Card className="max-w-xl w-full flex flex-col items-center gap-8 py-12 px-6 bg-white/80 dark:bg-gray-900/80 shadow-2xl border border-gray-200 dark:border-gray-800 rounded-2xl backdrop-blur-lg relative z-20">
          <CheckCircle2
            size={56}
            className="text-green-500 dark:text-green-400 mb-2 drop-shadow-lg"
          />
          <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-300 mb-2 text-center">
            Thank You!
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2 text-center">
            Your order was placed successfully.<br />
            We appreciate your business!
          </p>
          <div className="text-base text-gray-500 dark:text-gray-400 mb-4 text-center">
            Order ID:{" "}
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
              {orderId}
            </span>
          </div>
          <Button
            variant="primary"
            className="flex items-center gap-2 px-6 py-3 text-lg"
            onClick={() => (window.location.href = "/")}
          >
            Continue Shopping <ArrowRight size={20} />
          </Button>
          <div className="mt-6 flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400 text-center">
            <span>Free shipping on your next order</span>
            <span>Need help? <a href="/contact" className="underline text-blue-600 dark:text-blue-400">Contact support</a></span>
            <span>Follow us for updates and deals!</span>
          </div>
        </Card>
      </motion.div>
    </main>
  );
}
