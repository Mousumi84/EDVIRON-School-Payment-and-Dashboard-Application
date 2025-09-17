const { fetchAllTransactionModel, transactionsOrderModel, transactionsOrderStatusModel, fetchSchoolTransactionModel, transactionsOrderStatusCustomIdModel } = require("../Models/TransactionModel");

const fetchAllTransactionsController = async (req,res) => {
    console.log("Fetch All Transaction=>",req.query)
    const skip = Number(req.query.skip) || 0;
    const limit = Number(req.query.limit) || 100;
    const sortField = req.query.sort || 'payment_time';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;
    console.log("fetchAllTransactionsController",skip,limit,sortField,sortOrder);

    try {
        const response = await fetchAllTransactionModel({skip,limit,sortField,sortOrder});

        return res.send({
            status: 200,
            message: "All Transaction Data Fetched Successfully",
            data: response,
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal Server Error",
            error: error,
        });
    }
};


const fetchTransactionsBySchoolController = async (req,res) => {
    const schoolId = req.params.schoolId;
    console.log("Fetch Transactions By School",schoolId);

    try {
        //check if any data is there for that school id
        const schoolrecord = await fetchSchoolTransactionModel({schoolId});

        if(!schoolrecord || schoolrecord.length === 0) {
            return res.send({
                status: 400,
                message: "No transactions found for this school",
            });
        }
        console.log("schoolrecord=",schoolrecord);

        //take the order ids from the school data
        const orderIds = schoolrecord.map((record) => record._id); 
        console.log("orderIds=", orderIds);

        //fetch the transaction record
        const response = await transactionsOrderStatusModel({orderIds});
        console.log("response=",response);

        return res.send({
            status: 200,
            message: "School Transaction Data Fetched Successfully",
            data: response,
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal Server Error",
            error: error,
        });
    }
};


const checkTransactionsStatusController = async (req,res) => {
    const custom_order_id = req.params.custom_order_id;
    console.log("Consumer data",req.params,custom_order_id);

    try {
        //check if any data is there for that custom_order_id
        const response = await transactionsOrderModel({custom_order_id});

        if (!response) {
            return res.send({ 
                status: 400,
                message: 'No transactions found for this Custom Id', 
            });
        }

        let orderId = response._id;

        //fetch the transaction record of that custom_order_id
        const status = await transactionsOrderStatusCustomIdModel({orderId});
        console.log(status);

        return res.send({
            status: 200,
            data: status,
            collect_id: status?._id,
            orderstatus: status?.status || 'not_found',
            message: "Transactions Status Success",
        });
    } catch (error) {
        return res.send({
            status: 500,
            message: "Internal Server Error",
            error: error,
        });
    }
};


module.exports = { fetchAllTransactionsController, fetchTransactionsBySchoolController, checkTransactionsStatusController};