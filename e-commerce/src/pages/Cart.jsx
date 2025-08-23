import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { useCartContext } from "../context/useCartContext";
import { useAuthContext } from "../context/useAuthContext";
import { FaArrowRight, FaTag } from "react-icons/fa6";
import CartItem from "../components/CartItem";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, setTotalPrice } = useCartContext();
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
    
  const cartSubtotal = () => {
    return cartItems.reduce((accum, item) => {
      return  accum + (item.product.price * item.quantity)
    },0)
  };
  const subtotal = cartSubtotal();
  const discountRate = subtotal < 1000 ? 0 : 10;
  const discountAmount = (subtotal * discountRate) / 100;
  const deliveryFee = cartItems.length > 0 ?  (subtotal < 500 ? 10 : 0) : 0;
  const total = subtotal - discountAmount + deliveryFee;

  const handleCheckOut = () => {
    if(cartItems.length > 0){
      setTotalPrice(total);
      navigate("/place-order")
    }else{
      toast.error("No item in cart for checkout")
    }
  }

  return (
    <div className="pt-24 lg:pt-28 bg-[#fefbf7] h-screen">
      {authUser ? (
        <div className="px-2 lg:px-10 flex flex-col">
          <div className="text-sm mb-4 text-gray-500"><span className="cursor-pointer hover:text-blue-400" onClick={() => navigate("/")}>Home &gt;</span> Cart</div>
          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

          {/* Cart Container */}
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Cart Items */}
            <div className="border-2 border-grey-200 p-2 md:p-5 pb-0 mb-0 rounded-xl lg:w-[60%] ">
              {cartItems.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {cartItems.map((item,i) => <CartItem key={i} item={item} size={item.size}/>)}
                </div>
              ):(<div className="text-xl font-semibold flex items-center justify-center h-full">Your cart is empty</div>)}
            </div>
            {/* Cart Order Summary */}
            <div className="border-2 border-grey-200 p-3 lg:p-5 rounded-xl lg:w-[40%] h-[400px]">
              <div>
                <h1 className="text-2xl tracking-wide font-bold">Order Summary</h1>
                <div className="flex flex-col gap-3 mt-5">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 font-semibold">Subtotal</p>
                    <p className="font-bold">${subtotal.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 font-semibold">Discount({discountRate}%)</p>
                    <p className="font-bold text-red-500">-${discountAmount.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500 font-semibold">Delivery Fee</p>
                    <p className="font-bold">${deliveryFee.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <hr className="my-5"/>
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-xl">Total</p>
                    <p className="font-bold text-xl">${total.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-1 md:gap-3">
                  <div className="relative flex w-full"><FaTag className="absolute left-5 top-[14px] text-gray-500" /><input className="flex-1 py-2 rounded-full ps-10 border-2 outline-none" type="text" placeholder="Add promo code" /></div>
                  <button className="bg-black text-white py-2 px-5 md:px-10 rounded-full">Apply</button>
                </div>
                <div className="flex items-center bg-black text-white w-2/3 py-2 rounded-full justify-center gap-3 mx-auto cursor-pointer hover:bg-gray-800 active:bg-black" onClick={handleCheckOut}>Go to Checkout <FaArrowRight /></div>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="flex items-center bg-green-50 h-full justify-center text-2xl font-bold">Please login to your account</div>
      )}
    </div>
  );
};

export default Cart;
