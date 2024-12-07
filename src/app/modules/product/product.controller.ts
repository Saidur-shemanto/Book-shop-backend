import { Request, Response } from "express";
import { productServices } from "./product.services";
import { productValidationSchema } from "./product.validation";
import { ZodError } from "zod";
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
    error instanceof ZodError &&
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching Product data",
        data: error,
        stack: error.stack,
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
  } catch (error) {
    error instanceof ZodError &&
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching this product",
        data: error,
        stack: error.stack,
      });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const rawProduct = req.body;
    const time = new Date().toISOString();
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
    error instanceof ZodError &&
      res.status(500).json({
        success: false,
        message: "Something went wrong while creating Product data",
        data: error,
        stack: error.stack,
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
    error instanceof ZodError &&
      res.status(500).json({
        success: false,
        message: "Something went wrong while deleting this product",
        data: error,
        stack: error.stack,
      });
  }
};
const editAProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const productBody = req.body;
    const date = new Date().toISOString();
    productBody["updatedAt"] = date;
    const product = await productServices.editAProduct(productId, productBody);
    res.status(200).json({
      success: true,
      message: "Book has been edited successfully",
      data: product,
    });
  } catch (error) {
    error instanceof ZodError &&
      res.status(500).json({
        success: false,
        message: "Something went wrong while editing Product data",
        data: error,
        stack: error.stack,
      });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteAProduct,
  editAProduct,
};
