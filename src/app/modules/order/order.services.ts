import { match } from "assert";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrder = async (order: IOrder) => {
  const result = await Order.create(order);
  return result;
};
const getRevenue = async () => {
  const result = await Order.aggregate([
    { $group: { _id: null, totalPrice: { $sum: "$productPrice" } } },
  ]);
  return result;
};

export const orderServices = {
  createOrder,
  getRevenue,
};
