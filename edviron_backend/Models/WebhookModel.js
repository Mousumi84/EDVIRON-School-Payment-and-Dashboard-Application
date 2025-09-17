const OrderStatusSchema = require("../Schemas/OrderStatusSchema");

const findOrderModel = ({order_id}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const response = await OrderStatusSchema.findOne({collect_id : order_id });

            resolve(response);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}


const findAndUpdateOrderModel = ({order_id, order_amount, transaction_amount, gateway, bank_reference, status, payment_mode, payment_details, payment_message, payment_time, error_message}) => {
    return new Promise(async (resolve,reject) => {

        try {
            const response = await OrderStatusSchema.findOneAndUpdate({collect_id : order_id },
                {
                    $set: {
                        order_amount,
                        gateway,
                        transaction_amount,
                        payment_mode,
                        payment_details,
                        bank_reference,
                        payment_message,
                        status,
                        error_message,
                        payment_time
                    }
                }
            )

            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}


const saveOrderModel = ({order_id, order_amount, transaction_amount, gateway, bank_reference, status, payment_mode, payment_details, payment_message, payment_time, error_message}) => {
    return new Promise(async (resolve,reject) => {

        const orderObj = new OrderStatusSchema({
            collect_id: order_id,
            order_amount: order_amount,
            gateway: gateway,
            transaction_amount: transaction_amount,
            payment_mode: payment_mode,
            payment_details: payment_details,
            bank_reference: bank_reference,
            payment_message: payment_message,
            status: status,
            error_message: error_message,
            payment_time: payment_time
        });

        try {
            const response = await orderObj.save();

            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {findOrderModel, findAndUpdateOrderModel, saveOrderModel};