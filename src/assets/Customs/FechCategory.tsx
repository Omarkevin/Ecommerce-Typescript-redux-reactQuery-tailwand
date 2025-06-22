import { useQuery } from "@tanstack/react-query";


interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch("https://dummyjson.com/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: FetchResponse = await response.json();

  const uniqueCategories = Array.from(
    new Set(data.products.map((product) => product.category))
  );

  return uniqueCategories;
};

export const useCategories = () => {
  return useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};
