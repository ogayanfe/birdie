import React, { createContext, useContext, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const userContext = createContext();

function UserContextProvider({ children }) {
    const userTokensFromStorage = JSON.parse(localStorage.getItem("userTokens"));
    const [user, setUser] = useState(
        userTokensFromStorage && jwtDecode(userTokensFromStorage.access)
    );
    const [tokens, setTokens] = useState(userTokensFromStorage);
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
                    console.log(jwtDecode(data.refresh));
                    setUser(jwtDecode(data.access));
                    setTokens(data);
                    localStorage.setItem("userTokens", JSON.stringify(data));
                }
            });
    };

    const logout = () => {
        setUser(null);
        setTokens(null);
        localStorage.clear();
    };

    const authcontext = {
        user: user,
        login: login,
        axiosInstance: axiosInstance,
        logout: logout,
    };

    return <userContext.Provider value={authcontext}>{children}</userContext.Provider>;
}

const useUserContext = () => {
    return useContext(userContext);
};

export default useUserContext;
export { userContext, UserContextProvider };
