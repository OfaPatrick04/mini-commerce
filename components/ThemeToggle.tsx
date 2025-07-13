"use client";
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="sticky top-4 right-4 flex items-center z-50">
      <span className="mr-2"><Sun size={18} className={isDark ? 'text-gray-400' : 'text-yellow-400'} /></span>
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        aria-label="Toggle dark mode"
        className={
          `relative w-12 h-6 flex items-center bg-gray-200 dark:bg-gray-800 rounded-full px-1 transition-colors focus:outline-none`
        }
      >
        <span
          className={
            `absolute left-1 top-1 w-4 h-4 rounded-full bg-white dark:bg-gray-900 shadow transform transition-transform duration-300 ${isDark ? 'translate-x-6' : ''}`
          }
        />
      </button>
      <span className="ml-2"><Moon size={18} className={isDark ? 'text-blue-600' : 'text-gray-400'} /></span>
    </div>
  );
}
