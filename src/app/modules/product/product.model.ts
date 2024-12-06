import { model, Schema } from "mongoose";
import { IProduct } from "./product.interface";
import { string } from "zod";
const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  author: {
    type: String,
    required: [true, "Author is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be a positive number"],
  },
  category: {
    type: String,
    enum: {
      values: ["Fiction", "Science", "SelfDevelopement", "Poetry", "Religious"],
      message:
        "Category must be one of Fiction, Science, SelfDevelopement, Poetry, or Religious",
    },
    required: [true, "Category is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [0, "Quantity must be a non-negative number"],
  },
  inStock: {
    type: Boolean,
    required: [true, "In-stock status is required"],
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});

export const Product = model<IProduct>("Product", productSchema);
