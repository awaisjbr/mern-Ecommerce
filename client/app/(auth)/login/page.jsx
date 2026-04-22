"use client";

import { FcGoogle } from "react-icons/fc";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/utils/axiosInstance";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("/api/auth/login", data);
      return res.data; // ✅ IMPORTANT
    },
    onSuccess: (data) => {
      setUser(data.user);
      router.replace("/"); // redirect after login
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-full flex flex-col items-center justify-center">
        <form className="md:w-96 w-80 flex flex-col items-center gap-7" onSubmit={handleSubmit}>
          <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
          <p className="text-sm text-gray-500/90">Welcome back! Please sign in to continue</p>

          <button type="button" className="w-full mt-8 bg-gray-500/10 flex items-center gap-5 justify-center h-14 rounded-full" >
            <FcGoogle size={40} />
            <p>Sign in with google</p>
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="text-sm text-gray-500/90">or sign in with email</p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          {/* Email */}
          <div className="flex items-center w-full border h-12 rounded-full pl-6 gap-2">
            <MdEmail className="text-gray-500" size={20} />
            <input name="email" type="email" onChange={handleChange} value={formData.email} placeholder="Email" className="w-full outline-none" required />
          </div>

          {/* Password */}
          <div className="flex items-center w-full border h-12 rounded-full pl-6 gap-2">
            <FaLock color="gray" />
            <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Password" className="w-full outline-none" required />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">
              {error.response?.data?.message || "Login failed"}
            </p>
          )}

          <button type="submit" disabled={isPending} className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 disabled:opacity-50" >
            {isPending ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;