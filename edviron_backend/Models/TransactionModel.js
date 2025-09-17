const OrderSchema = require("../Schemas/OrderSchema");
const OrderStatusSchema = require("../Schemas/OrderStatusSchema");

const fetchAllTransactionModel = ({skip,limit,sortField,sortOrder}) => {
    return new Promise(async (resolve,reject) => {
        console.log("SKIP=",skip,"LIMIT",limit,"SORTFIELD=",sortField,"SORTORDER=",sortOrder)

        try {
            const response = await OrderSchema.aggregate([
                {
                    $lookup: {
                        from: "orderstatuses", 
                        localField: "_id",
                        foreignField: "collect_id",
                        as: "statuses",
                    },
                },
                {
                    $unwind: {
                        path: "$statuses",
                        preserveNullAndEmptyArrays: true, 
                    },
                },
                {
                    $sort: {
                        [`statuses.${sortField}`]: sortOrder,
                    },
                },
                {
                    $skip: skip,
                },
                {
                    $limit: limit,
                },
                {
                    $project: {
                        _id: 1,
                        school_id: 1,
                        trustee_id: 1,
                        student_info: 1,
                        gateway_name: 1,
                        custom_order_id: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        "statuses.order_amount": 1,
                        "statuses.transaction_amount": 1,
                        "statuses.status": 1,
                        "statuses.collect_id": 1,
                        "statuses.bank_reference": 1,
                        "statuses.payment_mode": 1,
                        "statuses.payment_time": 1,
                        "statuses.error_message": 1,
                    },
                },
            ]);
           // console.log("fetchAllTransactionModel =>",response);

            resolve(response);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })    
}


const fetchSchoolTransactionModel = ({schoolId}) => {
    return new Promise(async (resolve,reject) => {
        try {
            const response = await OrderSchema.find({ school_id: schoolId });

            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}


const transactionsOrderModel = ({custom_order_id}) => {
    return new Promise(async (resolve,reject) => {
        try {
            const response = await OrderSchema.findOne({ custom_order_id });

            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}


const transactionsOrderStatusModel = ({orderIds}) => {
    return new Promise(async (resolve,reject) => {
        try {
            const response = await OrderStatusSchema.find({ collect_id: {$in: orderIds } });

            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}


const transactionsOrderStatusCustomIdModel = ({orderId}) => {
    return new Promise(async (resolve,reject) => {
        try {
            const response = await OrderStatusSchema.findOne({ collect_id: orderId });

            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {fetchAllTransactionModel, fetchSchoolTransactionModel, transactionsOrderModel, transactionsOrderStatusModel, transactionsOrderStatusCustomIdModel};