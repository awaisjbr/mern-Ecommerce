import {create} from "zustand";
import {axiosInstance} from "../utils/utils"
import toast from "react-hot-toast";
import { useCartContext } from "./useCartContext";


export const useAuthContext = create((set) => ({
    authUser: null,
    allUsers: [],
    loading: false,
    isAuthenticated: false,
    isEmailVerified: true,
    isForgotPassword: true,


    checkAuth: async () => {
        const getUserCart = useCartContext.getState().getUserCart;
        try {
            const {data} = await axiosInstance.get("/auth/checkAuth");
            if(data.success){
                set({authUser: data.user, isAuthenticated: false});
                await getUserCart()

            }else {
                set({ user: null, isAuthenticated: false });
              }
        } catch (error) {
            set({ user: null, isAuthenticated: false });
        }
    },

    signup: async (credentials) => {
        set({loading: true});
        try {
            const {data} = await axiosInstance.post("/auth/register",credentials);
            if(data.success){
                set({loading: false, isEmailVerified:false, authUser: null});
                toast.success(data.message)
            }else{
                set({loading:false});
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Signup failed");
            set({loading:false, isEmailVerified:true, authUser:null})
        }        
    },

    VerifyEmail: async (otp) => {
        set({loading: true});
        try {
            const {data} = await axiosInstance.post("/auth/verifyEmail",otp);
            if(data.success){
                set({isEmailVerified:true, loading:false,authUser:null});
                toast.success(data.message)
            }else{
                set({loading:false});
                toast.error(data.message)
            }
        } catch (error) {
            set({loading:false})
            toast.error(error?.response?.data?.message || "Email Verification failed"); 
        }
    },

    login: async (credentials) => {
        set({loading: true});
        try {
            const {data} = await axiosInstance.post("/auth/login", credentials);
            if(data.success){
                set({loading: false, authUser: data.user, isAuthenticated: true});
                toast.success(data.message);
            }else{
                set({loading: false, authUser: null, isAuthenticated: false});
            }
        } catch (error) {
            set({loading: false, authUser: null, isAuthenticated: false});
            toast.error(error?.response?.data?.message || "User Login failed"); 
        }
    },

    logout: async () => {
        set({loading: true});
        try {
            const {data} = await axiosInstance.post("/auth/logout");
            if(data.success){
                set({loading: false, authUser: null, isAuthenticated: false});
                toast.success(data.message)
            }else{
                set({loading: false});
                toast.error(data.message)
            }   
        } catch (error) {
            set({loading: false})
            toast.error(error?.response?.data?.message || "User logged out failed"); 
        }
    },

    forgotPassword: async () => {
        set({loading: true});
        try {
            const {data} = await axiosInstance.post("/auth/forgot-password");
            if(data.success){
                set({loading: false, isForgotPassword: false});
                toast.success(data.message)
            }else{
                set({loading: false});
                toast.error(data.message)
            }
        } catch (error) {
            set({loading: false})
            toast.error(error?.response?.data?.message || "User logged out failed"); 
        }
    },

    resetPassword: async (data) => {
        set({loading: true});
        try {
            const {data} = await axiosInstance.post("/auth/reset-password",{data});
            if(data.success){
                set({loading: false, isForgotPassword: true});
                toast.success(data.message)
            }else{
                set({loading:false});
                toast.error(data.message)
            }
        } catch (error) {
            set({loading: false})
            toast.error(error?.response?.data?.message || "Password reset failed"); 
        }
    },

    getAllUsers: async () => {
        try {
            const {data} = await axiosInstance.get("/auth/users");
            if(data.success){
                set({allUsers: data.users})
            }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

}));

