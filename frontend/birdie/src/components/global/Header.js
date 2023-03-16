import Avatar from "@mui/material/Avatar";
import React from "react";
import useUserContext from "../../contexts/UserContext";
import { useLocation } from "react-router-dom";
import useThemeContext from "../../contexts/themeContext";

const Header = (props) => {
    const {
        user,
        profileData: { username, profile_pic },
    } = useUserContext();
    const { darkTheme, setDarkTheme } = useThemeContext();
    const { isError } = props;
    const location = useLocation();
    let cur = location.pathname.split("/").at(1);
    if (cur === "") cur = "home";
    return (
        <header className="flex items-center justify-center pl-12 sm:pl-2 p-2 h-14 absolute w-full bg-gray-100 border-0 text-gray-900 sm:px-8 dark:bg-black">
            <div className="max max-w-6xl w-full flex justify-between">
                <div
                    className={`flex gap-1 text-2xl text-purple-400 items-center`}
                    aria-hidden={true}
                >
                    <span className="text-4xl">
                        <iconify-icon icon="game-icons:hummingbird">birdie logo</iconify-icon>
                    </span>
                    <h1 className="font-bold italic inline-block capitalize">
                        {isError ? "birdie" : cur}
                    </h1>
                </div>
                <div className="flex justify-between items-center gap-3">
                    <button
                        className="text-purple-400 h-full text-2xl gap-1 justify-center px-2 xm:rounded-full rounded-lg"
                        onClick={() => setDarkTheme((p) => !p)}
                    >
                        {darkTheme ? (
                            <iconify-icon icon="carbon:light">Light Theme</iconify-icon>
                        ) : (
                            <iconify-icon icon="bi:moon-stars-fill">Dark theme</iconify-icon>
                        )}
                    </button>
                    <Avatar src={user && profile_pic} alt={user && username}>
                        {username && username.at(0).toUpperCase()}
                    </Avatar>
                    <p className="text-purple-400 text-lg xm:static fixed -top-36 capitalize">
                        {user && username}
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
