import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./components/Firebase";


import HomePage from "./pages/Home";
import LoginForm from "./pages/LogIn";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CategoryPage from "./pages/CategoryPage";
import SignUpForm from "./pages/SignUp";
import { onAuthStateChanged } from "firebase/auth";


const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(!!currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={ user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/category/:categoryName" element={ user ? <CategoryPage />: <Navigate to="/login" />}  />
        <Route path="/product/:id" element={ user ? <ProductDetail /> : <Navigate to="/login" />} />
        <Route path="/cart" element={ user ? <Cart />: <Navigate to="/login" />} />
        <Route path="/checkout" element={ user ? <Checkout /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
