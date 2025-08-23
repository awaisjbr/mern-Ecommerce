import React, { lazy, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import {Routes, Route, Navigate} from "react-router-dom"
import Loading from "./components/Loading";
import {Toaster} from "react-hot-toast"
import { useAuthContext } from "./context/useAuthContext";
import { useCartContext } from "./context/useCartContext";
import { useOrderContext } from "./context/useOrderContext";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const Product = lazy(() => import("./components/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const OrderPage = lazy(() => import("./pages/OrderPage"));
const AllOrders = lazy(() => import("./pages/AllOrders"));

const App = () => {
  const {authUser, isAuthenticated, isEmailVerified, checkAuth} = useAuthContext();
  const {fetchAllProducts,fetchAllCategories} = useCartContext();
  const {listOrders, orderItems} = useOrderContext();
  // orderItems.map((order) => {
  //   console.log(order.items)
  // })
  console.log(orderItems)
  
  useEffect(() => {
    checkAuth();
    fetchAllProducts();
    fetchAllCategories();
    listOrders();
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
          <Route path="/my-orders" element={<AllOrders />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
