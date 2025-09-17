const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { checkEmailModel, storeUserInfoModel, userFoundModel } = require("../Models/AuthModel");
const { dataValidation, dataValidationLogin } = require("../DataValidation");
const { jwtSecret } = require("../ConfigModule");

const signupController = async (req,res)  => {

    console.log("Signup",req.body);
    const {name,email,password,role} = req.body;
    
    //Data Validation
    try {
        await dataValidation({name,email,password,role});
    } catch (error) {
        return res.send({
            status: 400,
            message: error,
            error: error,
        });
    }

    
    //check if Email id already registered or not
    try {
        await checkEmailModel({email});
    } catch (error) {
        return res.send({
            status: 400,
            message: error,
            error: error,
        });
    }


    //Store User Details in DB 
    try {
        const userDb = await storeUserInfoModel({name,email,password,role});

        return res.send({
            status: 200,
            message: "Signup Successfully",
            data: userDb,
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal Server Error",
        });
    }
}


const loginController = async (req,res)  => {
    console.log("Login");
    const {email,password} = req.body;

    
    //Data Validation
    try {
        await dataValidationLogin({email,password});
    } catch (error) {
        return res.send({
            status: 400,
            message: error,
            error: error,
        });
    }

    
    //User registered / not
    try {
        const userDb = await userFoundModel({email});
       
        const checkPassword = await bcrypt.compare(password,userDb.password);

        if(!checkPassword) {
            return res.send({
                status: 400,
                message: "Incorrect Password",
            });
        }

        //Generate JWT token
        const jwtToken = jwt.sign({data:userDb},jwtSecret);

        //Session Base Auth
        req.session.isAuth=true;
        req.session.user = {
            name:userDb.name,
            userId:userDb._id,
            useremail:userDb.email,
            role:userDb.role,
        }
        let session = req.session;


        return res.send({
            status: 200,
            message: "Login Successfully",
            token: jwtToken,
            session,
        });
    } catch (error) {
        return res.send({
            status: 400,
            message: error,
            error: error,
        });
    }
}


const logoutController = async (req,res)  => {
    const email = req.user.data.email;
    console.log("Logout",email);

   req.session.destroy((er) => {
        if(er) {
            return res.send({
                status:500,
                message:"Internal server error",
            });
        }
        else {
            return res.send({
                status:200,
                message:"Logout successful",
            });
        }
    });
}


module.exports = {signupController, loginController, logoutController};