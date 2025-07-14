'use client';
import React, { useState } from 'react';
import { ArrowUpCircle } from 'lucide-react';
import { useEffect, useState as useState2 } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '@/app/cartStore';
import Hero from '../components/Hero';
import ProductFilters from '../components/ProductFilters';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const { data, isLoading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const cartItems = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const changeQuantity = useCartStore((s) => s.changeQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const filtered = (data ?? []).filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesMin = minPrice ? product.price >= Number(minPrice) : true;
    const matchesMax = maxPrice ? product.price <= Number(maxPrice) : true;
    return matchesSearch && matchesMin && matchesMax;
  });

  // Show back-to-top button after scrolling down
  const [showTop, setShowTop] = useState2(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Hero />

      {/* Back to Top Button */}
      {showTop && (
        <button
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-white/80 dark:bg-gray-900/80 border border-gray-300 dark:border-gray-700 rounded-full shadow-lg p-1 sm:p-2 hover:bg-white dark:hover:bg-gray-800 transition-colors animate-bounce"
          style={{ animation: 'bounce 1.5s infinite alternate' }}
        >
          <ArrowUpCircle
            className="text-blue-600 dark:text-blue-400 w-7 h-7 sm:w-9 sm:h-9"
          />
        </button>
      )}

      <section id="catalogue" className="px-4 sm:px-8 py-8">
        {/* Header & Back-to-Top */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Catalogue
          </h2>
        </div>

        {/* Filters */}
        <ProductFilters
          search={search}
          setSearch={setSearch}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-600 mt-6">
            Error loading products.
          </p>
        )}

        {/* Empty State */}
        {!isLoading && !error && filtered.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
            No products match your filters.
          </p>
        )}

        {/* Product Grid */}
        {!isLoading && !error && filtered.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6"
          >
            <AnimatePresence>
              {filtered.map((product) => {
                const cartItem = cartItems.find((i) => i.id === product.id);
                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard
                      product={product}
                      cartItem={cartItem}
                      addItem={addItem}
                      changeQuantity={changeQuantity}
                      removeItem={removeItem}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </>
  );
}
