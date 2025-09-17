const OrderSchema = require("../Schemas/OrderSchema");
const OrderStatusSchema = require("../Schemas/OrderStatusSchema");

const storeOrderModel=({school_id, trustee_id, student_info, gateway_name, custom_order_id}) => {
    return new Promise(async (resolve,reject) => {

        const orderObj = new OrderSchema({
            school_id,
            trustee_id,
            student_info,
            gateway_name,
            custom_order_id,
        });

        try {
            const response=await orderObj.save();
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}


const storeOrderStatusModel=({amount,order}) => {
    return new Promise(async (resolve, reject) => {

        const orderStatusObj = new OrderStatusSchema({
            collect_id: order._id,
            order_amount: amount,
            status: 'pending'
        });

        try {
            const response = await orderStatusObj.save();
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
}


module.exports = { storeOrderModel, storeOrderStatusModel };