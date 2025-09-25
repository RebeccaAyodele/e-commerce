import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useProductsByCategory } from "../api/products";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CategoryPage() {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { data: products, isLoading, isError, error } = useProductsByCategory(categoryName ?? "");

  if (isLoading) return <LoadingSpinner />
  if (isError) return <p className="p-6 text-red-500">Error: {(error).message}</p>;

  return (
    <div>
      <Navbar />
      <div className="p-6 grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] mt-24">
      {products?.map((product: Product) => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
    </div>
  );
}
