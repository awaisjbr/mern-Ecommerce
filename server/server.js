import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {router as authRouter} from "./src/routes/Auth.route.js";
import { router as productRouter } from "./src/routes/Product.route.js";
import { router as cartRouter } from "./src/routes/Cart.route.js";
import {router as orderRouter} from "./src/routes/Order.route.js"

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
const allowedOrigins = ['https://mern-ecommerce-frontend-lovat.vercel.app', 'http://localhost:3000']

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json({limit: "5mb"}));
app.use(cookieParser());


app.get("/", (req, res) => {
    res.json("Hello Backend")
})
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`server is listening on port : ${port}`)
    })
}).catch((error) => {
    console.log(error.message)
})
