import express from "express";
import { getUserCart } from "../controllers/Cart.controller.js";
import {userAuth} from "../middlewares/userAuth.js"

export const router = express.Router();

router.get("/getCart", userAuth, getUserCart);
router.get("/getCart", userAuth, getUserCart);
router.get("/getCart", userAuth, getUserCart);
