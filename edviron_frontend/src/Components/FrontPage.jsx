import { Outlet } from "react-router-dom";

export function FrontPage() {

    return (
    <>
        <div id="frontPage">
            <div className="h3 m-5">
                School Payments and Dashboard application
            </div>

            <div id="outlet1">
                <Outlet />
            </div> 
        </div>
    </>
    );
}