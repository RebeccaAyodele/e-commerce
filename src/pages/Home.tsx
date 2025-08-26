import { Link } from "react-router-dom";
import { useProducts } from "../api/products";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";

const shuffleArray = (array: Product[]) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const HomePage = () => {
  const { data: product, isLoading, isError, error } = useProducts();
  const shuffledProducts = product ? shuffleArray(product) : []; 

  if (isLoading) return <p className="p-6">Loading products...</p>;
  if (isError) return <p className="p-6 text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6 grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] mt-14">
      
      {shuffledProducts?.map((product: Product) => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <ProductCard product={product} />
        </Link>
  ))}
    </div>
  );
};

export default HomePage;


