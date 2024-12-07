import { Request, Response } from "express";
import { orderServices } from "./order.services";
import { object, ZodError } from "zod";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderDetails = req.body;
    const order = await orderServices.createOrder(orderDetails);
    res.status(200).json({
      success: true,
      message: "Order has been placed successfully",
      data: order,
    });
  } catch (error) {
    error instanceof ZodError &&
      res.status(500).json({
        success: false,
        message: "Something went wrong while ordering this product",
        data: error,
        stack: error.stack,
      });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderServices.getRevenue();
    res.status(200).json({
      success: true,
      message: "Total revenue has been found",
      data: totalRevenue,
    });
  } catch (error) {
    error instanceof ZodError &&
      res.status(500).json({
        success: false,
        message: "There was an error fetching total revenue",
        data: error,
        stack: error.stack,
      });
  }
};

export const orderControllers = {
  createOrder,
  getRevenue,
};
