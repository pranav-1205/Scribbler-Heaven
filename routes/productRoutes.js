import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  placeOrderController,
  productCategoryController,
  productCountController,
  productFilterController,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

// Configure formidable
const formidableConfig = formidable({
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFieldsSize: 10 * 1024 * 1024, // 10MB
  multiples: true
});

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidableConfig,
  createProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

//update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
//filter product
router.post('/product-filters',productFilterController)

//product count
router.get('/product-count',productCountController)

//product per page
router.get('/product-list/:page',productListController)

//search product 
router.get("/search/:keyword",searchProductController)

//similar product
router.get("/related-product/:pid/:cid",relatedProductController)

//category wise product
router.get("/product-category/:slug",productCategoryController)

//place order
router.post('/place-order', requireSignIn, placeOrderController);

export default router;
