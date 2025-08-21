import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "https://dummyjson.com/products";

// 🔹 Normalizer so UI doesn’t break if API changes
export const normalizeProduct = (p: any) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  description: p.description,
  discountPercentage: p.discountPercentage,
  rating: p.rating,
  stock: p.stock,
  brand: p.brand,
  category: p.category,
  thumbnail: p.thumbnail,
  images: p.images || [],
});

// 🔹 Fetch all products
const fetchProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data.products.map(normalizeProduct);
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

// 🔹 Fetch single product by id
const fetchProduct = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return normalizeProduct(res.data);
};

export const useProduct = (id?: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });
};
