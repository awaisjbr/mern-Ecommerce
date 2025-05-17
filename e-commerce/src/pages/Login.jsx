import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';
import Loading from '../components/Loading';

const Login = () => {
  const navigate = useNavigate()
  const {signup, loading, isEmailVerified, login} = useAuthContext();
  const [loginState, setLoginState] = useState("SignUp");
  const [showPsssword, setShowPassword] = useState(false); 
  const [formData, setFormData] = useState({
    username:"",
    email:"",
    password:"",
  });

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setFormData ({...formData, [name]: value});
  };

  useEffect(() => {
    if(!isEmailVerified) navigate("/verify-email")
  },[isEmailVerified, navigate])

  const submitHandler = async (e) => {
    e.preventDefault();
    if(loginState === "SignUp"){
      await signup(formData);
      setFormData({
        username:"",
        email:"",
        password:"",
      });
    }else{
      login(formData);
    }
  }

  if(loading) return <Loading />

  return (
    <div className="min-h-screen flex items-center justify-center absolute top-0 left-0 w-full" style={{background:"rgba(0,0,0,0.7)", zIndex:0}}>
      <div className="bg-green-950 h-96 w-80 rounded-lg text-white flex flex-col items-center relative font-poppins">
        <NavLink to={"/"}><IoClose className="absolute text-lg top-2 right-2 cursor-pointer"/></NavLink>
        <h1 className="mt-8 text-2xl font-bold">{loginState === "SignUp" ? "Create Account" : "Login"}</h1>
        <p className="text-xs my-2">{loginState === "SignUp" ? "Create your account" : "Login into your account"}</p>
        <form onSubmit={submitHandler} className="flex flex-col gap-5 mt-5">
            <div className={`flex text-lg items-center bg-gradient-to-r from-pink-700 to-rose-700 py-2 gap-2 px-2 rounded-md ${loginState === "SignUp" ? "" : "hidden"}`}><FiUser /><input className="bg-gradient-to-r from-pink-700 to-rose-700 h-full outline-none text-sm" name="username" onChange={onChangeHandler} value={formData.username} type="text" placeholder="Full Name" autoComplete="off" /></div>
            <div className="flex text-lg items-center bg-gradient-to-r from-pink-700 to-rose-700 py-2 gap-2 px-2 rounded-md"><MdOutlineEmail /><input className="bg-transparent h-full outline-none text-sm" name="email" type="email" onChange={onChangeHandler} value={formData.email} placeholder="Email" autoComplete='off' /></div>
            <div className="flex text-lg items-center bg-gradient-to-r from-pink-700 to-rose-700 py-2 gap-2 px-2 rounded-md"><FaLock /><input className="bg-transparent h-full outline-none text-sm" name="password" type={showPsssword ? "text" : "password"} onChange={onChangeHandler} value={formData.password} placeholder="Password" />{showPsssword ? <IoMdEyeOff className='cursor-pointer' onClick={() => setShowPassword(!showPsssword)} title='hide'/> : <IoEye className='cursor-pointer' onClick={() => setShowPassword(!showPsssword)} title='show'/>}</div>
            <button type="submit" className="text-lg bg-gradient-to-r from-pink-500 to-rose-800 py-2 rounded-md w-[50%] mx-auto">{loginState === "SignUp" ? "Sign Up" :"Sign In"}</button>
        </form>
        <p className="text-xs mt-3">{loginState === "SignUp" ? "Already have an account ?" : "Don't have any accout ?"} {loginState === "SignUp" ? <span className="text-blue-800 underline cursor-pointer" onClick={() => setLoginState("Login")}>Login here</span>:<span className="text-blue-800 underline cursor-pointer" onClick={() => setLoginState("SignUp")}>Register here</span>}</p>
      </div>
    </div>
  )
}

export default Login
