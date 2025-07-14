'use client';
import React, { useState } from 'react';
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

  return (
    <>
      <Hero />

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
