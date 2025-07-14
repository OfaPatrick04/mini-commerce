"use client";
import React, { forwardRef, ComponentPropsWithoutRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ComponentPropsWithoutRef<typeof motion.button> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
}

const spinnerSvg = (
  <svg
    className="animate-spin h-5 w-5 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

const hoverTapVariants = {
  hover: { scale: 1.03 },
  tap: { scale: 0.97 },
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600",
  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
  outline:
    "border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 focus:ring-blue-500 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      iconBefore,
      iconAfter,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const base = cn(
      "inline-flex items-center justify-center font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    return (
      <motion.button
        ref={ref}
        {...props}
        disabled={disabled || isLoading}
        variants={hoverTapVariants}
        whileHover="hover"
        whileTap="tap"
        className={base}
      >
        {isLoading ? (
          spinnerSvg
        ) : (
          <>
            {iconBefore && <span className="mr-2">{iconBefore}</span>}
            {children}
            {iconAfter && <span className="ml-2">{iconAfter}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
