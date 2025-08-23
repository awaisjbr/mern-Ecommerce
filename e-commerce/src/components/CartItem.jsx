import React from "react";
import { FaRegTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useCartContext } from "../context/useCartContext";
import { Link, useNavigate } from "react-router-dom";

const CartItem = ({item, size}) => {
  const { removeFromCart, increaseProductQuantity, decreaseProductQuantity } = useCartContext();
  const {name,price,_id} = item?.product;
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-5 overflow-hidden justify-between">
      <div className="flex justify-between w-full">
        <div className="flex items-start gap-3">
          <Link to={`/product/${_id}`}><img className="h-20 lg:h-24 rounded-sm cursor-pointer" src={item.product.image} alt={name} /></Link>
          <div className="flex-1">
            <h2 className="text-sm md:text-lg font-semibold">{name}</h2>
            <p className="text-xs md:text-sm font-semibold flex items-center gap-3">Size: <span className=" text-black border-black border px-2">{size}</span></p>
            {/* <p className="text-xs md:text-sm font-semibold">Color: <span className="font-normal text-gray-600">White</span></p> */}
            <p className="text-sm md:text-xl font-bold mt-3">$-{price}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between p-1">
          <div className="cursor-pointer self-end text-red-500 hover:scale-110 transition-all duration-200 text-xs md:text-lg" onClick={() => removeFromCart(_id)}><FaRegTrashAlt title="Delete Item"/></div>
          <div className="bg-gray-100 flex items-center gap-2 md:gap-5 rounded-3xl px-2 md:px-3 py-1">
            <FaPlus className="cursor-pointer text-xs md:text-lg" onClick={() => increaseProductQuantity(_id)} title="Increase Quantity"/>
            <p className="">{item.quantity}</p>
            <FaMinus className="cursor-pointer text-xs md:text-lg" onClick={() => decreaseProductQuantity(_id)} title="Decrease quantity"/>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default CartItem;
