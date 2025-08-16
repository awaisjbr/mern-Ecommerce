import express from "express";
import { getUserCart, increaseProductQuantity, addToCart, removeProduct, decreaseProductQuantity } from "../controllers/Cart.controller.js";
import {userAuth} from "../middlewares/userAuth.js"

export const router = express.Router();

router.get("/getCart", userAuth, getUserCart);
router.post("/addToCart", userAuth, addToCart);
router.post("/increaseProductQuantity", userAuth, increaseProductQuantity);
router.post("/removeProduct", userAuth, removeProduct);
router.post("/decreaseProductQuantity", userAuth, decreaseProductQuantity)
