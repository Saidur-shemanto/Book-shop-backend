import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (product: IProduct) => {
  const result = await Product.create(product);
  return result;
};

const getAllProducts = async (searchParam: string) => {
  console.log(searchParam);
  const result = await Product.find({
    category: searchParam === undefined ? { $exists: true } : searchParam,
  });
  return result;
};

const getAProduct = async (id: string) => {
  const result = await Product.findOne({ _id: id });
  if (result === null) {
    throw new Error("Product not found");
  }
  return result;
};

const editAProduct = async (id: string, update: object) => {
  const result = await Product.updateOne({ _id: id }, update);
  return result;
};

const deleteAProduct = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

export const productServices = {
  getAProduct,
  getAllProducts,
  createProductIntoDB,
  deleteAProduct,
  editAProduct,
};
