import express from "express";
import { productController } from "./product.controller";
const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getSingleProduct);
router.delete("/:productId", productController.deleteAProduct);
router.patch("/:productId", productController.editAProduct);

export const productRoutes = router;
