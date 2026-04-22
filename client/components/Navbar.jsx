"use client";
import React from "react";
import { FaPhone } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

const Navbar = () => {
  const { authUser } = useAuthStore();

  return (
    <header className="fixed w-full top-0 left-0 z-20">
      <div className="bg-green-800 text-white flex items-center justify-between px-5 md:px-10 py-5 font-poppins text-sm">
        <div className="flex items-center gap-3"><FaPhone /><a href="tel:+971554308646">+971 55 430 8646</a></div>
        <div className="text-sm hidden md:block">
          <p>Get 50% off on Selected Items &nbsp; &nbsp; | &nbsp; &nbsp; Shop Now</p>
        </div>
        <div className="flex items-center gap-5 lg:gap-10">
          <p className="flex items-center gap-2 cursor-pointer">Eng <FaAngleDown /></p>
          <p className="flex items-center gap-2 cursor-pointer">Location <FaAngleDown /></p>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
