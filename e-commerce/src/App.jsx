import React, { lazy, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import {Routes, Route, Navigate} from "react-router-dom"
import Loading from "./components/Loading";
import {Toaster} from "react-hot-toast"
import { useAuthContext } from "./context/useAuthContext";
import { useCartContext } from "./context/useCartContext";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const Product = lazy(() => import("./components/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const OrderPage = lazy(() => import("./pages/OrderPage"));

const App = () => {
  const {authUser, isAuthenticated, isEmailVerified, checkAuth} = useAuthContext();
  const {fetchAllProducts,fetchAllCategories} = useCartContext();
  // console.log(products)
  
  useEffect(() => {
    checkAuth();
    fetchAllProducts();
    fetchAllCategories();
  },[])

  return (
    <>
      <Navbar />
      <Toaster position="top-center" duration={7000} />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />}/>
          <Route path="/verify-email" element={isEmailVerified ? <Navigate to="/login" /> : <VerifyEmail />}/>
          <Route path="/add-product" element={authUser?.role === "admin" ? <AddProduct/> : <Login />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<OrderPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
