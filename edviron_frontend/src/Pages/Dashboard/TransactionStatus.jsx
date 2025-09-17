import { useEffect, useState } from "react";
import { Input, Button, Space, Spin, Card } from "antd";
import axios from "axios";

function TransactionStatus() {
   const [transactionStatus, setTransactionStatus] = useState(null);
   const [customId, setCustomId] = useState("");
   const [loading, setLoading] = useState(false);
   const [alertError, setAlertError] = useState("");

   const token = localStorage.getItem("Token");

   const headers = {
      Authorization: `${token}`,
   };

   const fetchCustomStatus = async () => {
      if (!customId) return;

      setLoading(true);
      setTransactionStatus(null);
      try {
         const response = await axios({
            url: `${process.env.REACT_APP_API_URL}/api/transaction-status/${customId}`,
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
            setTransactionStatus(response.data);
            setLoading(false);
         }

      } catch (err) {
         console.error(err);
         //alert(err.message);
         setAlertError(err.message);
         setLoading(false);
      }
      // setLoading(false);
   };

   useEffect(() => {
      if (alertError !== "") {
         const timer = setTimeout(() => {
            setAlertError("");
         }, 5000);

         return () => clearTimeout(timer);
      }
   }, [alertError]);


   console.log(transactionStatus);

   return (
      <div className="w-100">
         <div className="card card-body" style={{ background: "#ffffff32" }}>
            <div className='mb-5 d-flex '>
               <Space>
                  <Input
                     placeholder="Enter Custom Id"
                     value={customId}
                     onChange={(e) => setCustomId(e.target.value)}
                     style={{ width: 300 }}
                     allowClear
                  />
                  <Button
                     type="primary"
                     onClick={fetchCustomStatus}
                     disabled={!customId || loading}
                  >
                     {loading ? <Spin size="small" /> : "Submit"}
                  </Button>
               </Space>
            </div>


            <div style={{ width: "100%", }}>
               <div className="page-inner">
                  <Card title="Transaction Details Status" className="d-flex flex-column " style={{ width: "100%" }}>
                     {transactionStatus !== null && (
                        <div className="d-flex flex-column" style={{ textAlign: "left", marginLeft: "200px" }}>
                           <h4 style={{ fontSize: "30px", color: "#0a145eff" }}>Custom Id : {customId}</h4>
                           <div className="d-flex flex-column align-items-start" style={{ margin: "50px" }}>
                              <p style={{ fontSize: "20px", color: "#00031aff" }}><strong>Order Id:</strong> <span style={{ color: "#001390ff", marginLeft: "200px" }}>{transactionStatus.collect_id}</span></p>
                              <p style={{ fontSize: "20px", color: "#00031aff" }}><strong>Order Amount:</strong> <span style={{ color: "#001390ff", marginLeft: "142px" }}>₹{transactionStatus.data.order_amount}</span></p>
                              <p style={{ fontSize: "20px", color: "#00031aff" }}><strong>Order Status:</strong> <span style={{ marginLeft: "161px", color: transactionStatus.orderstatus === "success" ? "green" : transactionStatus.orderstatus === "failed" ? "red" : "orange" }}>{transactionStatus.orderstatus.toUpperCase()}</span></p>                                        {/*{transactionStatus.orderstatus === "success" ? <span style={{color: "green", marginLeft: "150px"}}>SUCCESS</span> : <span style={{color: "red", marginLeft: "160px"}}>PENDING</span>}</span></p> */}
                              <p style={{ fontSize: "20px", color: "#00031aff" }}><strong>Order At:</strong> <span style={{ color: "#001390ff", marginLeft: "197px" }}>{new Date(transactionStatus.data.createdAt).toLocaleString()}</span></p>
                              <p style={{ fontSize: "20px", color: "#00031aff" }}><strong>Payment At:</strong> <span style={{ color: "#001390ff", marginLeft: "169px" }}>{new Date(transactionStatus.data.updatedAt).toLocaleString()}</span></p>
                           </div>
                        </div>
                     )}
                  </Card>
               </div>
            </div>
         </div>
         {alertError !== "" && <div className="alert alert-danger" role="alert" >{alertError}</div>}
      </div>
   );
}


export default TransactionStatus;