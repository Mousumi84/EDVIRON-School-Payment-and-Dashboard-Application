import { Outlet, useNavigate } from "react-router-dom";
import { details, themeContext } from "../App";
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { Children, useContext, useState } from "react";
import { LogoutOutlined } from "@ant-design/icons";
import axios from "axios";

export function Dashboard() {
    const navigate = useNavigate();
    const { setIsLogin } = useContext(details);
    const { theme, setTheme } = useContext(themeContext);
    const [activePage, setActivePage] = useState("");
    const token = localStorage.getItem("Token");

    const headers = {
        Authorization: `${token}`,
    };

    const changeTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    }

    const logoutClick = async () => {
        try {
            const response = await axios({
                url: `${process.env.GLOBAL_BASE_URL}/api/auth/logout`,
                method: "POST",
                headers
            });

            if (response.data.status !== 200) {
                alert(response.data.message);
                return;
            }

            localStorage.removeItem("Token");
            localStorage.removeItem("User");
            setIsLogin(false);

            navigate("/");

        } catch (error) {
            alert("An error occured to logout");
        }
    }

    const cllTrnsHst = (e) => {
        setActivePage(e.target.innerHTML);
        navigate("/dashboard/transactions");
    }
    const cllTrnsSclHst = (e) => {
        setActivePage(e.target.innerHTML);
        navigate("/dashboard/transactions-school-details");
    }
    const cllTrnsSt = (e) => {
        setActivePage(e.target.innerHTML);
        navigate("/dashboard/transactions-status");
    }
    console.log("active page", activePage);

    return (
        <>
            <div id="dashboard w-100 ">
                <div className="d-flex flex-row align-items-center" style={{ background: "#bababa1a", width: "100%", borderBottom: "solid 1px #a2a1a127" }}>
                    <div className="p-4 h3 flex-grow-1" style={{ textAlign: "left" }}>
                        Transaction
                    </div>
                    <div className="p-4" onClick={(e) => cllTrnsHst(e)}>{activePage === "Transaction History" ? <span style={{ background: "#6d6d6d2e", padding: "5px" }}>Transaction History</span> : <span>Transaction History</span>}</div>
                    <div className="p-4" onClick={cllTrnsSclHst}>{activePage === "Transaction School Details" ? <span style={{ background: "#6d6d6d2e", padding: "5px" }}>Transaction School Details</span> : <span>Transaction School Details</span>}</div>
                    <div className="p-4" onClick={cllTrnsSt}>{activePage === "Transaction Status" ? <span style={{ background: "#6d6d6d2e", padding: "5px" }}>Transaction Status</span> : <span>Transaction Status</span>}</div>
                    <div className="p-4" onClick={changeTheme}>{theme === "light" ? <CiDark /> : <MdDarkMode />}</div>
                    <div className="btn px-4" style={{ background: "#bababa2a" }} onClick={logoutClick}><LogoutOutlined /> Logout</div>
                </div>

                <div id="outlet1" className="w-90 m-5">
                    <Outlet />
                </div>
            </div>
        </>
    );
}