const { findOrderModel, saveOrderModel, findAndUpdateOrderModel } = require("../Models/WebhookModel");

const webhookController = async (req,res) => {
    const { status, order_info } = req.body;

    try {
        if (!order_info || !order_info.order_id) {
            return res.send({ 
                status: 400,
                message: "Invalid webhook payload", 
            });
        }

        // Parse the webhook payload. 
        const {
            order_id,
            order_amount,
            transaction_amount,
            gateway,
            bank_reference,
            status,
            payment_mode,
            payment_details,
            payment_message,
            payment_time,
            error_message,
        } = order_info;

        //check if any record is there 
        //const orderdb = await findOrderModel({order_id});

        //if(orderdb && orderdb.length > 0) {
            //Find and Update the Order Status in MongoDB
            const updateOrder = await findAndUpdateOrderModel({order_id, order_amount, transaction_amount, gateway, bank_reference, status, payment_mode, payment_details, payment_message, payment_time, error_message});
    
            return res.send({
                status: 200,
                message: "Webhook Processed Successfully",
                data: updateOrder,
            });
        //}

        //Save the Order Status in MongoDB
        // const saveOrder = await saveOrderModel({order_id, order_amount, transaction_amount, gateway, bank_reference, status, payment_mode, payment_details, payment_message, payment_time, error_message});
    
        // return res.send({
        //     status: 200,
        //     message: "Webhook created Successfully",
        //     data: saveOrder,
        // });
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal Server Error",
            error: error,
        });
    }
}

module.exports = {webhookController};