const { mongoose } = require("mongoose");
const bcrypt=require('bcryptjs');
const { salt } = require("../ConfigModule");
const UserSchema = require("../Schemas/UserSchema");

const checkEmailModel=({email}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const response=await UserSchema.findOne({email : email});

            if(response ) {
                reject("Email already registered");
            }

            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}


const storeUserInfoModel=({name,email,password,role}) => {
    return new Promise(async (resolve,reject) => {

        const hashPassword=await bcrypt.hash(password,Number(salt));

        const userObj=new UserSchema({
            name : name,
            email : email,
            password : hashPassword, 
            role: role,
        });

        try {
            const response=await userObj.save();
            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}


const userFoundModel=({email}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const response=await UserSchema.findOne({email : email}).select("+password");;

            if(!response ) {
                reject("User not registered");
            }

            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}


module.exports={checkEmailModel,storeUserInfoModel,userFoundModel};