import React from 'react'
import { FaStar } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { useCartContext } from '../context/useCartContext'

const ProductList = ({productList, category}) => {
    const {addToCart} = useCartContext();
    const filterProduct = category === "All" ? productList : productList.filter((product) => product.category.name === category)
    // console.log(filterProduct)
  return (
    <div className="my-5 lg:my-16 w-[90%] mx-auto">
        <h1 className="font-bigShoulder font-bold text-2xl">Shop Our Top Products</h1>
        <div className='grid lg:grid-cols-4 gap-y-10 mt-10'>
            {filterProduct.map((product, index) => {
                return <div key={index} className='flex flex-col w-72 gap-3'>
                    <div className='h-72 w-72 rounded-lg overflow-hidden' >
                        <NavLink to={`/product/${product._id}`}><img src={product.image} alt="" className='hover:scale-110 transition-all duration-300 ease-linear cursor-pointer' /></NavLink>
                    </div>
                    <div className='flex items-center justify-between font-bold'>
                        <h1>{product.name}</h1>
                        <h1><sup>$</sup>{product.price}<sup>.00</sup></h1>
                    </div>
                    <p className='text-sm text-gray-500 font-semibold'>{product.description}</p>
                    <div className='text-green-600 flex gap-[2px]'>{[...Array(5)].map((_,i) => <FaStar key={i} />)}<sup></sup></div>
                    <button className='self-start border rounded-full px-3 py-2 border-black' onClick={() => addToCart(product._id)}>Add to Cart</button>
                </div>
            })}
        </div>
    </div>
  )
}

export default ProductList
