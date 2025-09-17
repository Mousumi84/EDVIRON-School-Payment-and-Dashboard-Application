const jwt = require('jsonwebtoken');
const axios = require('axios');
const { pgKey, paymentApiKey } = require('./ConfigModule');

async function createCollectRequest(payload) {
    // Sign with PAYMENT_API_KEY (or a dedicated secret)
    const sign = jwt.sign(payload, pgKey);

    console.log("sign =>", sign);
    //Call Payment API using axios
    const response = await axios.post(
        "https://dev-vanilla.edviron.com/erp/create-collect-request",
        {
            school_id: payload.school_id,
            amount: payload.amount,
            callback_url: payload.callback_url,
            sign,
        },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${paymentApiKey}`,
            },
        }
    );

    return response;
}

module.exports = { createCollectRequest };
