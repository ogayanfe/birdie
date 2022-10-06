import React, { createContext, useContext, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const userContext = createContext();

function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [tokens, setTokens] = useState(null);
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            Authorization: `Bearer ${tokens && tokens.access}`,
        },
    });
    const login = (data) => {
        axiosInstance
            .post("/accounts/token/", {
                username: data.username,
                password: data.password,
            })
            .then((response) => {
                data = response.data;
                if (response.status === 200) {
                    setUser(jwtDecode(data.refresh));
                    setTokens(data);
                }
            });
    };

    const authcontext = {
        user: user,
        login: login,
        axiosInstance: axiosInstance,
    };

    return <userContext.Provider value={authcontext}>{children}</userContext.Provider>;
}

const useUserContext = () => {
    return useContext(userContext);
};

export default useUserContext;
export { userContext, UserContextProvider };
