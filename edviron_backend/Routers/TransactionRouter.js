const express=require("express");
const isAuth = require("../Middlewares/isAuth");
const { fetchAllTransactionsController, fetchTransactionsBySchoolController, checkTransactionsStatusController } = require("../Controllers/TransactionController");
const TransactionRouter=express.Router();

TransactionRouter.get("/transactions",isAuth,fetchAllTransactionsController);
TransactionRouter.get("/transactions/school/:schoolId",isAuth,fetchTransactionsBySchoolController);
TransactionRouter.get("/transaction-status/:custom_order_id",isAuth,checkTransactionsStatusController);

module.exports={TransactionRouter};