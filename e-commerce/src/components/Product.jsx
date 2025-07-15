import React from 'react'
import { useParams } from 'react-router-dom'
import { useCartContext } from '../context/useCartContext';
import { FaStar } from 'react-icons/fa6'

const Product = () => {
  const {products} = useCartContext();
  const {id} = useParams();
  const product = products?.find((item) => item._id === id);
  
  return (
    <div className='mt-28 w-[90%] mx-auto'>
      <div className="breadcrum my-5">
        <p>{`Home / ${product?.category.name} / ${product?.name}`}</p>
      </div>
      <div className='flex justify-between'>
        <div className='flex-1 flex flex-col items-center justify-center gap-5'>
          <img src={product?.image} className='cursor-pointer rounded-lg' alt="" />
          <div className='flex items-center gap-10'>
            {product?.subImages?.map((image,index) => {
              return <img key={index} src={image} className='h-24 w-24 cursor-pointer rounded-lg' alt="" />
            })}
          </div>
        </div>
        <div className='flex-1 flex flex-col'>
          <div className='flex flex-col gap-1'>
            <h1 className='text-2xl font-bold capitalize mb-2'>{product?.name}</h1>
            <p className='text-xs font-semibold text-slate-500 lowercase'>{product?.description}</p>
            <div className='text-green-600 flex items-center text-xs gap-[2px]'>{[...Array(5)].map((_,i) => <FaStar key={i} />)}<span className='text-slate-500 ml-3 font-semibold'>(121)</span></div>
            <hr className='w-[60%] mt-5'/>
          </div>
          <div>
            {`$ ${product?.price}`}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
