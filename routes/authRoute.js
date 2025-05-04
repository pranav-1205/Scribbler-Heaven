import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgetPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  getAllUsersController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post(`/register`, registerController);

//LOGIN || POST
router.post("/login", loginController);

//Forget Password || POST
router.post("/forget-password", forgetPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//Protected Route user-auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//Protected Route admin-auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/order", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//order status update
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

//get all users
router.get("/all-users", requireSignIn, isAdmin, getAllUsersController);

export default router;
