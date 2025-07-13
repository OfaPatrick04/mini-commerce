import React from 'react';
import { Search, Filter } from 'lucide-react';

interface ProductFiltersProps {
  search: string;
  setSearch: (val: string) => void;
  minPrice: string;
  setMinPrice: (val: string) => void;
  maxPrice: string;
  setMaxPrice: (val: string) => void;
}

export default function ProductFilters({ search, setSearch, minPrice, setMinPrice, maxPrice, setMaxPrice }: ProductFiltersProps) {
  return (
    <div className="w-full mb-6">
      <div className="max-w-3xl mx-auto bg-white/80 dark:bg-[#2c2c38]/80 border border-[#ddd6fe] dark:border-[#4b5563] rounded-2xl shadow-lg backdrop-blur-lg p-6 flex flex-col sm:flex-row gap-6 items-center">
        <div className="flex items-center gap-2 w-full sm:w-1/2">
          <Search className="text-[#8b5cf6] dark:text-[#c4b5fd]" size={22} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#ddd6fe] dark:border-[#4b5563] bg-[#fdf4ff] dark:bg-[#2c2c38] text-[#1e1b4b] dark:text-[#f3e8ff] focus:ring-2 focus:ring-[#8b5cf6] dark:focus:ring-[#c4b5fd] transition"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-1/4">
          <Filter className="text-[#f59e0b] dark:text-[#facc15]" size={20} />
          <input
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
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
            onChange={e => setMaxPrice(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-[#ddd6fe] dark:border-[#4b5563] bg-[#fdf4ff] dark:bg-[#2c2c38] text-[#1e1b4b] dark:text-[#f3e8ff] focus:ring-2 focus:ring-[#f59e0b] dark:focus:ring-[#facc15] transition"
            min={0}
          />
        </div>
      </div>
    </div>
  );
}
