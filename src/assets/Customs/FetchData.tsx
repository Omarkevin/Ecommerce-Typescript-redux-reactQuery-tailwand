import { useQuery } from '@tanstack/react-query'




  export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  keywords: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const fetchProducts = async (
  page: number,
  limit: number,
  keywords: string
): Promise<ProductsResponse> => {
  const skip = (page - 1) * limit;

  const url = keywords.trim()
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(keywords)}&limit=${limit}&skip=${skip}`
    : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Network response was not ok");

  return res.json();
};

export const useProducts = (page: number, limit: number , keywords : string) => {
  return useQuery<ProductsResponse>({
    queryKey: ["products", page, limit ,keywords ],
    queryFn: () => fetchProducts(page, limit , keywords),
  });
};