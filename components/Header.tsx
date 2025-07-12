"use client";
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 z-50">
      <nav className="flex items-center gap-6">
        <Link href="/" className="font-bold text-xl text-blue-600 dark:text-blue-400">Mini-Commerce</Link>
        <Link href="/cart" className="text-gray-700 dark:text-gray-200 hover:underline">Cart</Link>
        <Link href="/checkout" className="text-gray-700 dark:text-gray-200 hover:underline">Checkout</Link>
      </nav>
      <ThemeToggle />
    </header>
  );
}
