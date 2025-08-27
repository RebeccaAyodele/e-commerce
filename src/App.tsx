import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginForm from "./pages/LogIn";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CategoryPage from "./pages/CategoryPage";
import SignInForm from "./pages/SignIn";


const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />}  />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
};

export default App;
