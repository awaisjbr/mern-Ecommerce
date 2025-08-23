import React, { useState } from 'react'
import { useCartContext } from '../context/useCartContext';
import paypal from "../assets/paypal.png";
import card from "../assets/card.png";
import { useOrderContext } from '../context/useOrderContext';
import toast from 'react-hot-toast';
import {useNavigate} from "react-router-dom"

const OrderPage = () => {
    const {totalPrice} = useCartContext();
    const {placeOrderCOD} = useOrderContext();
    const [paymentMethod, setPaymentMethod] = useState("");
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName:"",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "", 
        zipcode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]:value}))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(paymentMethod){
            switch(paymentMethod){
                case "cod":
                    await placeOrderCOD({address: formData, amount: totalPrice, paymentMethod});
                    navigate("/my-orders");
                break;

                default: 
                break
            }
        }else{
            toast.error("Please select payment method")
        }
    };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col lg:flex-row pt-24 lg:pt-28'>
        <div className='flex-1 flex flex-col gap-4 w-full items-center lg:mt-10'>
            <div className='flex gap-3 flex-col sm:max-w-[480px] px-2'>
                <h1 className='text-xl sm:text-2xl my-3'>Delivery Information</h1>
                <div className='flex gap-3'>
                    <input type="text" name='firstName' onChange={onChangeHandler} value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-orange-500' placeholder='First name'/>
                    <input type="text" name='lastName' onChange={onChangeHandler} value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-orange-500' placeholder='Last name'/>
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-orange-500' placeholder='Email address'/>
                <input type="text" name='street' onChange={onChangeHandler} value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-orange-500' placeholder='Street'/>
                <div className='flex gap-3'>
                    <input type="text" name='city' onChange={onChangeHandler} value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-orange-500' placeholder='City'/>
                    <input type="text" name='state' onChange={onChangeHandler} value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-orange-500' placeholder='State'/>
                </div>
                <div className='flex gap-3'>
                    <input type="number" name='zipcode' onChange={onChangeHandler} value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-orange-500' placeholder='Zipcode'/>
                    <input type="text" name='country' onChange={onChangeHandler} value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full outline-orange-500' placeholder='Country'/>
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone'/>
            </div>
        </div>
        <div className='flex-1 flex flex-col gap-4 w-full items-center lg:mt-24'>
            <div className='flex gap-3 flex-col w-full max-w-[450px] px-3 border rounded py-4'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl tracking-wide font-bold'>Order Summary</h1>
                    <h1 className='text-xl tracking-wide font-semibold'>Total : ${totalPrice}</h1>
                    <hr />
                </div>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-xl tracking-wide font-semibold'>Payment Details</h1>
                    <hr />
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setPaymentMethod("paypal")} className='flex items-center p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "paypal" ? "bg-green-400" : ""}`}></p>
                            <img className='h-20 mx-4' src={paypal} alt="" />
                        </div>
                        <div onClick={() => setPaymentMethod("card")} className='flex items-center p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "card" ? "bg-green-400" : ""}`}></p>
                            <img className='h-14 mx-4' src={card} alt="" />
                        </div>
                        <div onClick={() => setPaymentMethod("cod")} className='flex items-center gap-3 p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${paymentMethod === "cod" ? "bg-green-400" : ""}`}></p>
                            <p>COD</p>
                        </div>
                    </div>
                    <div className='self-center'>
                        <button className='bg-black text-white px-3 py-2 rounded active:bg-gray-700'>Place Order</button>
                    </div>
                </div>

            </div>
        </div>
    </form>
  )
}

export default OrderPage
