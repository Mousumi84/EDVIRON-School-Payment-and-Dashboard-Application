import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomTable from "../../Components/CustomTable";

function TransactionDetailsSchool() {
   const [transactions, setTransactions] = useState([]);
   const [schoolId, setSchoolId] = useState("");
   const [loading, setLoading] = useState(false);
   const [alertError, setAlertError] = useState("");

   const listSchoolIds = [
      { value: "65b0e6293e9f76a9694d84b4" },
      { value: "15b0e6293e9f76a9694d84b4" },
      { value: "25b0e6293e9f76a9694d84b4" },
      { value: "35b0e6293e9f76a9694d84b4" },
      { value: "45b0e6293e9f76a9694d84b4" },
      { value: "55b0e6293e9f76a9694d84b4" },
   ];

   const token = localStorage.getItem("Token");

   const headers = {
      Authorization: `${token}`,
   };

   const fetchSchoolTransactions = async () => {
      if (!schoolId) return;

      setLoading(true);
      setTransactions([]);
      try {
         const response = await axios({
            url: `${process.env.GLOBAL_BASE_URL}/api/transactions/school/${schoolId}`,
            method: "GET",
            headers,
         });

         if (response.data.status !== 200) {
            //alert(response.data.message);
            setAlertError(response.data.message);
            setLoading(false);
            return;
         }
         else {
            setTransactions(response.data.data);
            setLoading(false);
            setAlertError("");
         }
      } catch (err) {
         console.error(err);
         //alert(err.message);
         setAlertError(err.message);
         setLoading(false);
      }
      //setLoading(false);
   };

   const columns = [
      {
         title: "Sr No",
         key: "srno",
         render: (text, record, index) => index + 1,
      },
      {
         title: "Collect ID",
         dataIndex: "collect_id",
         key: "collect_id",
         sorter: (a, b) => a.collect_id.localeCompare(b.collect_id),
      },
      // { title: "School ID", dataIndex: "school_id", key: "school_id" },
      {
         title: "Date & Time",
         dataIndex: "createdAt",
         key: "createdAt",
         sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
         render: (value) => new Date(value).toLocaleString(),
      },
      {
         title: "Order Amount",
         dataIndex: "order_amount",
         key: "order_amount",
         sorter: (a, b) => a.order_amount - b.order_amount,
         render: (value) => (
            <span>₹ {value}</span>
         )
      },
      {
         title: "Transaction Amount",
         dataIndex: "transaction_amount",
         key: "transaction_amount",
         //sorter: true,
         render: (value) => (
            <span>₹ {value}</span>
         )
      },
      {
         title: "Gateway",
         width: "100px",
         dataIndex: "gateway",
         key: "gateway_name"
      },
      {
         title: "Payment Mode",
         width: "200px",
         dataIndex: "payment_mode",
         key: "payment_mode",
      },
      {
         title: "Bank Reference",
         width: "200px",
         dataIndex: "bank_reference",
         key: "bank_reference",
      },
      {
         title: "Status",
         width: "100px",
         dataIndex: "status",
         key: "status",
         render: (value) => (
            <span
               style={{
                  color:
                     value === "success"
                        ? "green"
                        : value === "failed"
                           ? "red"
                           : "orange",
                  fontWeight: 600,
               }}
            >
               {value && value.toUpperCase()}
            </span>
         ),
      },
      {
         title: "Error",
         dataIndex: "error_message",
         key: "error_message",
      },
   ];

   useEffect(() => {
      if (alertError !== "") {
         const timer = setTimeout(() => {
            setAlertError("");
         }, 5000);

         return () => clearTimeout(timer);
      }
   }, [alertError]);

   console.log(transactions);

   return (
      <div className="w-100">
         <div className="card card-body" style={{ background: "#ffffff32" }}>
            <CustomTable
               title="Transactions School History"
               data={transactions}
               columns={columns}
               loading={loading}
               filters={{ listSchoolIds }}
               schoolId={schoolId}
               setSchoolId={setSchoolId}
               fetchSchoolTransactions={fetchSchoolTransactions}
            />
         </div>
         {alertError !== "" && <div className="alert alert-danger" role="alert" >{alertError}</div>}
      </div>
   );
}

export default TransactionDetailsSchool;