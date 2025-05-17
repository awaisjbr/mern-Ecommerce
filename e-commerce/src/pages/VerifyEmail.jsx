import React, { useState } from 'react'
import { MdKey } from "react-icons/md";
import { useAuthContext } from '../context/useAuthContext';
import Loading from '../components/Loading';

const VerifyEmail = () => {
    const {VerifyEmail} = useAuthContext()
    const [verificationOTP, setVerificationOTP, loading] = useState("")
    const submitHandler = (e) => {
        e.preventDefault();
        VerifyEmail({verificationOTP})
    };

    if(loading) return <Loading />
  return (
    <div className="h-screen flex items-center justify-center z-10 absolute top-0 left-0 w-full" style={{background:"rgba(0,0,0,0.7)", zIndex:10}}>
      <div className="bg-green-950 h-96 w-80 rounded-lg text-white flex flex-col items-center justify-center gap-12 relative font-poppins">
        <div className='flex flex-col items-center'>
            <h1 className="mt-8 text-2xl font-bold">Verify your account</h1>
            <p className="text-xs my-2">Please Enter the 6-digit OTP</p>
        </div>
        <form onSubmit={submitHandler} className="flex flex-col gap-5 mt-5">
            <div className={`flex text-lg items-center bg-gradient-to-r from-pink-700 to-rose-700 py-2 gap-2 px-2 rounded-md w-full `}><MdKey /><input className="bg-gradient-to-r from-pink-700 to-rose-700 h-full outline-none text-sm" name="verificationOTP" value={verificationOTP} type="number" onChange={(e) => setVerificationOTP(e.target.value)} placeholder="--O--T--P--" autoComplete="off" /></div>
            <button type="submit" className="text-lg bg-gradient-to-r from-pink-500 to-rose-800 py-2 rounded-md w-[80%] mx-auto">Verify Account</button>
        </form>
      </div>
    </div>
  )
}

export default VerifyEmail
