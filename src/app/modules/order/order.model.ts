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
  const orderedBook = await productServices.getAProduct(this.product);
  orderedBook &&
    (await Product.updateOne(
      { _id: orderedBook._id },
      { quantity: orderedBook.quantity - this.quantity }
    ));
});

export const Order = model<IOrder>("Order", orderSchema);
