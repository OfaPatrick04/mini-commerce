"use client";
import * as ToastPrimitive from '@radix-ui/react-toast';
import { motion } from 'framer-motion';
import React from 'react';
import { cn } from '../../lib/utils';

export function ToastProvider({ children }: { children: React.ReactNode }) {
  return <ToastPrimitive.Provider>{children}</ToastPrimitive.Provider>;
}

export function Toast({ children, className, ...props }: ToastPrimitive.ToastProps) {
  return (
    <ToastPrimitive.Root {...props}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={cn(
          'bg-white dark:bg-gray-900 rounded shadow px-4 py-2 border border-gray-200 dark:border-gray-800',
          className
        )}
      >
        {children}
      </motion.div>
    </ToastPrimitive.Root>
  );
}

export function ToastTitle({ children, className, ...props }: ToastPrimitive.ToastTitleProps) {
  return <ToastPrimitive.Title className={cn('font-bold', className)} {...props}>{children}</ToastPrimitive.Title>;
}

export function ToastDescription({ children, className, ...props }: ToastPrimitive.ToastDescriptionProps) {
  return <ToastPrimitive.Description className={cn('text-sm', className)} {...props}>{children}</ToastPrimitive.Description>;
}
