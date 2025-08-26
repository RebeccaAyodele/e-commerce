import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://dummyjson.com/products";


const fetchProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data.products;
}

const fetchProduct = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  console.log("fetchProduct response:", res.data);
  return res.data;
}

const fetchProductsByCategory = async (category: string) => {
  const res = await axios.get(`${API_URL}/category/${category}`);
  return res.data.products;
}

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export const useProduct = (id?: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });
}

export const useProductsByCategory = (category?: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProductsByCategory(category!),
    enabled: !!category,
  });
}