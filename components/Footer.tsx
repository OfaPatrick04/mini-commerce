export default function Footer() {
  return (
    <footer className="w-full px-6 py-4 bg-gray-100 dark:bg-gray-900 text-center text-gray-600 dark:text-gray-400 mt-12">
      <p>&copy; {new Date().getFullYear()} Mini-Commerce. All rights reserved.</p>
      <p className="mt-2 text-xs">Built with Next.js, React Query, Zustand, Tailwind CSS, TypeScript.</p>
    </footer>
  );
}
