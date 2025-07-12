"use client";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "../../lib/utils";

import { ComponentPropsWithoutRef, forwardRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<typeof motion.button> & {
  variant?: "primary" | "secondary" | "outline";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
          variant === "primary" &&
            "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
          variant === "secondary" &&
            "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
          variant === "outline" &&
            "border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950",
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
