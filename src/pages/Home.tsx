import { Link } from "react-router-dom";
import { useProducts } from "../api/products";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import Filter from "@/components/Filter";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import filter from "../assets/Group.svg";
import { ChevronUp, ChevronDown } from "lucide-react";

const shuffleArray = (array: Product[]) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const HomePage = () => {
  const { data: products, isLoading, isError, error } = useProducts();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    brand: "",
    discount: 0,
  });

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="p-6">Loading products...</p>
      </div>
    );
  if (isError)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="p-6 text-red-500">Error: {error.message}</p>
      </div>
    );

  const shuffledProducts = products ? shuffleArray(products) : [];

  const isFiltering =
    filters.brand !== "" ||
    filters.discount > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 2000;

  const filteredProducts = isFiltering
    ? shuffledProducts.filter((p) => {
        const withinPrice =
          p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];
        const brandMatch = filters.brand ? p.brand === filters.brand : true;
        const discountMatch = filters.discount
          ? p.discountPercentage >= filters.discount
          : true;

        return withinPrice && brandMatch && discountMatch;
      })
    : shuffledProducts;

  return (
    <div>
      <Navbar />
      <div className="flex justify-end px-4">
        <div className="flex gap-2 mr-6 cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
          <h2>Filter</h2>
          <img src={filter} alt="filter" className="w-4" />
        </div>
        <div className="flex gap-2 mr-6 cursor-pointer" onClick={() => setSortBy(!sortBy)}>
          <h2>Sort by</h2>
          {sortBy ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>
      <div className="flex gap-6 p-6">
        <div className="w-1/5">
          <Filter products={products} onFilter={setFilters} />
        </div>

        {/* Products */}
        <div className="grid gap-6 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] flex-1">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: Product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
