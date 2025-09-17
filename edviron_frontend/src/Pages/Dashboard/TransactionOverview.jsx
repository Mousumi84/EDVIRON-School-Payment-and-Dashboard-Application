// Transactions Overview 
// o Display a paginated and searchable list of all transactions fetched from the /transactions API. 
// o Columns: 
// ▪ collect_id 
// ▪ school_id 
// ▪ gateway
// ▪ order_amount 
// ▪ transaction_amount 
// ▪ status 
// ▪ custom_order_id 
// o Include a filter dropdown for status (e.g., "Success", "Pending", "Failed").
// o Multi-select filters for status and school IDs. And date-wise transactions 
// o Column sorting (asc/desc). 
// o Persist filters in URL so users can share specific views or reload without losing filter states. 


import React, { useEffect, useMemo, useState } from "react";
import { Select, DatePicker, Input, Radio, Button } from "antd";
import axios from "axios";
import CustomTable from "../../Components/CustomTable";


function TransactionOverview() {
   const [transactions, setTransactions] = useState([]);
   const [loading, setLoading] = useState(false);
   const [status, setStatus] = useState("");
   const [limit, setLimit] = useState(100);
   const [skip, setSkip] = useState(0);
   const [sort, setSort] = useState("payment_time");
   const [order, setOrder] = useState("asc");
   const [alertError, setAlertError] = useState("");
   const [selectedDate, setSelectedDate] = useState(null);

   const token = localStorage.getItem("Token");
   const headers = {
      Authorization: `${token}`,
   };

   const fetchTransactions = async () => {
      setLoading(true);
      try {
         const response = await axios({
            url: `http://localhost:8000/api/transactions?skip=${skip}&limit=${limit}&sort=${sort}&order=${order}`,
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
   };

   useEffect(() => {
      fetchTransactions();
   }, []);


   const columns = [
      {
         title: "Sr No",
         key: "srno",
         render: (text, record, index) => index + 1,
      },
      {
         title: "Collect ID",
         dataIndex: ["statuses", "collect_id"],
         key: "cillect_id",
         sorter: (a, b) => a.statuses.collect_id.localeCompare(b.statuses.collect_id),
      },
      {
         title: "School ID",
         dataIndex: "school_id",
         key: "school_id"
      },
      {
         title: "Date & Time",
         dataIndex: "createdAt",
         key: "createdAt",
         sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
         render: (value) => new Date(value).toLocaleString(),
      },
      {
         title: "Order Amount",
         dataIndex: ["statuses", "order_amount"],
         key: "order_amount",
         sorter: (a, b) => a.statuses.order_amount - b.statuses.order_amount,
         render: (value) => (
            <span>₹ {value}</span>
         )
      },
      {
         title: "Transaction Amount",
         dataIndex: ["statuses", "transaction_amount"],
         key: "transaction_amount",
         render: (value) => (
            <span>₹ {value}</span>
         )
      },
      {
         title: "Gateway",
         width: "100px",
         dataIndex: "gateway_name",
         key: "gateway_name"
      },
      {
         title: "Status",
         width: "100px",
         dataIndex: ["statuses", "status"],
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
         title: "Student Name",
         width: "200px",
         dataIndex: ["student_info", "name"],
         key: "student_name",
         render: (value) => (
            <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
         )
      },
      {
         title: "Custom Order ID",
         dataIndex: "custom_order_id",
         key: "custom_order_id",
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

   console.log("status=", status, limit, skip, sort, order, selectedDate);
   //console.log(transactions)

   return (
      <div>
         <div className="d-flex justify-content-end align-items-center" style={{ fontSize: 15, gap: "5px" }}>
            <div className="d-flex flex-row gap-2">
               <label>Limit: </label>
               <Select
                  value={limit}
                  style={{ width: 90 }}
                  onChange={(val) => setLimit(val)}
                  aria-label="Limit"
               >
                  <Select.Option value={10}>10</Select.Option>
                  <Select.Option value={20}>20</Select.Option>
                  <Select.Option value={50}>50</Select.Option>
                  <Select.Option value={100}>100</Select.Option>
               </Select>
            </div>
            <div className="d-flex flex-row gap-2">
               <label>Skip data: </label>
               <Input
                  value={skip}
                  style={{ width: 90 }}
                  onChange={(e) => setSkip(e.target.value)}
               />
            </div>
            <div className="d-flex flex-row gap-2">
               <label>Sort Field: </label>
               <Select
                  value={sort}
                  style={{ width: 150 }}
                  onChange={(val) => setSort(val)}
                  aria-label="Sort"
               >
                  <Select.Option value={"payment_time"}>Payment Time</Select.Option>
                  <Select.Option value={"status"}>Status</Select.Option>
                  <Select.Option value={"transaction_amount"}>Transaction Amount </Select.Option>
                  <Select.Option value={"order_amount"}>Order Amount</Select.Option>
               </Select>
            </div>
            <div className="d-flex flex-row gap-2">
               <label>Sort order: </label>
               <Radio.Group
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  options={[
                     { value: "asc", label: 'Asc' },
                     { value: "desc", label: 'Desc' },
                  ]}
               />
            </div>
            <Button className="btn btn-primary p-1" onClick={fetchTransactions}>Submit</Button>
         </div>
         <div className="w-100 gap-3 d-flex flex-column position-relative">
            <div className="p-3 d-flex flex-row gap-3 position-absolute end-0" style={{ zIndex: "100" }}>
               <Select placeholder="Status" style={{ width: 200, }} allowClear onChange={setStatus} aria-label="Status">
                  <Select.Option value="">All</Select.Option>
                  <Select.Option value="Success">Success</Select.Option>
                  <Select.Option value="Pending">Pending</Select.Option>
                  <Select.Option value="Failed">Failed</Select.Option>
               </Select>
               <DatePicker onChange={(val) => setSelectedDate(val)} format="YYYY-MM-DD" placeholder="Select Date" />
            </div>

            <div className="card card-body position-relative" style={{ background: "#ffffff32" }}>
               <CustomTable
                  title="Transactions History"
                  data={transactions}
                  columns={columns}
                  loading={loading}
                  filters={{
                     status: status,
                     selectedDate: selectedDate,
                  }}
               />
            </div>
            {alertError !== "" && <div className="alert alert-danger" role="alert" >{alertError}</div>}
         </div>
      </div>
   );
}

export default TransactionOverview;