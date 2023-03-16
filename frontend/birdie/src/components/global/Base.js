import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { PageContextProvider } from "../../contexts/pageContext";
import Header from "./Header";
import SideNav from "./SideNav";

const Base = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <div className="flex flex-row w-screen relative h-screen xxl:grid xxl:grid-cols-[30%,_auto] dark:bg-black">
            <div
                className={` ${
                    showSidebar ? "w-64" : "w-0 sm:w-14"
                } max-w-3/4 z-50  lg:w-96 transition-all xxl:w-full duration-700 absolute h-screen lg:static`}
            >
                <SideNav setShowSidebar={setShowSidebar} open={showSidebar} />
            </div>
            <div className="flex-grow h-screen w-[calc(100%_-_3.5rem)] xxl:w-full relative flex flex-col mx-1 sm:ml-14 lg:ml-0">
                <Header />
                <main className="w-full h-full flex-grow mt-14 overflow-y-scroll pb-14 border-t-4 dark:border-gray-900">
                    <PageContextProvider>
                        <Outlet />
                    </PageContextProvider>
                </main>
            </div>
            {showSidebar && (
                <div
                    className="fixed w-screen h-screen lg:hidden bg-black opacity-50 z-40"
                    onClick={() => setShowSidebar(false)}
                ></div>
            )}
        </div>
    );
};

export default Base;
