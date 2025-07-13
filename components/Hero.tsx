"use client";
import React from "react";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export default function Hero() {

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950 flex flex-col justify-center items-center">
     
      {/* Split layout */}
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center h-full w-full px-4 sm:px-8 md:px-24 max-w-6xl mx-auto gap-8 md:gap-16">
        {/* Left: text & buttons */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex flex-col gap-6"
        >
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight text-center md:text-left mb-4">
            <span className="relative inline-block">
              Mini‑Commerce
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-blue-300 dark:bg-blue-700 rounded"></span>
            </span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-md text-center md:text-left mb-6">
            A lightning‑fast, fully responsive e‑commerce template. Discover new products, add to cart, and checkout—all with a seamless UI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full">
            <a
              href="#catalogue"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:shadow-lg transition"
            >
              Shop Now
            </a>
            <a
              href="#about"
              className="px-6 py-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 font-semibold rounded-lg border border-gray-200 dark:border-gray-700 shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Right: glass‑morphic card */}
        <motion.div
          whileHover={{ rotateY: 15, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
        >
          <div
            className={cn(
              "relative w-40 h-40 sm:w-64 sm:h-64 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-white/30 dark:border-gray-700/30",
              "flex items-center justify-center shadow-2xl"
            )}
          >
            <ShoppingCart size={40} className="text-blue-600 dark:text-blue-400" />
          </div>
        </motion.div>
      </div>

      {/* SVG wave at bottom */}
      {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-24 text-white dark:text-gray-900"
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <path
            d="M321.39 56.32C217.32 78.59 110.59 87.64 0 70.5V120h1200V0C1039.18 95.11 744.56 4.11 321.39 56.32z"
            fill="currentColor"
          />
        </svg>
      </div> */}
    </section>
  );
}
