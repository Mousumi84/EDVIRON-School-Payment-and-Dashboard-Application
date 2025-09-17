const express=require("express");
const isAuth = require("../Middlewares/isAuth");
const { signupController, loginController, logoutController } = require("../Controllers/AuthController");
const AuthRouter=express.Router();

AuthRouter.post("/signup",signupController);
AuthRouter.post("/login",loginController);
AuthRouter.post("/logout",isAuth,logoutController);

module.exports={AuthRouter};