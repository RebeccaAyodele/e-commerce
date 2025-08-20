import { Link } from "react-router-dom";
import { useProducts } from "../api/products";

const Home = () => {
  const { data, isLoading, isError, error } = useProducts();

  if (isLoading) return <p className="p-6">Loading products...</p>;
  if (isError) return <p className="p-6 text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data?.map((product) => (
        <div
          key={product.id}
          className="border rounded-lg p-4 shadow hover:shadow-lg transition"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-40 mx-auto object-contain"
          />
          <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
          <Link
            to={`/product/${product.id}`}
            className="text-blue-500 underline block mt-2"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
