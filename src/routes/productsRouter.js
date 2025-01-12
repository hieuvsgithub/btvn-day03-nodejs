import { Router } from "express";
import {
  createProduct,
  deleteSoftProduct,
  getAllProduct,
  getByIdProduct,
  removeByIdProduct,
  updateByIdProduct,
} from "../controllers/productControllers.js";
import { validBodyRequest } from "../validations/index.js";
import productSchema from "../validations/productSchema.js";

const productRoutes = Router();

productRoutes.get("/", getAllProduct);
productRoutes.get("/:id", getByIdProduct);
productRoutes.post("/", validBodyRequest(productSchema), createProduct);
productRoutes.patch("/:id", validBodyRequest(productSchema), updateByIdProduct);
productRoutes.delete("/:id", removeByIdProduct);
productRoutes.patch("/soft-delete/:id", deleteSoftProduct);

export default productRoutes;
