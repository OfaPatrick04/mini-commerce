"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useProduct } from '@/hooks/useProducts';
import { ShoppingCart, BadgeDollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/app/cartStore';
import { ToastProvider, Toast, ToastTitle, ToastDescription } from '@/components/ui/Toast';


export default function ProductDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : '';
  const { data: product, isLoading, error } = useProduct(slug);
  const addItem = useCartStore(state => state.addItem);
  const [showToast, setShowToast] = useState(false);

  if (isLoading) {
    return <main className="p-8">Loading product...</main>;
  }
  if (error || !product) {
    return <main className="p-8 text-red-600">Product not found.</main>;
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price: product.price,
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <ToastProvider>
      <main className="p-8 flex justify-center items-center min-h-[60vh]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-center"
        >
          <Card className="max-w-xl w-full flex flex-col md:flex-row gap-8 items-center md:items-start bg-white dark:bg-gray-900 shadow-xl">
            <Image src={product.image} alt={product.name} width={160} height={160} className="w-40 h-40 object-contain rounded-lg bg-gray-100 dark:bg-gray-800" />
            <div className="flex-1 flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                {product.name}
                <BadgeDollarSign size={28} className="text-blue-400 dark:text-blue-300" />
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{product.description}</p>
              <span className="font-bold text-2xl text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
                ${product.price.toFixed(2)}
                <ShoppingCart size={22} className="text-blue-500 dark:text-blue-400" />
              </span>
              <Button variant="primary" className="w-full md:w-auto flex items-center gap-2" onClick={handleAddToCart}>
                <ShoppingCart size={18} /> Add to Cart
              </Button>
            </div>
          </Card>
        </motion.div>
        {showToast && (
          <Toast open={showToast} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <ToastTitle>Added to Cart</ToastTitle>
            <ToastDescription>{product.name} has been added to your cart.</ToastDescription>
          </Toast>
        )}
      </main>
    </ToastProvider>
  );
}
