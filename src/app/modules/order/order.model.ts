import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";
import { Product } from "../product/product.model";
import { productServices } from "../product/product.services";

const orderSchema = new Schema<IOrder>({
  email: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  productPrice: { type: Number, required: true },
});

orderSchema.pre("save", async function () {
  console.log(this.product, Object(this.product));
  const orderedBook = await productServices.getAProduct(this.product);
  console.log(orderedBook);
  if (!orderedBook) {
    throw new Error("Order not found");
  }

  if (orderedBook.quantity < this.quantity) {
    throw new Error("Insufficient stock for the requested quantity");
  }

  await productServices.editAProduct(
    orderedBook._id.toString(),
    orderedBook.quantity - this.quantity === 0
      ? { inStock: false, quantity: 0 }
      : { quantity: orderedBook.quantity - this.quantity }
  );
});

export const Order = model<IOrder>("Order", orderSchema);
