import { useWishlistStore } from "../wishlistStore";
import { useCartStore } from "../cartStore";
import { Link, useLocation } from "react-router-dom";
import { X, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Wishlist() {
  const items = useWishlistStore((state) => state.items);
  const removeFromWishlist = useWishlistStore(
    (state) => state.removeFromWishlist
  );
  const addToCart = useCartStore((state) => state.addToCart);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search")?.toLowerCase() || "";

  const filteredItems = searchQuery
    ? items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery) ||
          item.brand?.toLowerCase().includes(searchQuery)
      )
    : items;

  return (
    <div>
      <Navbar />
      <div className="w-full mx-auto mt-24 p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Your Wishlist</h2>
        {items.length === 0 ? (
          <p className="text-gray-500 text-center">Your wishlist is empty.</p>
        ) : (
          <div className="flex flex-wrap gap-4 w-full items-center justify-center">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 flex flex-col items-center relative bg-white shadow hover:shadow-lg transition w-[250px] h-[300px]"
              >
                {/* Remove button top right */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  aria-label="Remove from wishlist"
                >
                  <X size={20} />
                </button>
                <Link
                  to={`/product/${item.id}`}
                  className="w-full flex flex-col items-center"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-32 object-contain mb-2"
                  />
                  <h3 className="font-semibold text-center">{item.title}</h3>
                </Link>
                <p className="text-gray-600 mb-2">${item.price}</p>
                <button
                  onClick={() => {
                    addToCart({
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      quantity: 1,
                      thumbnail: item.thumbnail,
                      brand: item.brand,
                    });
                    removeFromWishlist(item.id);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mt-2 flex items-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
