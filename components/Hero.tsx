"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";
import Button from "@/components/ui/Button";

export default function Hero() {

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center items-center">
      {/* Background image and overlay only for Hero */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="w-full h-full bg-white/30 dark:bg-gray-900/70" />
      </div>

      {/* Split layout */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center h-full w-full px-4 sm:px-8 md:px-24 max-w-6xl mx-auto gap-8 md:gap-16">
        {/* Left: text & buttons */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 300 }}
          className="w-full md:w-1/2 flex flex-col gap-6"
        >
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight text-center md:text-left mb-4">
            <span className="relative inline-block">
              Mini‑Commerce
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-blue-300 dark:bg-blue-700 rounded"></span>
            </span>
          </h1>
          <p className="text-base sm:text-lg text-black dark:text-gray-300 text-center md:text-left mb-6">
            A lightning‑fast, fully responsive mini e‑commerce platform. Discover new products, add to cart, and checkout, all with a seamless UI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full">
            <Button
              variant="primary"
              size="lg"
              className="font-semibold rounded-lg shadow hover:shadow-lg transition"
              onClick={() => {
                const el = document.getElementById('catalogue');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Shop Now
            </Button>
          </div>
        </motion.div>

        {/* Right: glass‑morphic card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 300 }}
          whileHover={{ rotateY: 15, scale: 1.02 }}
          className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
        >
          <div
            className={cn(
              "relative w-40 h-40 sm:w-64 sm:h-64 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-white/30 dark:border-gray-700/30",
              "flex items-center justify-center shadow-2xl"
            )}
          >
            {/* Light mode image */}
            <Image 
              src="/my_logo_full-black.png"
              alt="Mini-Commerce Logo"
              fill
              className="object-center block dark:hidden"
            />
            {/* Dark mode image */}
            <Image 
              src="/my_logo_full-white.png"
              alt="Mini-Commerce Logo (Dark)"
              fill
              className="object-center hidden dark:block"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
