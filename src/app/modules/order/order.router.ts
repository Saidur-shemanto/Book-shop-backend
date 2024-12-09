import express from "express";
import { orderControllers } from "./order.controller";
const router = express.Router();
router.post("/", orderControllers.createOrder);
router.get("/revenue", orderControllers.getRevenue);

export const orderRouter = router;
