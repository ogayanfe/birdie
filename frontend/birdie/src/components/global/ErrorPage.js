import React from "react";
import { Link, Navigate } from "react-router-dom";
import useUserContext from "../../contexts/UserContext";
import Header from "./Header";

const ErrorPage = () => {
    const { user } = useUserContext();
    if (!user) {
        return <Navigate to="signin" />;
    }
    return (
        <div className="dark:bg-[#030106]">
            <Header isError={true} />
            <main className="flex-col gap-4  text-3xl dark:text-gray-300 xl:text-4xl flex items-center justify-center h-screen dark:border-white border-t-4">
                <h1 className="text-center capitalize">Page not found</h1>
                <span className="text-center capitalize">404</span>
                <Link
                    to="/"
                    className="text-lg p-2 bg-purple-500 text-purple-100 rounded-lg transition-all hover:text-purple-600 hover:bg-purple-200"
                >
                    Back home
                </Link>
            </main>
        </div>
    );
};

export default ErrorPage;
