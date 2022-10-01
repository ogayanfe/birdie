import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";

const Base = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="flex flex-row w-screen relative h-screen">
            <div
                className={` ${
                    showSidebar ? "w-64" : "w-14"
                } max-w-3/4 z-10  lg:w-64 transition-all duration-700 absolute h-screen lg:static`}
            >
                <SideNav setShowSidebar={setShowSidebar} open={showSidebar} />
            </div>
            <div className="flex-grow h-screen relative flex flex-col ml-14 lg:ml-0">
                <Header />
                <main className="w-full flex-grow mt-14">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Base;
