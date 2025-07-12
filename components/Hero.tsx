"use client";
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { cn } from '../lib/utils';

export default function Hero() {
  return (
    <section className={cn(
      'w-full flex flex-col items-center justify-center py-16 px-4 text-center',
      'bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950'
    )}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center gap-4"
      >
        <ShoppingCart size={48} className="text-blue-600 dark:text-blue-400 mb-2" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 dark:text-blue-300 mb-2">Welcome to Mini-Commerce</h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-xl mb-4">
          Discover, shop, and checkout with a seamless experience. Modern, fast, and responsive e-commerce built with Next.js.
        </p>
      </motion.div>
    </section>
  );
}
