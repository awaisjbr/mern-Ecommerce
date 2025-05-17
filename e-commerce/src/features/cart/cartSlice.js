import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    grandTotal: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExists = state.products.find((product) => product._id === action.payload._id);
            if(!isExists){
                state.products.push({...action.payload, qunatity: 1});
            }else{
                toast.error("Item already added to cart")
            }
            state.selectedItems = selectedItems(state)
        },
    }
})

export const {increment, decrement} = cartSlice.actions;

export default cartSlice.reducer;