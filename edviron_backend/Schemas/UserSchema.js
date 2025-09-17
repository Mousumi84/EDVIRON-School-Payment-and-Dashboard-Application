const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type:String,
        required:true,
        select:false,
    },
    role: { 
        type: String, 
        default: 'user' 
    }
},
{ 
    timestamps: true 
});

const UserSchema = mongoose.model("user",userSchema);

module.exports =  UserSchema; 