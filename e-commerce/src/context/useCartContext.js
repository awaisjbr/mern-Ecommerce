import axios from "axios";
import toast from "react-hot-toast";
import {create} from "zustand"
import { axiosInstance } from "../utils/utils";

export const useCartContext = create((set, get) => ({
    cartItems: [],
    products: [],
    totalPrice: 0,
    grandTotal: 0,
    categories: [],
    loading: false,

    setTotalPrice: (value) => set({totalPrice: value}), 

    fetchAllProducts: async () => {
        try {
            const {data} = await  axiosInstance.get("/product/list-products");
            set({products: data.products});
        } catch (error) {
            // toast.error(error?.response?.data?.message || "No Product found");  
            console.log(error)          
        }
    },

    addNewProduct: async (productData) => {
        set({loading: true})
        const {products} = get()
        try {
            const {data} = await axiosInstance.post("/product/add-product",productData,
                {headers: {"Content-Type": "multipart/form-data"}, method: "POST"}
            );
            set({products: [...products, data.product], loading: false});
            toast.success(data.message)
        } catch (error) {
            set({loading: false})
            toast.error(error?.response?.data?.message || "Failed to add new Product");
            console.log(error)  
        }
    },

    addCategory: async (categoryData) => {
        set({loading: true})
        const {categories} = get();
        try {
            const {data} = await axiosInstance.post("/product/add-category",categoryData, 
                {headers: {"Content-Type": "multipart/form-data"}, method: "POST"}
            );
            set({categories: [...categories, data.category], loading: false});
            toast.success(data.message)
        } catch (error) {
            set({loading: false})
            toast.error(error?.response?.data?.message || "Failed to add new Category"); 
            console.log(error) 
        }
    },

    fetchAllCategories: async () => {
        try {
            const {data} = await axiosInstance.get("/product/list-category");
            set({categories: data.category});
        } catch (error) {
            // toast.error(error?.response?.data?.message || "No Category found");  
            console.log(error)          
        }
    },

    getUserCart: async () => {
        try {
            const {data} = await axiosInstance.get("/cart/getCart");
            if(data.success){
                set({cartItems: data.cartData})
            }
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    },

    addToCart: async (productId) => {
        const {getUserCart} = get();
        try {
            const {data} = await axiosInstance.post("/cart/addToCart", {productId});
            if(data.success){
                toast.success(data.message);
                await getUserCart();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error while adding item to cart")
        }
    },

    clearCart: () => {
        set({cartItems: [], totalPrice: 0, grandTotal: 0})
    },

    removeFromCart: async (productId) => {
        const {getUserCart} = get();
        try {
            const {data} = await axiosInstance.post("/cart/removeProduct", {productId});
            if(data.success){
                toast.success(data.message);
                await getUserCart();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error while removing item from cart")
        }
    },

    increaseProductQuantity: async (productId) => {
        const {getUserCart} = get();
        try {
            const {data} = await axiosInstance.post("/cart/updateCart", {productId});
            if(data.success){
                toast.success(data.message);
                await getUserCart();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error while updating product quantity from cart")

        }
    },

    decreaseProductQuantity: async (productId) => {
        const {getUserCart} = get();
        try {
            const {data} = await axiosInstance.post("/cart/decreaseProductQuantity", {productId});
            if(data.success){
                toast.success(data.message);
                await getUserCart();
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error while updating product quantity decrease from cart")

        }
    }

}))