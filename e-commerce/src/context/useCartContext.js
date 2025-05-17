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

    fetchAllProducts: async () => {
        try {
            const {data} = await  axiosInstance.get("/product/list-products");
            set({products: data.products});
        } catch (error) {
            toast.error(error?.response?.data?.message);  
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
        }
    },

    fetchAllCategories: async () => {
        try {
            const {data} = await  axiosInstance.get("/product/list-category");
            set({categories: data.category});
        } catch (error) {
            toast.error(error?.response?.data?.message);  
            console.log(error)          
        }
    },

}))