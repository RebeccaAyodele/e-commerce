import { useParams } from "react-router-dom";
import { useProduct } from "../api/products";
import { useCartStore } from "../cartStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Star from "../components/Star";
import SimiliarProduct from "../components/SimiliarProduct";
import type { Review } from "../types";
import Navbar from "@/components/Navbar";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, error } = useProduct(id);
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const handleAdd = () => {
    if (!product) return;
    addToCart({
      id: String(product.id),
      title: product.title,
      price: product.price,
      quantity: 1,
      thumbnail: product.thumbnail,
      brand: product.brand,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Loading / Error states
  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="p-6 animate-pulse">Loading products...</p>
      </div>
    );

  if (isError)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="p-6 text-red-500">Error: {error.message}</p>
      </div>
    );

  if (!product)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p>Product not found.</p>
      </div>
    );

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
    <div>
      <Navbar />

      {/* Top Section - Product Image + Info */}
      <div className="flex flex-col md:flex-row justify-evenly gap-8 mt-24 p-6">
        {/* Product Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 flex justify-center"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="object-contain h-72 rounded-lg shadow"
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex-1 flex flex-col gap-3"
        >
          <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
          <h3 className="text-gray-600">{product.brand}</h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {Star(product.rating)}
            <span className="text-sm text-gray-500">
              {product.rating} ({product.reviews.length} reviews)
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-4">
            <p className="text-xl font-semibold text-gray-900">
              ${discountedPrice}
            </p>
            <p className="line-through text-gray-400">${product.price}</p>
            <p className="text-green-600">
              {product.discountPercentage}% off
            </p>
          </div>


          {/* Add to Cart */}
          <motion.button
            onClick={handleAdd}
            disabled={isAdded}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 w-1/2 disabled:opacity-50"
          >
            {isAdded ? "Added" : "Add to Cart"}
          </motion.button>
        </motion.div>
      </div>

      {/* Tabs Section */}
      <div className="w-full flex flex-col items-center mt-12">
        {/* Tab Buttons */}
        <nav className="flex space-x-6 border-b border-gray-300 w-[80%] justify-center">
          {["details", "policies", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 font-medium text-lg transition mb-4 ${
                activeTab === tab
                  ? "text-blue-700 border-b-4 border-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "details"
                ? "Product Details"
                : tab === "policies"
                ? "Policies & Logistics"
                : "Ratings & Reviews"}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div className="p-6 w-[80%] text-left">
          <AnimatePresence mode="wait">
            {activeTab === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="font-semibold text-xl text-black/80">Product Details</h2>
                  <p className="text-gray-700">{product.description}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-xl text-black/80">Weight</h2>
                  <p>{product.weight} kg</p>
                </div>
                <div>
                  <h2 className="font-semibold text-xl text-black/80">Dimensions</h2>
                  <p>Width: {product.dimensions.width}m</p>
                  <p>Height: {product.dimensions.height}m</p>
                  <p>Depth: {product.dimensions.depth}m</p>
                </div>
              </motion.div>
            )}

            {activeTab === "policies" && (
              <motion.div
                key="policies"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="font-semibold text-xl text-black/80">Shipping Information</h2>
                  <p>{product.shippingInformation}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-xl text-black/80">Return Policy</h2>
                  <p>{product.returnPolicy}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-xl text-black/80">Warranty</h2>
                  <p>{product.warrantyInformation}</p>
                </div>
                <div>
                  <h2 className="font-semibold text-xl text-black/80">Availability</h2>
                  <p>
                    {product.availabilityStatus}: {product.stock} left
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <h2 className="text-5xl">{product.rating}</h2>
                  {Star(product.rating)}
                </div>
                {product.reviews?.length ? (
                  product.reviews.map((review: Review, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 border rounded-lg shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{review.reviewerName}</p>
                        <span className="text-sm text-gray-500">
                          {review.reviewerEmail}
                        </span>
                        <div className="flex items-center gap-1">
                          {Star(review.rating)}
                          <span>{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mt-2">{review.comment}</p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6">
          Similar Products
        </h2>
        <SimiliarProduct
          category={product.category}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
