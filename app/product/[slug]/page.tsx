"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/app/cartStore';
import { useProduct } from '@/hooks/useProducts';
import { ShoppingCart, BadgeDollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';


export default function ProductDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : '';
  const { data: product, isLoading, error } = useProduct(slug);
  const cartItems = useCartStore(state => state.items);
  const addItem = useCartStore(state => state.addItem);
  const changeQuantity = useCartStore(state => state.changeQuantity);
  const removeItem = useCartStore(state => state.removeItem);
  // No need for showToast state with Sonner

  if (isLoading) {
    return <main className="p-8">Loading product...</main>;
  }
  if (error || !product) {
    return <main className="p-8 text-red-600">Product not found.</main>;
  }

  const cartItem = cartItems.find(item => item.id === product.id);
  const inCart = !!cartItem;
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price: product.price,
    });
    toast.success(`${product.name} added to cart!`, {
      description: 'Check your cart for details.',
    });
  };

  return (
    <main className="p-4 sm:p-8 flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex justify-center"
      >
        <div className="max-w-3xl w-full flex flex-col md:flex-row gap-10 items-center md:items-start bg-white/80 dark:bg-gray-900/80 shadow-2xl border border-gray-200 dark:border-gray-800 rounded-2xl backdrop-blur-lg p-8">
          <div className="flex-shrink-0 sticky top-24">
            <Image src={product.image} alt={product.name} width={240} height={240} className="w-60 h-60 object-contain rounded-xl bg-gray-100 dark:bg-gray-800 shadow-lg" />
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-3">
              {product.name}
              <BadgeDollarSign size={32} className="text-blue-400 dark:text-blue-300" />
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-lg leading-relaxed">{product.description}</p>
            <span className="font-bold text-2xl sm:text-3xl text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-2">
              ${product.price.toFixed(2)}
              <ShoppingCart size={24} className="text-blue-500 dark:text-blue-400" />
            </span>
            <div className="flex flex-col gap-4 mt-4">
              {!inCart ? (
                <Button variant="primary" className="w-full md:w-auto flex items-center gap-2 text-lg py-3 px-6" onClick={handleAddToCart}>
                  <ShoppingCart size={20} /> Add to Cart
                </Button>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg text-xl font-bold"
                    onClick={() => cartItem.quantity <= 1 ? removeItem(product.id) : changeQuantity(product.id, cartItem.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-lg">{cartItem.quantity}</span>
                  <button
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg text-xl font-bold"
                    onClick={() => changeQuantity(product.id, cartItem.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
            <div className="mt-8 flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Free shipping on orders over $50</span>
              <span>30-day return policy</span>
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
