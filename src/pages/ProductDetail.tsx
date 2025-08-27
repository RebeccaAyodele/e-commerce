import { useParams } from "react-router-dom";
import { useProduct } from "../api/products";
import { useCartStore } from "../cartStore";
import { useState } from "react";
import Star from "../components/Star";
import SimiliarProduct from "../components/SimiliarProduct";
import type { Review } from "../types";
import Navbar from "@/components/Navbar";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, error } = useProduct(id);
  console.log("product from hook:", product);
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
    });
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };


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
  if (!product) return (
    <div className="w-full h-screen flex justify-center items-center">
      <p>Product not found.</p>;
    </div>
  )

  return (
    <div>
      <Navbar />
      {/* Picture */}
      <div className="flex justify-evenly mt-24">
        <div>
          <img src={product.thumbnail} alt={product.title} />
        </div>
        <div>
          <h1 className="text-lg font-bold">{product.title}</h1>
          <h3>{product.brand}</h3>
          <div>{product.rating}{Star(product.rating)}{product.reviews.length} reviews</div>
          <span className="flex items-center justify-evenly">
            <p>${(product.price * (product.discountPercentage / 100)).toFixed(2)}</p>
            <p className="line-through text-black/60">${product.price}</p>
            <p className="text-green-600 text-xs">({product.discountPercentage}% off)</p>
          </span>
          <h2>Select Size</h2>
          <p>Size Chart</p>
          <div></div>
          <button
            onClick={handleAdd}
            disabled={isAdded}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isAdded ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
        <nav className="flex space-x-4 w-[80%] justify-evenly mb-6 border-b-[1px] border-black/60">
          <button
          onClick={() => setActiveTab("details")}
          className={`p-4 rounded ${
            activeTab === "details" ? "text-blue-500 underline" : "text-black/60"
          }`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab("Policies & Logistics")}
          className={`p-4 rounded ${
            activeTab === "Policies & Logistics" ? "text-blue-500 underline" : "text-black/60"
          }`}
        >
          Policies & Logistics
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`p-4 rounded ${
            activeTab === "reviews" ? "text-blue-500 underline" : "text-black/60"
          }`}
        >
          Ratings & Reviews
        </button>
        </nav>
        <div className="p-6 w-full text-left">
          {/* Product Details */}
        {activeTab === "details" && 
          <div>
            <div>
                <h2>Product Details</h2>
                <p>{product.description}</p>
            </div>
            <div>
              <h2>Weight</h2>
              <p>{product.weight}kg</p>
            </div>
            <div>
              <h2>Dimensions</h2>
              <p>Width: {product.dimensions.width}m</p>
              <p>Height: {product.dimensions.height}m</p>
              <p>Depth: {product.dimensions.depth}m</p>
            </div>
          </div>}
        {activeTab === "Policies & Logistics" && 
          <div>
            <div>
              <h2>Shipping Information</h2>
              <p>{product.shippingInformation}</p>
            </div>
            <div>
              <h2>Return Policy</h2>
              <p>{product.returnPolicy}</p>
            </div>
            <div>
              <h2>Warranty</h2>
              <p>{product.warrantyInformation}</p>
            </div>
            <div>
              <h2>Availability Status</h2>
              <p>{product.availabilityStatus}: {product.stock} left</p>
            </div>
          </div>  
        }
        {activeTab === "reviews" && 
        <div>
          <p>Ratings</p>
          <span>
            <h2>{product.rating}</h2>
            <p>{Star(product.rating)}</p>
          </span>
          {product.reviews?.length ? (
            product.reviews.map((review: Review, index: number) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <p>{review.reviewerName}</p>
                <p className="font-semibold">{review.reviewerEmail}</p>
                <span>
                  {Star(review.rating)} {review.rating}
                </span>
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
            </div>
      ))
    ) : (
      <p>No reviews yet.</p>
    )}
        </div>
        }
      </div>
      </div>

      {/* Similiar Products */}
      <div>
        <h2 className="text-2xl font-bold text-center">Similar Products</h2>
        <SimiliarProduct category={product.category} currentProductId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetail;
