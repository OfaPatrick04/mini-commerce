# Mini-Commerce

## Project Overview

Mini-Commerce is a client-side prototype of a boutique e-commerce shop. Visitors can browse a catalogue, view product details, manage a cart, and complete a mock checkout. All state persists via localStorage. No backend required.

## Features

- **Catalogue** (`/`): Browse at least 8 products (image, name, price). Data is fetched with React Query from a local JSON file and seeded to localStorage.
- **Product Detail** (`/product/[slug]`): View full product info and add to cart.
- **Cart** (`/cart`): Change quantity, remove items, view subtotal/total. Cart state is managed by Zustand and persists to localStorage.
- **Checkout Flow** (`/checkout` → success): Review order, place order, and see a thank-you page with a random order ID.
- **Extras**: Responsive design, dark mode, glassmorphic cards, animated transitions, search/filters (optional).

## Design Approach

- **Modern, mobile-first**: Responsive grid/flex layouts using Tailwind CSS utilities and custom classes.
- **Accessibility**: Semantic HTML, keyboard navigation, alt text on all images.
- **Visual polish**: Glassmorphism, sticky summaries, smooth animations.

## Tools & Techniques

- [Next.js 14 (App Router)](https://nextjs.org)
- [React 19](https://react.dev)
- [TypeScript (strict mode)](https://www.typescriptlang.org/)
- [React Query](https://tanstack.com/query/latest) (catalogue fetching, caching, loading/error UI)
- [Zustand](https://zustand-demo.pmnd.rs/) (cart state, selectors, persistence)
- [Tailwind CSS](https://tailwindcss.com) (utility-first styling)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [Lucide React](https://lucide.dev/) (icons)
- [Sonner](https://sonner.emilkowal.com/) (toasts)
- **Testing**: At least one React component test (Jest + RTL) or Playwright e2e
- **Linting/Formatting**: ESLint & Prettier (must pass)

## SEO Strategy

- Meta tags, Open Graph, and Twitter cards for all pages
- Structured data (JSON-LD) for enhanced search visibility
- Image optimization with `next/image`
- Fast, mobile-first performance

## Error Handling

- Graceful UI for failed catalogue fetch, cart edge cases, and unknown routes
- Error boundaries for React errors
- User-friendly toasts and fallback screens

## Getting Started

```bash
npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

- Edit `app/page.tsx` for the product catalogue
- Update color scheme in `globals.css` and UI components for branding

## License

MIT
