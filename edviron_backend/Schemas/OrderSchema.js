const mongoose=require("mongoose");

const Schema = mongoose.Schema;

const StudentInfoSchema = new Schema({
  name: String,
  id: String, 
  email: String
}, { _id: false });

const orderSchema = new Schema({
    school_id: { 
        type: Schema.Types.ObjectId, 
        required: true, 
        index: true 
    },
    trustee_id: { 
        type: Schema.Types.ObjectId 
    },
    student_info: { 
        type: StudentInfoSchema, 
        required: true 
    },
    gateway_name: { 
        type: String 
    },
    custom_order_id: { 
        type: String, 
        unique: true, 
        sparse: true,
        index: true, 
    },
},
{ 
    timestamps: true 
});

//OrderSchema.index({ custom_order_id: 1 });

const OrderSchema = mongoose.model("Order",orderSchema);

module.exports =  OrderSchema; 