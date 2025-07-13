
'use client';
import React from 'react';
import Image from 'next/image';
import { useProducts } from '../hooks/useProducts';
import { useCartStore } from '@/app/cartStore';
import Hero from '../components/Hero';
import { useState } from 'react';

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
        <h1 className="text-2xl font-bold mb-6">Catalogue</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center w-full">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {filtered.map(product => {
            const cartItem = cartItems.find(item => item.id === product.id);
            const inCart = !!cartItem;
            return (
              <div
                key={product.id}
                className="relative rounded-2xl p-5 flex flex-col items-center bg-white/70 dark:bg-gray-900/70 shadow-xl border border-gray-200 dark:border-gray-800 backdrop-blur-md hover:scale-[1.02] transition cursor-pointer"
                onClick={() => window.location.href = `/product/${product.slug}`}
              >
                <Image src={product.image} alt={product.name} width={96} height={96} className="w-24 h-24 object-contain mb-4 rounded-xl bg-gray-100 dark:bg-gray-800 shadow" />
                <h2 className="font-extrabold text-lg mb-1 text-blue-700 dark:text-blue-300 text-center">{product.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-center text-sm line-clamp-2">{product.description}</p>
                <span className="font-bold text-blue-600 dark:text-blue-400 mb-2 text-lg">${product.price.toFixed(2)}</span>
                <div className="mt-2 w-full flex flex-col items-center gap-2">
                  {!inCart ? (
                    <button
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                      onClick={e => {
                        e.stopPropagation();
                        addItem({
                          id: product.id,
                          name: product.name,
                          slug: product.slug,
                          image: product.image,
                          price: product.price,
                        });
                      }}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 w-full justify-center">
                      <button
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-lg text-lg font-bold"
                        onClick={e => {
                          e.stopPropagation();
                          if (cartItem.quantity <= 1) {
                            removeItem(product.id);
                          } else {
                            changeQuantity(product.id, cartItem.quantity - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold">{cartItem.quantity}</span>
                      <button
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-lg text-lg font-bold"
                        onClick={e => {
                          e.stopPropagation();
                          changeQuantity(product.id, cartItem.quantity + 1);
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
