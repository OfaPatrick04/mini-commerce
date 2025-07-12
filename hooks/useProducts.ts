import { useQuery } from '@tanstack/react-query';

export interface Product {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const PRODUCTS_KEY = 'mini-commerce-products';

function seedProductsToLocalStorage(products: Product[]) {
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }
}

async function fetchProducts(): Promise<Product[]> {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  const res = await fetch('/products.json');
  if (!res.ok) throw new Error('Failed to fetch products');
  const products: Product[] = await res.json();
  seedProductsToLocalStorage(products);
  return products;
}

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
}

export function useProduct(slug: string) {
  return useQuery<Product | undefined>({
    queryKey: ['product', slug],
    queryFn: async () => {
      const products = await fetchProducts();
      return products.find(p => p.slug === slug);
    },
    enabled: !!slug,
  });
}
