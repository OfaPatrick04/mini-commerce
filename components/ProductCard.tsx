import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Product } from '@/hooks/useProducts';

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    image: string;
    price: number;
    description: string;
  };
  cartItem?: { id: string; quantity: number };
  addItem: (item: Product) => void;
  changeQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

export default function ProductCard({ product, cartItem, addItem, changeQuantity, removeItem }: ProductCardProps) {
  const inCart = !!cartItem;
  return (
    <div
      className="relative rounded-2xl p-5 flex flex-col items-center bg-white/70 dark:bg-gray-900/70 shadow-xl border border-gray-200 dark:border-gray-800 backdrop-blur-md hover:scale-[1.02] transition cursor-pointer"
      onClick={() => window.location.href = `/product/${product.slug}`}
    >
      <Image src={product.image} alt={product.name} width={96} height={96} className="w-24 h-24 object-contain mb-4 rounded-xl bg-gray-100 dark:bg-gray-800 shadow" />
      <h2 className="font-extrabold text-lg mb-1 text-blue-700 dark:text-blue-300 text-center">{product.name}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-2 text-center text-sm line-clamp-2">{product.description}</p>
      <span className="font-bold text-blue-600 dark:text-blue-400 mb-2 text-lg">${product.price.toFixed(2)}</span>
      <div className="mt-2 w-full flex flex-col items-center gap-2">
        {!inCart ? (
          <Button
            variant="primary"
            className="w-full"
            onClick={e => {
              e.stopPropagation();
              addItem({
                id: product.id,
                name: product.name,
                slug: product.slug,
                image: product.image,
                price: product.price,
                description: product.description
              });
            }}
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center gap-2 w-full justify-center">
            <Button
              variant="outline"
              className="px-3 py-1 text-lg font-bold"
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
            </Button>
            <span className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold">{cartItem.quantity}</span>
            <Button
              variant="outline"
              className="px-3 py-1 text-lg font-bold"
              onClick={e => {
                e.stopPropagation();
                changeQuantity(product.id, cartItem.quantity + 1);
              }}
            >
              +
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
