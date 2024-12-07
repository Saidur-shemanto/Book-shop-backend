import { z } from "zod";

export const orderSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  product: z.string().min(1, { message: "Product is required" }),
  quantity: z
    .number()
    .int()
    .positive({ message: "Quantity must be a positive integer" }),
  productPrice: z
    .number()
    .positive({ message: "Product price must be a positive number" }),
});
