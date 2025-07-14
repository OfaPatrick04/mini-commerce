"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export interface CartItemCardProps {
  item: {
    id: string;
    slug: string; // used for linking back to product
    name: string;
    image: string;
    price: number;
    quantity: number;
  };
  removeItem: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  removeItem,
  changeQuantity,
}) => {
  const lineTotal = (item.price * item.quantity).toFixed(2);

  const handleRemove = () => {
    removeItem(item.id);
    toast.error(`${item.name} removed from cart.`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="flex flex-row items-center gap-6 p-6 bg-white/90 dark:bg-gray-900/90 shadow-lg rounded-xl border border-gray-200 dark:border-gray-800 transition-shadow hover:shadow-2xl">
        {/* Product Image */}
        <Link
          href={`/product/${item.slug}`}
          passHref
          className="flex-shrink-0 relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 transition-transform group-hover:scale-105"
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            objectFit="contain"
            className="rounded-xl"
          />
        </Link>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-1">
          <Link
            href={`/product/${item.slug}`}
            passHref
            className="font-bold text-lg text-gray-900 dark:text-gray-100 hover:underline"
          >
            {item.name}
          </Link>
          <div className="flex items-baseline gap-3">
            <span className="text-blue-600 dark:text-blue-400 text-lg font-semibold">
              ${item.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              × {item.quantity}
            </span>
            <span className="ml-auto font-bold text-gray-900 dark:text-gray-100">
              ${lineTotal}
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2 mt-2">
            <Button
              variant="outline"
              className="px-3 py-1 text-lg font-bold"
              onClick={() => {
                if (item.quantity <= 1) handleRemove();
                else changeQuantity(item.id, item.quantity - 1);
              }}
              aria-label={`Decrease quantity of ${item.name}`}
            >
              −
            </Button>
            <motion.span
              layout
              className="px-4 py-1 bg-blue-600 text-white rounded-lg font-bold text-lg"
            >
              {item.quantity}
            </motion.span>
            <Button
              variant="outline"
              className="px-3 py-1 text-lg font-bold"
              onClick={() => changeQuantity(item.id, item.quantity + 1)}
              aria-label={`Increase quantity of ${item.name}`}
            >
              +
            </Button>
          </div>
        </div>

        {/* Remove Button */}
        <Button
          variant="outline"
          className="mt-4 sm:mt-0"
          onClick={handleRemove}
          aria-label={`Remove ${item.name} from cart`}
        >
          <Trash2 size={20} />
        </Button>
      </Card>
    </motion.div>
  );
};

export default CartItemCard;
