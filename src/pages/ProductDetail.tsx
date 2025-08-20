import { useParams } from "react-router-dom";
import { useProduct } from "../api/products";
import { useCartStore } from "../cartStore";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError, error } = useProduct(id);
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdded, setIsAdded] = useState(false)

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
    }, 1000)
  };

  if (isLoading) return <p className="p-6">Loading product...</p>;
  if (isError) return <p className="p-6 text-red-500">Error: {error.message}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={product.image}
        alt={product.title}
        className="h-64 mx-auto object-contain"
      />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-600 mt-2">${product.price}</p>
      <p className="mt-4">{product.description}</p>
      <button
        onClick={handleAdd}
        disabled={isAdded}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isAdded ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductDetail;
