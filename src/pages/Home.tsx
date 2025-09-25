import { Link, useLocation } from "react-router-dom";
import { useProducts } from "../api/products";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import Filter from "@/components/Filter";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import filter from "../assets/Group.svg";
import LoadingSpinner from "@/components/LoadingSpinner";

const shuffleArray = (array: Product[]) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const HomePage = () => {
  const { data: products, isLoading, isError, error } = useProducts();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>("none");
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    brand: "",
    discount: 0,
  });

  const sortOptions = [
    { value: "none", label: "None" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "discount-desc", label: "Discount: High to Low" },
    { value: "name-asc", label: "Name: A-Z" },
    { value: "name-desc", label: "Name: Z-A" },
  ];

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search")?.toLowerCase() || "";

  if (isLoading) <LoadingSpinner />
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

  // Add search filter
  const searchedProducts = searchQuery
    ? filteredProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery) ||
          p.brand?.toLowerCase().includes(searchQuery)
      )
    : filteredProducts;

  // Sorting logic
  const sortedProducts = [...searchedProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "discount-desc":
        return b.discountPercentage - a.discountPercentage;
      case "name-asc":
        return a.title.localeCompare(b.title);
      case "name-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  return (
    <div>
      <Navbar />
      <div className="flex justify-end px-4">
        {/* Toggle Filters */}
        <div
          className="flex gap-2 mr-6 cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        >
          <h2>Filter</h2>
          <img src={filter} alt="filter" className="w-4" />
        </div>

        {/* Sort Dropdown */}
        <div className="flex gap-2 mr-6 items-center">
          <h2>Sort by</h2>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-6 p-6">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-1/5 hidden md:block">
            <Filter products={products} onFilter={setFilters} />
          </div>
        )}

        {showFilters && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start md:hidden">
            <div className="relative w-full h-full bg-white p-6 overflow-y-auto">
              {/* Close button */}
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
                onClick={() => setShowFilters(false)}
              >
                ✕
              </button>

              <h2 className="text-lg font-semibold mb-4">Filter</h2>
              <Filter products={products} onFilter={setFilters} />
            </div>
          </div>
        )}

        {/* Products */}
        <div
          className={`grid gap-6 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] ${
            showFilters ? "flex-1" : "w-full"
          }`}
        >
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product: Product) => (
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
