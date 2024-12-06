import { Request, Response } from "express";
import { orderServices } from "./order.services";

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
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching Product data",
      data: error,
    });
  }
};

const getRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await orderServices.getRevenue();
    console.log(totalRevenue);
    res.status(200).json({
      success: true,
      message: "Total revenue has been found",
      data: totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There was an error fetching total revenue",
      data: error,
    });
  }
};

export const orderControllers = {
  createOrder,
  getRevenue,
};
