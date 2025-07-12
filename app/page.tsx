
'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface Product {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const PRODUCTS_KEY = 'mini-commerce-products';

function seedProductsToLocalStorage(products: Product[]) {
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }
}

async function fetchProducts(): Promise<Product[]> {
  // Try localStorage first
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Fallback: fetch from local JSON
  const res = await fetch('/products.json');
  if (!res.ok) throw new Error('Failed to fetch products');
  const products: Product[] = await res.json();
  seedProductsToLocalStorage(products);
  return products;
}

export default function HomePage() {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <main className="p-8">Loading products...</main>;
  }
  if (error) {
    return <main className="p-8 text-red-600">Error loading products.</main>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Catalogue</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map(product => (
          <div key={product.id} className="border rounded-lg p-4 flex flex-col items-center bg-white shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-24 h-24 object-contain mb-4" />
            <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <span className="font-bold text-blue-600 mb-2">${product.price.toFixed(2)}</span>
            <a href={`/product/${product.slug}`} className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">View Details</a>
          </div>
        ))}
      </div>
    </main>
  );
}
