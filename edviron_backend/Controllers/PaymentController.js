const axios = require("axios");
const jwt = require("jsonwebtoken");
const { paymentApiKey, pgKey } = require("../ConfigModule");
const { createCollectRequest } = require("../createCollectRequest");
const { storeOrderModel, storeOrderStatusModel } = require("../Models/PaymentModel");

let school_id = "65b0e6293e9f76a9694d84b4"; 
let collect_request_id;


const createPaymentController = async (req,res) => {
    const { trustee_id, student_info, gateway_name, custom_order_id, amount, callback_url } = req.body;

    try {
        if (!amount || !callback_url) {
            return res.send({ 
                status: 400,
                error: "Amount and callback_url are required" 
            });
        }

        // Create order record
        const order = await storeOrderModel({ school_id, trustee_id, student_info, gateway_name, custom_order_id});

        // Create pending order status
        const orderStatus = await storeOrderStatusModel({amount,order});

        //Prepare payload for generating JWT-sign using PG key
        const payload = {
            school_id,
            amount: amount.toString(),
            callback_url,
        };

        const response = await createCollectRequest(payload);
     //   console.log("line 90- createPaymentController response:",response.data);

        collect_request_id = response.data.collect_request_id

        //Return payment link to frontend
        res.send({
            status: 200,
            message: "Payment request created successfully",
            collect_request_id: collect_request_id,
            payment_url: response.data.collect_request_url || null,
        });
    } catch (error) {
        return res.send({
            status: 400,
            message: "Failed to create payment",
            error: error,
        });
    }
}


const checkPaymentStatusController = async (req,res) => {
    console.log("collect_request_id=",collect_request_id);
    try {
        //Generate JWT-sign using PG key
        const payload = {
            school_id,
            collect_request_id,
        };

        const sign = jwt.sign(payload, pgKey);


        //Check Payment Sttatus using axios
        const response = await axios.get(
            `https://dev-vanilla.edviron.com/erp/collect-request/${collect_request_id}?school_id=${school_id}&sign=${sign}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${paymentApiKey}`,
                },
            }
        );
        console.log("line 133- checkPaymentStatusController response:",response);

        //Return payment link to frontend
        res.send({
            status: 200,
            message: "Payment status generated successfully",
            data: response,
        });
    } catch (error) {
        return res.send({
            status: 400,
            message: "Failed to get payment status",
            error: error,
        });
    }
}


module.exports = {createPaymentController, checkPaymentStatusController};