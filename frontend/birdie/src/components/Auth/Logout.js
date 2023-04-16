import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useUserContext from "../../contexts/UserContext";

const Logout = () => {
    const { logout } = useUserContext();

    useEffect(() => {
        document.title = "Birdie | Signup";
        return function () {
            document.title = "Birdie";
        };
    }, []);

    logout();
    return <Navigate to="/signin" />;
};

export default Logout;
