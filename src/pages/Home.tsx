import { Link } from "react-router-dom";
import { useProducts } from "../api/products";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import Filter from "@/components/Filter";
import Navbar from "@/components/Navbar";

const shuffleArray = (array: Product[]) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const HomePage = () => {
  const { data: product, isLoading, isError, error } = useProducts();
  const shuffledProducts = product ? shuffleArray(product) : []; 

  if (isLoading) return (
    <div className="w-full h-screen flex justify-center items-center">
      <p className="p-6">Loading products...</p>
    </div>
  );
  if (isError) return (
    <div className="w-full h-screen flex justify-center items-center">
      <p className="p-6 text-red-500">Error: {error.message}</p>
    </div>
  )

  return (
    <div>
      <Navbar />
      <div className="p-6 grid gap-6 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] mt-14">
      
      {shuffledProducts?.map((product: Product) => (
        <Link key={product.id} to={`/product/${product.id}`}>
          <ProductCard product={product} />
        </Link>
  ))}
      <Filter />
    </div>
    </div>
  );
};

export default HomePage;


