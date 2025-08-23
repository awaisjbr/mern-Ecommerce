import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCartContext } from '../context/useCartContext';
import { FaStar } from 'react-icons/fa6'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/useAuthContext';

const Product = () => {
  const {products, addToCart} = useCartContext();
  const {authUser} = useAuthContext();
  const {id} = useParams();
  const product = products?.find((item) => item._id === id);
  const [selectedSize, setSelectedSize] = useState("");

  const handleAddToCart = async (id, size) => {
    if(authUser){
      if(selectedSize){
        await addToCart(id,size);
        setSelectedSize("");
      }else{
        toast.error("Please select size")
      }
    }else{
      toast.error("Please login to your account")
    }
  }
  
  return (
    <div className='mt-28 w-[90%] mx-auto'>
      <div className="breadcrum my-5">
        <p>{`Home / ${product?.category.name} / ${product?.name}`}</p>
      </div>
      <div className='flex justify-between flex-col lg:flex-row gap-3'>
        <div className='flex-1 flex-col lg:flex-row flex items-center justify-center gap-5'>
          <div className='flex lg:flex-col items-center justify-center gap-2'>
            {product?.subImages?.map((image,index) => {
              return <img key={index} src={image} className='w-16 md:w-20 lg:min-w-24 cursor-pointer rounded' alt="" />
            })}
          </div>
            <img src={product?.image} className='cursor-pointer rounded-md' alt="" />
        </div>
        <div className='flex-1 flex flex-col'>
          <div className='flex flex-col gap-5 py-5'>
            <h1 className='text-2xl font-bold capitalize mb-2'>{product?.name}</h1>
            <div className='text-green-600 flex items-center text-xs gap-[2px]'>{[...Array(5)].map((_,i) => <FaStar key={i} />)}<span className='text-slate-500 ml-3 font-semibold'>(121)</span></div>
            <div className='text-xl font-bold flex items-center gap-5'>{`$${product?.price}`} <span className='line-through text-sm text-red-400'>${(product?.price) * 125/100}</span></div>
            <p className='text-xs font-semibold text-slate-500 lowercase'>{product?.description}</p>
          </div>
          {/*  */}
          <div className='flex flex-col gap-3'>
            <p className='font-semibold text-sm'>Select Size: {selectedSize}</p>
            <div className='flex items-center gap-2'>
              {product?.sizes?.map((size, i) => {
                return <div key={i} className={`px-2 border cursor-pointer ${selectedSize === size ? "border-black" : ""}`} onClick={() => setSelectedSize(size)}>{size}</div>
              })}
            </div>
          </div>
          {/*  */}
          <button className='uppercase self-start bg-black text-white text-sm px-5 py-2 mt-10 active:bg-gray-700' onClick={() => handleAddToCart(product?._id, selectedSize)}>Add to Cart</button>
          <hr className='w-[60%] mt-5'/>
          <div className='text-gray-500 text-xs flex flex-col gap-1 mt-5'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
