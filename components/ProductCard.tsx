"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Product } from "@/hooks/useProducts";
import { toast } from "sonner";

export interface ProductCardProps {
  product: Product;
  cartItem?: { id: string; quantity: number };
  addItem: (item: Product) => void;
  changeQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
}

export default function ProductCard({
  product,
  cartItem,
  addItem,
  changeQuantity,
  removeItem,
}: ProductCardProps) {
  const inCart = Boolean(cartItem);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block relative rounded-2xl bg-white/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 backdrop-blur-md shadow-lg hover:shadow-2xl transform transition hover:-translate-y-1 pb-6"
      aria-label={`View details for ${product.name}`}
    >
      {/* Image */}
      <div className="w-full aspect-square overflow-hidden rounded-t-xl mb-4 bg-gray-100 dark:bg-gray-800 relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'contain' }}
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Title & Description */}
      <h3 className="text-center font-extrabold text-xl text-gray-800 dark:text-gray-100 mb-2 px-6">
        {product.name}
      </h3>
      <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 px-6">
        {product.description}
      </p>

      {/* Price & Badges */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-full font-semibold">
          ${product.price.toFixed(2)}
        </span>
        {inCart && (
          <span className="inline-block px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs font-medium">
            In Cart: {cartItem!.quantity}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-center space-x-2 px-6">
        {!inCart ? (
          <Button
            variant="primary"
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
              toast.success(`${product.name} added to cart!`);
            }}
          >
            Add to Cart
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="px-3 py-1 text-lg font-bold"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const qty = cartItem!.quantity - 1;
                if (qty > 0) {
                  changeQuantity(product.id, qty);
                } else {
                  removeItem(product.id);
                  toast.info(`${product.name} removed from cart.`);
                }
              }}
            >
              −
            </Button>
            <span className="px-4 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg font-semibold">
              {cartItem!.quantity}
            </span>
            <Button
              variant="outline"
              className="px-3 py-1 text-lg font-bold"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                changeQuantity(product.id, cartItem!.quantity + 1);
              }}
            >
              +
            </Button>
          </>
        )}
      </div>
    </Link>
  );
}
