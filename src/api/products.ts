import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const API_URL = "https://fakestoreapi.com/products";

export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get<Product[]>(API_URL);
      return data;
    },
  });
};

// Single Product

export const useProduct = (id: string | undefined) => {
    return useQuery<Product, Error>({
      queryKey: ["product", id],
      queryFn: async () => {
        const { data } = await axios.get<Product>(`${API_URL}/${id}`);
        return data;
      },
      enabled: !!id, 
    });
  };