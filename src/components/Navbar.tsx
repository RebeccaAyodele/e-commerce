import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../cartStore";
import { ShoppingCart, Heart, User, Search, Menu, X } from "lucide-react";
import { auth } from "./Firebase";
import { useState } from "react";

const categories = ["beauty", "groceries", "furniture"];

const Navbar = () => {
  const totalQuantity = useCartStore((state) => state.totalQuantity());
  const user = auth.currentUser;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-24">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 border-b bg-white flex justify-between items-center p-4"
      >
        {/* Left: Logo */}
        <div
          className="text-2xl font-extrabold tracking-tight"
          style={{
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "-1px",
          }}
        >
          Cartly
        </div>

        {/* Desktop Categories */}
        <div className="hidden md:flex gap-4">
          {categories.map((cat) => (
            <NavLink
              key={cat}
              to={`/category/${cat}`}
              className={({ isActive }) =>
                `px-3 py-1 rounded ${
                  isActive ? "text-blue-500" : "text-black/80"
                }`
              }
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </NavLink>
          ))}
          <NavLink to="/" className="px-3 py-1 rounded">
            All
          </NavLink>
        </div>

        {/* Icons + Search */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search (desktop) */}
          <div className="hidden md:flex relative">
            <input
              type="text"
              placeholder="Search here"
              className="w-64 px-4 py-2 rounded text-black outline-none bg-gray-200"
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-700"
              size={22}
            />
          </div>

          {/* Icons always visible */}
          <NavLink to="/wishlist">
            <Heart className="text-black/80" strokeWidth={1.7} />
          </NavLink>
          <NavLink to="/cart" className="relative">
            <ShoppingCart className="text-black/80" strokeWidth={1.7} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalQuantity}
              </span>
            )}
          </NavLink>
          <NavLink to="/profile" className="flex items-center gap-1">
            <User className="text-black/80" strokeWidth={1.7} />
            <span className="text-sm">{user?.displayName || "User"}</span>
          </NavLink>

          {/* Hamburger (mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown for Categories */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 md:hidden">
          <div className="flex flex-col gap-3">
            {categories.map((cat) => (
              <NavLink
                key={cat}
                to={`/category/${cat}`}
                className="text-black/80 px-3 py-2 rounded hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </NavLink>
            ))}
            <NavLink
              to="/"
              className="text-black/80 px-3 py-2 rounded hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              All
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
