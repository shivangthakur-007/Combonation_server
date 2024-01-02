import { Router } from "express";
import { createProduct, getProduct, removeProduct, updateProduct } from "../controllers/product.controllers.js";

const router = Router();

router
    .route("/")
    .get(getProduct)
    .post(createProduct);

router
    .route("/:id")
    .put(updateProduct)
    .delete(removeProduct);

export default router;