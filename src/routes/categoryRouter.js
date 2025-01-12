import { Router } from "express";
import {
  createCategory,
  deleteSoftCategory,
  getAllCategory,
  getByIdCategory,
  removeByIdCategory,
  updateByIdCategory,
} from "../controllers/categoryControllers.js";
import categorySchema from "../validations/categorySchema.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";

const categoryRoutes = Router();

categoryRoutes.get("/", getAllCategory);
categoryRoutes.get("/:id", getByIdCategory);
categoryRoutes.post("/", validBodyRequest(categorySchema), createCategory);
categoryRoutes.patch(
  "/:id",
  validBodyRequest(categorySchema),
  updateByIdCategory
);
categoryRoutes.delete("/:id", removeByIdCategory);
categoryRoutes.patch("/soft-delete/:id", deleteSoftCategory);

export default categoryRoutes;
