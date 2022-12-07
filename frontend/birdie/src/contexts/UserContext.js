import React, { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const userContext = createContext();

const defaultProfileData = {
    username: "",
    date_joined: "",
    profile_pic: "",
    following: "",
    follower: "",
};
function UserContextProvider({ children }) {
    const userTokensFromStorage = JSON.parse(localStorage.getItem("userTokens"));
    const [user, setUser] = useState(
        userTokensFromStorage && jwtDecode(userTokensFromStorage.access)
    );
    const [profileData, setProfileData] = useState(defaultProfileData);
    const [tokens, setTokens] = useState(userTokensFromStorage);
    const axiosInstance = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            Authorization: `Bearer ${tokens && tokens.access}`,
        },
    });

    const fetchUserData = async () => {
        const response = await axiosInstance.get("accounts/info/");
        setProfileData(response.data);
    };

    const login = (data, onfailure) => {
        axiosInstance
            .post("/accounts/token/", {
                username: data.username,
                password: data.password,
            })
            .then((response) => {
                if (response.status === 200) {
                    data = response.data;
                    setUser(jwtDecode(data.access));
                    setTokens(data);
                    localStorage.setItem("userTokens", JSON.stringify(data));
                }
            })
            .catch((err) => {
                onfailure();
            });
    };

    const signup = (validatedData, onFailure) => {
        axiosInstance
            .post("/accounts/signup/", validatedData)
            .then((response) => {
                if (response.status < 400 && response.status >= 200) {
                    const { tokens } = response.data;
                    setUser(jwtDecode(tokens.access));
                    setTokens(tokens);
                    localStorage.setItem("userTokens", JSON.stringify(tokens));
                }
            })
            .catch((error) => onFailure(error));
    };

    const updateInfo = async (formData, onSuccess, onFailure) => {
        axiosInstance
            .patch("accounts/profile/update/", formData)
            .then((response) => {
                onSuccess(response);
            })
            .catch((e) => {
                onFailure(e);
            });
    };

    const logout = () => {
        setUser(null);
        setTokens(null);
        setProfileData(defaultProfileData);
        localStorage.clear();
    };

    const authcontext = {
        user: user,
        login: login,
        axiosInstance: axiosInstance,
        logout: logout,
        updateInfo: updateInfo,
        signup: signup,
        profileData: profileData,
        setProfileData: setProfileData,
        isDemoUser: profileData.username === "DemoUser",
    };

    useEffect(() => {
        fetchUserData();
    }, [tokens]);

    return <userContext.Provider value={authcontext}>{children}</userContext.Provider>;
}

const useUserContext = () => {
    return useContext(userContext);
};

export default useUserContext;
export { userContext, UserContextProvider };
