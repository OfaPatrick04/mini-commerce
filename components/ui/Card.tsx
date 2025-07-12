"use client";
import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 rounded-lg shadow p-4 flex flex-col gap-2 transition-colors',
        'border border-gray-200 dark:border-gray-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
