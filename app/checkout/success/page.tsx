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
    <main className="p-8 min-h-[60vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-col items-center"
      >
        <Card className="max-w-lg w-full flex flex-col items-center gap-6 py-10 bg-white dark:bg-gray-900 shadow-xl">
          <CheckCircle2
            size={48}
            className="text-green-500 dark:text-green-400 mb-2"
          />
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">
            Thank You!
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            Your order was placed successfully.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Order ID:{" "}
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
              {orderId}
            </span>
          </div>
          <Button
            variant="primary"
            className="flex items-center gap-2"
            onClick={() => (window.location.href = "/")}
          >
            Continue Shopping <ArrowRight size={18} />
          </Button>
        </Card>
      </motion.div>
    </main>
  );
}
