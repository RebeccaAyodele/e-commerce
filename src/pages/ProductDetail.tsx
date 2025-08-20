import { useParams } from "react-router-dom";
import { useProduct } from "../api/products";

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useProduct(id);

  if (isLoading) return <p className="p-6">Loading product...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Error: {error.message}</p>;
  if (!data) return <p>Product not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={data?.image}
        alt={data?.title}
        className="h-64 mx-auto object-contain"
      />
      <h1 className="text-2xl font-bold mt-4">{data?.title}</h1>
      <p className="text-gray-600 mt-2">${data?.price}</p>
      <p className="mt-4">{data?.description}</p>
      <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;
