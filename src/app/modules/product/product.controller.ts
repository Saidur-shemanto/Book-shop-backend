import { Request, Response } from "express";
import { productServices } from "./product.services";
import { productValidationSchema } from "./product.validation";
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const queryParam = req.query.searchTerm;
    const products = await productServices.getAllProducts(queryParam as string);
    res.status(200).json({
      success: true,
      message: "Books are found succesfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching Product data",
      data: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = await productServices.getAProduct(productId);
    res.status(200).json({
      success: true,
      message: "Book has been retrieved successfully",
      data: product,
    });
  } catch (error) {}
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const rawProduct = req.body;
    const time = new Date().toString();
    rawProduct["createdAt"] = time;
    rawProduct["updatedAt"] = time;
    const product = productValidationSchema.parse(rawProduct);
    const result = await productServices.createProductIntoDB(product);
    res.status(200).json({
      success: true,
      message: "Book has been created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating Product data",
      data: error,
    });
  }
};
const deleteAProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = await productServices.deleteAProduct(productId);
    res.status(200).json({
      success: true,
      message: "Book has been deleted successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};
const editAProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productBody = req.body;
    const date = new Date();
    productBody["updatedAt"] = date;
    const product = await productServices.editAProduct(productId, productBody);
    res.status(200).json({
      success: true,
      message: "Book has been edited successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteAProduct,
  editAProduct,
};
