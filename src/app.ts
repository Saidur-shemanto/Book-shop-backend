import express, { Application } from "express";
import cors from "cors";
import { productRoutes } from "./app/modules/product/product.route";
import { orderRouter } from "./app/modules/order/order.router";
const app: Application = express();

//parser
app.use(cors());
app.use(express.json());
app.use(express.text());

app.use("/api/products", productRoutes);
app.use("/api/order", orderRouter);

export default app;