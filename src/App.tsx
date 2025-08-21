import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { useCartStore } from "./cartStore";
import { FaShoppingCart, FaHeart, FaUser, FaSearch, FaBars, FaTimes } from "react-icons/fa";

const App = () => {
  const totalQuantity = useCartStore((state) => state.totalQuantity());
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="p-4 bg-blue-600 text-white flex justify-between items-center relative">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight"
          style={{
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "-1px",
          }}
        >
          Cartly
        </Link>

        {/* Search Bar (desktop only) */}
        <div className="hidden md:flex flex-1 mx-6 max-w-lg">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-full text-black outline-none"
            />
            <FaSearch className="absolute right-3 top-2.5 text-gray-500" />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center text-lg">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link to="/wishlist">
            <FaHeart className="hover:text-gray-200" />
          </Link>
          <Link to="/cart" className="relative">
            <FaShoppingCart className="hover:text-gray-200" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalQuantity}
              </span>
            )}
          </Link>
          <Link to="/profile">
            <FaUser className="hover:text-gray-200" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 w-full bg-blue-700 text-white flex flex-col items-center space-y-4 py-6 z-50 md:hidden">
            <Link to="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/wishlist" onClick={() => setIsOpen(false)}>
              Wishlist
            </Link>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="relative">
              Cart
              {totalQuantity > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>
            <Link to="/profile" onClick={() => setIsOpen(false)}>
              Profile
            </Link>
          </div>
        )}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
};

export default App;
