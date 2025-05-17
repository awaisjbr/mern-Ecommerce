import React from 'react'
import { useParams } from 'react-router-dom'
import { useCartContext } from '../context/useCartContext';

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
          <div>
            <h1>{product?.name}</h1>
            <p>{product?.description}</p>
          </div>
          <hr className='w-[60%]'/>
        </div>
      </div>
    </div>
  )
}

export default Product
