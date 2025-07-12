
'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useProducts } from '../hooks/useProducts';
import Hero from '../components/Hero';
import { useState } from 'react';

export default function HomePage() {
  const { data, isLoading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filtered = (data ?? []).filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesMin = minPrice ? product.price >= Number(minPrice) : true;
    const matchesMax = maxPrice ? product.price <= Number(maxPrice) : true;
    return matchesSearch && matchesMin && matchesMax;
  });

  return (
    <>
      <Hero />
      <section className="p-8">
        <h1 className="text-2xl font-bold mb-6">Catalogue</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full sm:w-64"
          />
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full sm:w-32"
            min={0}
          />
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-full sm:w-32"
            min={0}
          />
        </div>
        {isLoading && <div>Loading products...</div>}
        {error && <div className="text-red-600">Error loading products.</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="border rounded-lg p-4 flex flex-col items-center bg-white dark:bg-gray-900 shadow hover:shadow-lg transition">
              <Image src={product.image} alt={product.name} width={96} height={96} className="w-24 h-24 object-contain mb-4" />
              <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{product.description}</p>
              <span className="font-bold text-blue-600 dark:text-blue-400 mb-2">${product.price.toFixed(2)}</span>
              <Link href={`/product/${product.slug}`} className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Details</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
