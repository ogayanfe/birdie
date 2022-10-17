import React, { useState, useContext, createContext, useEffect } from "react";

const themeContext = createContext();

const ThemeContextProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(JSON.parse(localStorage.getItem("darkTheme")));
    const context = {
        darkTheme: darkTheme,
        setDarkTheme,
    };

    useEffect(() => {
        if (darkTheme) {
            document.documentElement.classList.add("dark");
        } else document.documentElement.classList.remove("dark");
        localStorage.setItem("darkTheme", darkTheme);
    }, [darkTheme]);
    return <themeContext.Provider value={context}>{children}</themeContext.Provider>;
};

const useThemeContext = () => {
    return useContext(themeContext);
};

export { themeContext, ThemeContextProvider };
export default useThemeContext;
