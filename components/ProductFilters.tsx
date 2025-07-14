import React from "react";
import { Search, Filter } from "lucide-react";

import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";

interface ProductFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
}

export default function ProductFilters({
  search,
  setSearch,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: ProductFiltersProps) {
  const { data: products } = useProducts();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = (products ?? [])
    .filter(
      (p) =>
        search.length > 0 && p.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 6);

  return (
    <div className="w-full mb-6 relative z-50">
      <div className="max-w-3xl mx-auto bg-white/80 dark:bg-[#2c2c38]/80 border border-[#ddd6fe] dark:border-[#4b5563] rounded-2xl shadow-lg backdrop-blur-lg p-6 flex flex-col sm:flex-row gap-6 items-center z-[110]">
        <div className="flex items-center gap-2 w-full sm:w-1/2 relative">
          <Search className="text-[#8b5cf6] dark:text-[#c4b5fd]" size={22} />
          <div className="relative flex-1">
            <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className="w-full px-4 py-2 rounded-xl border border-[#ddd6fe] dark:border-[#4b5563] bg-[#fdf4ff] dark:bg-[#2c2c38] text-[#1e1b4b] dark:text-[#f3e8ff] focus:ring-2 focus:ring-[#8b5cf6] dark:focus:ring-[#c4b5fd] transition"
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute inset-x-0 top-full mt-1 w-full bg-white dark:bg-[#2c2c38] border border-[#ddd6fe] dark:border-[#4b5563] rounded-xl shadow-2xl z-[50] max-h-64 overflow-auto">
              {suggestions.map((product) => {
                // Highlight matching part
                const name = product.name;
                const matchIndex = name
                  .toLowerCase()
                  .indexOf(search.toLowerCase());
                const before = name.slice(0, matchIndex);
                const match = name.slice(
                  matchIndex,
                  matchIndex + search.length
                );
                const after = name.slice(matchIndex + search.length);
                return (
                  <li
                    key={product.id}
                    className="px-4 py-2 cursor-pointer transition-colors text-[#1e1b4b] dark:text-[#f3e8ff] hover:bg-[#e0e7ff] dark:hover:bg-[#312e81] z-50"
                    style={{ zIndex: 101 }}
                    onMouseDown={() => {
                      setSearch(product.name);
                      setShowSuggestions(false);
                    }}
                  >
                    {matchIndex >= 0 ? (
                      <>
                        {before}
                        <span className="font-bold bg-yellow-100 dark:bg-yellow-900/40 rounded px-0.5">
                          {match}
                        </span>
                        {after}
                      </>
                    ) : (
                      name
                    )}
                  </li>
                );
              })}
            </ul>
          )}
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-1/4">
          <Filter className="text-[#f59e0b] dark:text-[#facc15]" size={20} />
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#ddd6fe] dark:border-[#4b5563] bg-[#fdf4ff] dark:bg-[#2c2c38] text-[#1e1b4b] dark:text-[#f3e8ff] focus:ring-2 focus:ring-[#f59e0b] dark:focus:ring-[#facc15] transition"
            min={0}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-1/4">
          <Filter className="text-[#f59e0b] dark:text-[#facc15]" size={20} />
          <input
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#ddd6fe] dark:border-[#4b5563] bg-[#fdf4ff] dark:bg-[#2c2c38] text-[#1e1b4b] dark:text-[#f3e8ff] focus:ring-2 focus:ring-[#f59e0b] dark:focus:ring-[#facc15] transition"
            min={0}
          />
        </div>
      </div>
    </div>
  );
}
