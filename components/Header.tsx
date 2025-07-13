"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useCartStore } from "@/app/cartStore";

export default function Header() {
  const items = useCartStore((s) => s.items);
  const cartCount = items.length;

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const controls = useAnimation();

  // Disable body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Shrink header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Pop cart icon when count changes
  useEffect(() => {
    if (cartCount > 0) {
      controls.start({ scale: [1, 1.3, 1], transition: { duration: 0.3 } });
    }
  }, [cartCount, controls]);

  // const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/50 dark:bg-gray-900/50 shadow-md transition-all ${
        scrolled
          ? "py-2 bg-white/80 dark:bg-gray-900/80"
          : "py-4 bg-white/50 dark:bg-gray-900/50"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6">
        {/* Logo + Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold text-2xl tracking-tight transform-gpu hover:scale-105 transition"
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              🛒 Mini‑Commerce
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: "/checkout", label: "Checkout" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-gray-700 dark:text-gray-200 font-medium px-1 py-1 before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-blue-500 before:transition-[width] hover:before:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Desktop Cart + Theme */}
        <div className="hidden md:flex items-center gap-6">
          <ThemeToggle />
          <motion.div animate={controls} className="relative">
            <Link
              href="/cart"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow hover:shadow-xl transition-all font-medium text-gray-700 dark:text-gray-200"
            >
              <ShoppingCart
                size={22}
                className="text-blue-600 dark:text-blue-400 group-hover:text-pink-500 transition-colors"
              />
              <span className="hidden lg:inline">Cart</span>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow border-2 border-white dark:border-gray-900"
                  style={{ minWidth: 20, minHeight: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </motion.div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition"
        >
          <Menu size={28} className="text-blue-600 dark:text-blue-400" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay outside FocusTrap to prevent double event propagation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 h-screen"
            />
              <motion.nav
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.25 }}
                className="fixed top-0 right-0 h-screen w-[60vw] bg-white dark:bg-gray-900 z-50 shadow-xl border-l border-gray-200 dark:border-gray-800 flex flex-col p-6"
              >
                <button
                  onClick={() => setMenuOpen(false)}
                  className="self-end p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                  aria-label="Close menu"
                >
                  <X size={24} className="text-blue-600 dark:text-blue-400" />
                </button>

                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="mt-4 mb-6 text-2xl font-extrabold text-blue-600 dark:text-blue-400"
                >
                  🛒 Mini‑Commerce
                </Link>

                {[
                  { href: "/checkout", label: "Checkout" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-gray-700 dark:text-gray-200 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-6">
                  <Link
                    href="/cart"
                    onClick={() => setMenuOpen(false)}
                    className="relative flex items-center gap-3 p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 shadow border border-gray-200 dark:border-gray-700"
                  >
                    <ShoppingCart
                      size={24}
                      className="text-blue-600 dark:text-blue-400"
                    />
                    <span>Cart</span>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow border-2 border-white dark:border-gray-900">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </div>

                <div className="mt-auto">
                  <ThemeToggle />
                </div>
              </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
