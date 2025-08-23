import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { listOrders, placeOrder } from "../controllers/Order.controller.js";

export const router = express.Router();

router.post("/place", userAuth, placeOrder);
router.get("/list-orders", userAuth, listOrders);