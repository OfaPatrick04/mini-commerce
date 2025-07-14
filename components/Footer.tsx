import { FaWhatsapp, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full px-8 py-8 bg-[#fdf4ff] dark:bg-[#1c1c24] border-t border-[rgb(221,214,254)] dark:border-[#4b5563] flex flex-col items-center gap-4 text-center">
      <div className="flex flex-col sm:flex-row gap-2 items-center justify-center w-full">
        <span className="font-bold text-lg text-[#8b5cf6] dark:text-[#c4b5fd]">Mini-Commerce</span>
        <span className="hidden sm:inline text-gray-400 mx-2">|</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} All rights reserved.</span>
      </div>
      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        Coded by <a href="https://ofapatrick.vercel.app" target="_blank" rel="noopener" className="font-bold text-[#8b5cf6] dark:text-[#c4b5fd] hover:underline">Ofa Patrick</a>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-2">
        <span className="text-sm text-gray-600 dark:text-gray-300">Phone: <span className="font-mono text-[#f59e0b] dark:text-[#facc15]">+234 816 356 3529</span></span>
        <span className="hidden sm:inline text-gray-400">|</span>
        <span className="text-sm text-gray-600 dark:text-gray-300">Email: <a href='mailto:ofapatrick04@gmail.com' className="font-mono text-[#8b5cf6] dark:text-[#c4b5fd] hover:underline">ofapatrick04@gmail.com</a></span>
      </div>
      <div className="flex gap-6 items-center justify-center mt-2">
        <a href="https://wa.me/2348163563529" target="_blank" rel="noopener" aria-label="WhatsApp" className="hover:text-[#25D366] text-xl transition">
          <FaWhatsapp />
        </a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn" className="hover:text-[#0A66C2] text-xl transition">
          <FaLinkedin />
        </a>
        <a href="https://github.com/" target="_blank" rel="noopener" aria-label="GitHub" className="hover:text-[#171515] text-xl transition">
          <FaGithub />
        </a>
      </div>
      <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
        Built with Next.js, Zustand, Tailwind CSS, TypeScript.
      </div>
    </footer>
  );
}
