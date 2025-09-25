import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../cartStore";
import { useWishlistStore } from "../wishlistStore";
import { ShoppingCart, Heart, User, Search, Menu, X } from "lucide-react";
import { auth } from "./Firebase";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";

const categories = ["beauty", "groceries", "furniture"];

const Navbar = () => {
  const totalQuantity = useCartStore((state) => state.totalQuantity());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    // Pass search query via URL
    navigate(
      `${location.pathname}?search=${encodeURIComponent(search.trim())}`
    );
  };

  return (
    <div className="mb-24">
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full z-50 border-b bg-white flex flex-wrap justify-between items-center p-4"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 select-none">
          <span
            className="px-4 py-1  from-blue-500 via-purple-500 to-pink-500 text-2xl font-extrabold tracking-tight"
            style={{
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "-1px",
              color: "#2563eb",
              textShadow: "0 2px 8px #b3c6ff",
            }}
          >
            Cartly
          </span>
        </div>

        {/* Desktop Categories */}
        <div className="hidden md:flex gap-4">
          {categories.map((cat) => (
            <NavLink
              key={cat}
              to={`/category/${cat}`}
              className={({ isActive }) =>
                `relative px-3 py-1 rounded transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600 font-bold"
                    : "text-black/80 hover:text-blue-500"
                }`
              }
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
              {/* Animated underline for active */}
              {location.pathname === `/category/${cat}` && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-1 bg-blue-500 rounded"
                />
              )}
            </NavLink>
          ))}
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `relative px-3 py-1 rounded transition-colors duration-200 ${
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-black/80 hover:text-blue-500"
              }`
            }
          >
            All
          </NavLink>
        </div>

        {/* Icons + Search */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search (desktop) */}
          <form className="hidden md:flex relative" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 px-4 py-2 rounded text-black outline-none bg-gray-200"
            />
            <button type="submit">
              <Search
                className="absolute right-3 top-2.5 text-gray-700"
                size={22}
              />
            </button>
          </form>

          {/* Icons */}
          <NavLink to="/wishlist" className="relative">
            {({ isActive }: { isActive: boolean }) => (
              <>
                <Heart
                  strokeWidth={1.7}
                  className={isActive ? "text-blue-600" : "text-black/80"}
                  fill={isActive ? "#2563eb" : "none"}
                />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </>
            )}
          </NavLink>

          <NavLink to="/cart" className="relative">
            {({ isActive }: { isActive: boolean }) => (
              <>
                <ShoppingCart
                  strokeWidth={1.7}
                  className={isActive ? "text-blue-600" : "text-black/80"}
                  fill={isActive ? "#2563eb" : "none"}
                />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {totalQuantity}
                  </span>
                )}
              </>
            )}
          </NavLink>

          <NavLink to="/profile" className="flex items-center gap-1">
            {({ isActive }: { isActive: boolean }) => (
              <>
                <User
                  strokeWidth={1.7}
                  className={isActive ? "text-blue-600" : "text-black/80"}
                  fill={isActive ? "#2563eb" : "none"}
                />
                <span className="text-sm">
                  {firebaseUser?.displayName || firebaseUser?.email || "User"}
                </span>
              </>
            )}
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

      {/* Mobile Dropdown */}
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
              to="/home"
              className="text-black/80 px-3 py-2 rounded hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              All
            </NavLink>
            {/* Mobile Search */}
            <form className="mt-2 flex" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search here"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-3 py-2 rounded bg-gray-200"
              />
              <button type="submit" className="ml-2">
                <Search className="text-gray-700" size={22} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
