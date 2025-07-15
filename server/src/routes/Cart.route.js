import express from "express";
import { getUserCart, updateCart, addToCart, removeProduct } from "../controllers/Cart.controller.js";
import {userAuth} from "../middlewares/userAuth.js"

export const router = express.Router();

router.get("/getCart", userAuth, getUserCart);
router.post("/addToCart", userAuth, addToCart);
router.post("/updateCart", userAuth, updateCart);
router.post("/removeProduct", userAuth, removeProduct);
