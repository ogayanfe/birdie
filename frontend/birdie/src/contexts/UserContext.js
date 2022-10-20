import React, { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const userContext = createContext();

function UserContextProvider({ children }) {
    const userTokensFromStorage = JSON.parse(localStorage.getItem("userTokens"));
    const [user, setUser] = useState(
        userTokensFromStorage && jwtDecode(userTokensFromStorage.access)
    );
    const [profileData, setProfileData] = useState({
        username: "",
        date_joined: "",
        profile_pic: "",
        following: "",
        follower: "",
    });
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
        profileData: profileData,
        setProfileData: setProfileData,
    };
    useEffect(() => {
        const fetchData = async () => {
            const response = await axiosInstance.get("accounts/info/");
            setProfileData(response.data);
        };
        fetchData();
    }, []);

    return <userContext.Provider value={authcontext}>{children}</userContext.Provider>;
}

const useUserContext = () => {
    return useContext(userContext);
};

export default useUserContext;
export { userContext, UserContextProvider };
