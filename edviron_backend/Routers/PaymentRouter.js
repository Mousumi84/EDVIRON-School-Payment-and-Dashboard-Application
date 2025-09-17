const express=require("express");
const isAuth = require("../Middlewares/isAuth");
const { createPaymentController, checkPaymentStatusController } = require("../Controllers/PaymentController");
const PaymentRouter=express.Router();

PaymentRouter.post("/create-payment",isAuth,createPaymentController);
PaymentRouter.get("/check-payment-status",isAuth,checkPaymentStatusController);

module.exports={PaymentRouter};