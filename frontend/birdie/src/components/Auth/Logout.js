import React from "react";
import { Navigate } from "react-router-dom";
import useUserContext from "../../contexts/UserContext";

const Logout = () => {
    const { logout } = useUserContext();
    logout();
    return <Navigate to="/signin" />;
};

export default Logout;
