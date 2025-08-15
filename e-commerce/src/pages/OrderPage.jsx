import React, { useState } from 'react'

const OrderPage = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
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
        <div className='flex-1 bg-red-100'>
            
        </div>
    </form>
  )
}

export default OrderPage
