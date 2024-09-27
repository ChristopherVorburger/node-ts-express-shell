import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ProductsService } from "../services";
import { ProductsController } from "./controller";

export class ProductsRoutes {
  static get routes(): Router {
    const router = Router();

    const productsService = new ProductsService();
    const controller = new ProductsController(productsService);

    router.get("/", controller.getProducts);
    router.post("/", [AuthMiddleware.validateJWT], controller.createProduct);

    return router;
  }
}
