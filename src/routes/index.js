import { Router } from "express";
import authRoutes from "./authRouter.js";
import categoryRoutes from "./categoryRouter.js";
import productRoutes from "./productsRouter.js";

const routes = Router();
routes.use("/products", productRoutes);
routes.use("/auth", authRoutes);
routes.use("/category", categoryRoutes);

export default routes;
