"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/app/cartStore';
import { useProduct } from '@/hooks/useProducts';
import { ShoppingCart, BadgeDollarSign, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const params = useParams();
  const slug =
    typeof params?.slug === 'string'
      ? params.slug
      : Array.isArray(params?.slug)
      ? params.slug[0]
      : '';
  const { data: product, isLoading, error } = useProduct(slug);
  const cartItems = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const changeQuantity = useCartStore((s) => s.changeQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  if (isLoading) {
    return (
      <main className="p-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse space-y-4 w-full max-w-3xl">
          <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="p-8 text-center text-red-600">
        Oops, we couldn’t find that product.
      </main>
    );
  }

  const cartItem = cartItems.find((i) => i.id === product.id);
  const inCart = Boolean(cartItem);
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      price: product.price,
    });
    toast.success(`${product.name} added to cart!`)
  };

  return (
    <main className="p-4 sm:p-8 bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950 min-h-screen">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/" className="hover:underline">
          Home
        </Link>{' '}
        /{' '}
        <Link href="/#catalogue" className="hover:underline">
          Products
        </Link>{' '}
        / <span className="font-semibold">{product.name}</span>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
      >
        {/* Left: Image & Thumbnails */}
        <div className="space-y-4">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              objectFit="contain"
              className="group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* <div className="flex gap-2 overflow-x-auto">
            {product.images.map((img) => (
              <div key={img} className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image src={img} alt="" width={64} height={64} objectFit="cover" />
              </div>
            ))}
          </div> */}
        </div>

        {/* Right: Details & Actions */}
        <div className="flex flex-col gap-6">
          {/* Title + Rating */}
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              {product.name}
              <BadgeDollarSign className="text-blue-400 dark:text-blue-300" size={28} />
            </h1>
            {/* Example: static rating */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.round(4) ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
            ${product.price.toFixed(2)}
            <ShoppingCart size={24} />
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {!inCart ? (
              <Button
                variant="primary"
                className="flex-1 flex items-center justify-center gap-2 py-4 text-lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} /> Add to Cart
              </Button>
            ) : (
              cartItem && (
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    className="px-4 py-2 text-xl font-bold"
                    onClick={() => {
                      if (cartItem.quantity <= 1) {
                        removeItem(product.id);
                        toast.info(`${product.name} removed from cart.`)
                      } else {
                        changeQuantity(product.id, cartItem.quantity - 1);
                      }
                    }}
                  >
                    −
                  </Button>
                  <span className="px-5 py-2 bg-blue-600 text-white rounded-lg font-bold text-lg">
                    {cartItem.quantity}
                  </span>
                  <Button
                    variant="outline"
                    className="px-4 py-2 text-xl font-bold"
                    onClick={() => changeQuantity(product.id, (cartItem?.quantity ?? 1) + 1)}
                  >
                    +
                  </Button>
                </div>
              )
            )}
          </div>

          {/* Extra actions */}
          <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
            <button className="hover:underline">Add to wishlist</button>
            <button className="hover:underline">Share</button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
