"use client";
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { motion } from 'framer-motion';
import React from 'react';
import { cn } from '../../lib/utils';

export function Popover({ children, ...props }: PopoverPrimitive.PopoverProps) {
  return <PopoverPrimitive.Root {...props}>{children}</PopoverPrimitive.Root>;
}

export function PopoverTrigger(props: PopoverPrimitive.PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger {...props} />;
}

export function PopoverContent({ children, className, ...props }: PopoverPrimitive.PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="z-50"
      >
        <PopoverPrimitive.Content
          {...props}
          className={cn(
            'bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-800',
            className
          )}
        >
          {children}
        </PopoverPrimitive.Content>
      </motion.div>
    </PopoverPrimitive.Portal>
  );
}
