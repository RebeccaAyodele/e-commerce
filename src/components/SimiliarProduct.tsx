import { useProducts } from "../api/products";
import type { Product } from "../types";
import LoadingSpinner from "./LoadingSpinner";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

interface SimilarProductProps {
  category: string;
  currentProductId: number;
}

const SimiliarProduct = ({ category, currentProductId }: SimilarProductProps) => {
    const {data: products, isLoading, isError, error } = useProducts();

    if (isLoading) <LoadingSpinner />
  if (isError) return (
    <div className="w-full h-screen flex justify-center items-center">
      <p className="p-6 text-red-500">Error: {error.message}</p>
    </div>
  );

  const similiar = products?.filter((product: Product) => product.category === category && product.id !== currentProductId).slice(0, 6);
  if (similiar && similiar.length > 0) {
    return (
      <div className="md:p-6 p-2 grid md:gap-6 gap-2 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] grid-cols-[repeat(auto-fit,minmax(150px,1fr))]  mt-6">
        {similiar.map((product: Product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    )
  } 
}

export default SimiliarProduct