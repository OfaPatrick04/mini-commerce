
'use client';
import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '@/app/cartStore';
import Hero from '../components/Hero';
import { useState } from 'react';
import ProductFilters from '../components/ProductFilters';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const { data, isLoading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const cartItems = useCartStore(state => state.items);
  const addItem = useCartStore(state => state.addItem);
  const changeQuantity = useCartStore(state => state.changeQuantity);
  const removeItem = useCartStore(state => state.removeItem);

  const filtered = (data ?? []).filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesMin = minPrice ? product.price >= Number(minPrice) : true;
    const matchesMax = maxPrice ? product.price <= Number(maxPrice) : true;
    return matchesSearch && matchesMin && matchesMax;
  });

  return (
    <>
      <Hero />
      <section id='catalogue' className="px-4 sm:px-8 py-8">
        <h1 className="text-2xl font-bold mb-6"></h1>
        <ProductFilters
          search={search}
          setSearch={setSearch}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
        {isLoading && <div>Loading products...</div>}
        {error && <div className="text-red-600">Error loading products.</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {filtered.map(product => {
            const cartItem = cartItems.find(item => item.id === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                cartItem={cartItem}
                addItem={addItem}
                changeQuantity={changeQuantity}
                removeItem={removeItem}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
