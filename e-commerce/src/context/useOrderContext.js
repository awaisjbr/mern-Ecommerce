import toast from "react-hot-toast";
import {create} from "zustand";
import { axiosInstance } from "../utils/utils";
import { useCartContext } from "./useCartContext";


export const useOrderContext = create((set, get) => ({
    loading: false,
    orderItems: [],

    placeOrderCOD: async (orderData) => {
        const {getUserCart} = useCartContext.getState();
        try {
            const {data} = await axiosInstance.post("/order/place",orderData);
            if(data.success){
                toast.success(data.message);3
                await getUserCart();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error while placing COD order");
        }
    },

    listOrders: async () => {
        try {
            const {data} = await axiosInstance.get("/order/list-orders");
            if(data.success){
                set({orderItems: data.orders})
            }
        } catch (error) {

            // toast.error(error?.response?.data?.message || "Error while fetching orders list");
        }
    }
}))