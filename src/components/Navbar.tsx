import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useCartStore } from "../cartStore";
import {Home, ShoppingCart, Heart, User, Search } from "lucide-react";
import { auth } from "./Firebase";

const categories = ["beauty", "groceries", "furniture"];

const Navbar = () => {
    const totalQuantity = useCartStore((state) => state.totalQuantity());
    const user = auth.currentUser;
  return (
    <div className="m-h-screen">
        <motion.nav initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed md:top-0 bottom-0 sm:bottom-auto w-full z-50 border-b bg-white flex justify-between p-4">
        <div className="flex items-center space-x-4">
          <div
          className="text-2xl font-extrabold tracking-tight hidden md:inline"
          style={{
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "-1px",
          }}
        >
          Cartly
        </div>
        <div className="md:flex hidden gap-4 mb-6">
        {categories.map(cat => (
          <NavLink
            key={cat}
            to={`/category/${cat}`}
            className={({ isActive }) =>
        `px-3 py-1 rounded ${isActive ? " text-blue-500" : "text-black/80"}`
      }
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </NavLink>
        ))}
        <NavLink to="/" className="px-3 py-1 rounded ">All</NavLink>
      </div>
        </div>

        {/* Search Bar (desktop only) */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex mx-6">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Search here"
              className="w-80 px-4 py-2 rounded text-black outline-none bg-gray-200"
            />
            <Search className="absolute right-3 top-2.5 text-gray-700" size={22} />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center text-lg">
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
          <NavLink to="/profile">
            <User className="text-black/80" strokeWidth={1.7} />
            <p>{user?.displayName || "User"}</p>
          </NavLink>
        </div>
        </div>

        {/* Mobile Hamburger */}
        {/* <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
        >
          {isOpen ? <X /> : <Menu />}
        </button> */}

        {/* Mobile Menu */}
        <div className="sm:hidden flex space-x-6 items-center text-lg justify-around w-full">
          <NavLink to="/" className="hover:text-gray-200">
            <Home />
          </NavLink>
          <NavLink to="/">
            <Search className="hover:text-gray-200" />
          </NavLink>
          <NavLink to="/wishlist">
            <Heart className="hover:text-gray-200" />
          </NavLink>
          <NavLink to="/cart" className="relative">
            <ShoppingCart className="hover:text-gray-200" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalQuantity}
              </span>
            )}
          </NavLink>
          <NavLink to="/profile">
            <User className="hover:text-gray-200" />
          </NavLink>
        </div>

      </motion.nav>
    </div>
  )
}

export default Navbar