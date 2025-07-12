"use client";
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import React from 'react';
import { cn } from '../../lib/utils';

export function Dialog({ children, ...props }: DialogPrimitive.DialogProps) {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
}

export function DialogTrigger(props: DialogPrimitive.DialogTriggerProps) {
  return <DialogPrimitive.Trigger {...props} />;
}

export function DialogContent({ children, className, ...props }: DialogPrimitive.DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <DialogPrimitive.Content
          {...props}
          className={cn(
            'bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-md w-full relative',
            className
          )}
        >
          <DialogPrimitive.Close className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
            <X size={20} />
          </DialogPrimitive.Close>
          {children}
        </DialogPrimitive.Content>
      </motion.div>
    </DialogPrimitive.Portal>
  );
}
