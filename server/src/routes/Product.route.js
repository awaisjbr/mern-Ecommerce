import express from "express";
import { listProduct, getFeaturedProducts, addProduct, removeProduct, getRecomendedProducts, addCategory, listCategory } from "../controllers/Product.controller.js";
import { upload } from "../middlewares/multer.js";
import { adminRoute, userAuth } from "../middlewares/userAuth.js";

export const router = express.Router();

router.get("/list-products", listProduct);
router.get("/list-category", listCategory);
router.get("/featured-products", getFeaturedProducts);
router.get("/recomended-products", getRecomendedProducts);

router.post("/add-product", userAuth, adminRoute,upload.fields([{ name: "mainImage", maxCount: 1 }, { name: "image1", maxCount: 1 },{ name: "image2", maxCount: 1 },{ name: "image3", maxCount: 1 },{ name: "image4", maxCount: 1 },]),addProduct);
router.post("/add-category", userAuth, adminRoute,upload.single("image"),addCategory);
router.delete("/:id", userAuth, adminRoute, removeProduct);
