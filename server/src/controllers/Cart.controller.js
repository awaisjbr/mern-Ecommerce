import { json } from "express";
import { userModel } from "../models/user.model.js";

export const getUserCart = async (req, res) => {
  try {
    const { loginId } = req.body;
    const userData = await userModel.findById(loginId).populate("cartItems.product");
    const cartData = userData.cartItems;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const increaseProductQuantity = async (req, res) => {
  const {loginId, productId} = req.body;
  try {
    const user = await userModel.findById(loginId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    };
    const existingItemIndex = user.cartItems.findIndex((item) => item.product.toString() === productId );
    if (existingItemIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    };
    const existingItem = user.cartItems[existingItemIndex];
    existingItem.quantity += 1;
    await user.save();
    res.json({ success: true, message: "Item quantity updated successfully." })

  } catch (error) {
    console.error("Error updating product from cart:", error);
    res.status(500).json({ success: false, message: "Error updating product from cart", error: error.message });
  }
};

export const decreaseProductQuantity = async (req, res) => {
  const {loginId, productId} = req.body;
  try {
    const user = await userModel.findById(loginId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    };
    const existingItemIndex = user.cartItems.findIndex((item) => item.product.toString() === productId );
    if (existingItemIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    };
    const existingItem = user.cartItems[existingItemIndex];
    existingItem.quantity -= 1;
    if(existingItem.quantity <= 0){
      user.cartItems.splice(existingItemIndex,1)
    }
    await user.save();
    res.json({ success: true, message: "Item quantity updated successfully." })

  } catch (error) {
    console.error("Error updating product decreaseProductQuantity from cart:", error);
    res.status(500).json({ success: false, message: "Error updating product decreaseProductQuantity from cart", error: error.message });
  }
};

export const removeProduct = async (req, res) => {
  const { loginId, productId } = req.body;
  try {
    const user = await userModel.findById(loginId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const existingItemIndex = user.cartItems.findIndex((item) => item.product.toString() === productId );
    if (existingItemIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    };

    user.cartItems.splice(existingItemIndex, 1);
    await user.save();

    res.json({ success: true, message: "Item removed from cart successfully." });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ success: false, message: "Error removing product from cart", error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { loginId, productId, size } = req.body;

    const user = await userModel.findById(loginId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingItem = user.cartItems.find((item) => item.product.toString() === productId && item.size === size);

    if(existingItem){
      existingItem.quantity += 1
    }else{
      user.cartItems.push({product: productId, quantity:1, size})
    }

    await user.save();

    res.status(201).json({ success: true, message: "Product added to cart", cartItems: user.cartItems});
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Error adding to cart", error: error.message });
  }
};