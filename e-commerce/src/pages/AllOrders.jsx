import React, { useEffect } from "react";
import { useOrderContext } from "../context/useOrderContext";
import {Link} from "react-router-dom"

const AllOrders = () => {
  const { listOrders, orderItems } = useOrderContext();

  useEffect(() => {
    listOrders();
  }, []);

  return (
    <div className="lg:mt-28 mt-24">
        <div className="text-center font-bold">My Orders</div>
        <div>
            {orderItems.length > 0 ? (
                orderItems.map((order) => (
                <div key={order._id} className="bg-white shadow-md rounded-lg p-4 mb-4" >
                    <h2 className="font-bold text-lg">Order ID: {order._id}</h2>
                    <p>Status: {order.status}</p>
                    <p>Amount: ${order.amount}</p>

                    {/* Loop through products inside order */}
                    <div className="mt-2">
                    {order.items.map((item) => (
                        <div key={item._id} className="flex items-center justify-between border-b py-2">
                        <div className="flex items-center gap-3">
                            <Link to={`/product/${item.product._id}`}><img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded cursor-pointer"/></Link>
                            <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity} | Size: {item.size}</p>
                            </div>
                        </div>
                        <span className="font-semibold">${item.product.price}</span>
                        </div>
                    ))}
                    </div>
                </div>
                ))
            ) : (
                <p className="">No orders found.</p>
            )}
      </div>
    </div>
  );
};

export default AllOrders;
