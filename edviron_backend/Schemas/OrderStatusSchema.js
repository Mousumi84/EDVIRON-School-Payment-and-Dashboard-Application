const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderStatusSchema = new Schema({
    collect_id : {
        type: Schema.Types.ObjectId, 
        ref: 'Order', 
        required: true, 
        index: true 
    },
    order_amount: { 
        type: Number, 
        required: true 
    },
    gateway: { 
        type: String 
    },
    transaction_amount: { 
        type: Number 
    },
    payment_mode: { 
        type: String 
    },
    payment_details: { 
        type: String 
    },
    bank_reference: { 
        type: String 
    },
    payment_message: { 
        type: String 
    },
    status: { 
        type: String, 
        enum: ["pending", "success", "failed"],
        default: 'pending', 
        index: true 
    },
    error_message: { 
        type: String 
    },
    payment_time: { 
        type: Date 
    }
},
{ 
    timestamps: true 
});

const OrderStatusSchema = mongoose.model('OrderStatus', orderStatusSchema);

module.exports =  OrderStatusSchema; 