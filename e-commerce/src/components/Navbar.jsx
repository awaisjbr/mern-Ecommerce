import React from "react";
import { FaPhone } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import cartLogo from "../assets/cart.png"
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";
import { useCartContext } from "../context/useCartContext";

const Navbar = () => {
  const {authUser, logout} = useAuthContext();
  const {cartItems} = useCartContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirm = window.confirm("Are you sure to logout");
    if(confirm){
      await logout();
      navigate("/");
    }
  }
  return (
    <header className="fixed w-full top-0 left-0 z-20">
      <div className="bg-green-800 text-white flex items-center justify-between px-10 py-2 font-poppins text-sm">
        <div className="flex items-center gap-3"><FaPhone /><a href="tel:+971581212786">+971 58 1212 786</a></div>
          <div className="text-sm hidden md:block">
            <p>Get 50% off on Selected Items &nbsp; &nbsp; | &nbsp; &nbsp; Shop Now</p>
          </div>
          <div className="flex items-center gap-10">
            <p className="flex items-center gap-2 cursor-pointer">Eng <FaAngleDown /></p>
            <p className="flex items-center gap-2 cursor-pointer">Location <FaAngleDown /></p>
          </div>
        </div>


      <div className="fixed left-0 w-full shadow bg-white text-black top-10 font-poppins px-10 py-3 flex items-center justify-between">
        <NavLink to={"/"}><div className="flex items-center gap-3 cursor-pointer"><img className="" width={25} src={cartLogo} alt="logo" /><span className="lg:text-3xl font-semibold tracking-wider">Shopcart</span></div></NavLink>
        <nav className="hidden md:block">
            <ul className="flex items-center gap-5 lg:gap-10 text-sm lg:text-lg font-semibold">
                <li className="flex items-center gap-3 cursor-pointer">Categories <FaAngleDown /></li>
                <li className="cursor-pointer">{authUser?.role === "admin" ? "Dashboard" : "Deals"}</li>
                <li className="cursor-pointer">{authUser?.role === "admin" ? "" : "New Offers"}</li>
                {authUser?.role === "admin" ? <NavLink to={"/add-product"}><li className="cursor-pointer">Add Product</li></NavLink> : <li className="cursor-pointer">Delivery</li>}
                
            </ul>
        </nav>
        <div className="hidden lg:block">
            <div className="flex items-center bg-gray-200 py-1 px-3 rounded-3xl">
                <input type="text" className="bg-transparent placeholder:text-sm outline-none text-slate-700" placeholder="Search Product" />
                <IoSearch className="text-slate-600 cursor-pointer" />
            </div>
        </div>
        <div className="flex items-center gap-5 lg:gap-10 text-sm lg:text-lg">
          {authUser ? 
            <div className="flex items-center gap-2 cursor-pointer font-semibold group relative group"><FaRegUser />{authUser?.username}
                <div className="absolute top-7 hidden group-hover:block rounded-md bg-green-600 text-white w-32 shadow-md p-2 ">
                    <ul className="flex flex-col gap-2 text-center">
                        <li className="hover:bg-green-700 rounded-md">Profile</li>
                        <li className="hover:bg-green-700 rounded-md" onClick={handleLogout}>Logout</li>
                    </ul>
                </div>
            </div>
            : <NavLink to={"/login"}><div className="flex items-center gap-2 cursor-pointer font-semibold group relative"><FaRegUser />Account</div></NavLink>}
            <div className="flex items-center gap-2 cursor-pointer font-semibold relative">{cartItems.length && authUser ? <span className="absolute -top-1 right-8 w-3 h-3 rounded-full flex items-center justify-center bg-green-800 text-[10px] text-white">{cartItems.length}</span> : ""}<FaCartShopping className={`${cartItems.length && authUser ? "text-green-800" : ""}`}/>Cart</div>
        </div>
    </div>
    </header>
    
  );
};

export default Navbar;
