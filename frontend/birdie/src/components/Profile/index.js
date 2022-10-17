import React, { useState } from "react";
import { Tab, Tabs, createTheme } from "@mui/material";
import useUserContext from "../../contexts/UserContext";
import PostComments from "./PostComments";
import ProfilePostContainer from "./ProfilePostContainer";
import MediaPostContainer from "./MediaPostContainer";
import useThemeContext from "../../contexts/themeContext";

const tabDarkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const Profile = () => {
    const { profileData } = useUserContext();
    const [currentTab, setCurrentTab] = useState(1);
    const { darkTheme } = useThemeContext();
    const handleChange = (x, value) => {
        setCurrentTab(value);
    };
    const { username, profile_pic, followers, following, date_joined, cover_pic } = profileData;
    return (
        <div className="w-[599px] max-w-[99%] mt-1 mx-auto">
            <div className="bg-gray-100 dark:bg-[#030108]">
                <div className="h-[270px] w-full relative">
                    <div className="h-[200px]">
                        <img
                            src={cover_pic}
                            alt="cover"
                            className="w-full h-full object-cover"
                        ></img>
                    </div>
                    <img
                        src={profile_pic}
                        alt={username}
                        className="rounded-full w-[136px] h-[136px] absolute top-1/2 left-2 border-4 border-purple-500"
                    ></img>
                    <button className="float-right m-4 border-2 p-1 px-2 rounded-full text-purple-500 text-sm border-purple-500">
                        Edit profile
                    </button>
                </div>
                <div className="p-4 flex flex-col gap-1">
                    <p className="capitalize text-black text-lg">@{username}</p>
                    <div className="capitalize text-sm text-[#5B7083]">joined {date_joined}</div>
                    <div className="text-[#5b7083] text-sm flex gap-1">
                        <div>
                            <span className="text-black dark:text-gray-400">{followers} </span>
                            {followers > 1 ? "followers" : "follower"}
                        </div>
                        <span className="text-black">.</span>
                        <div>
                            <span className="text-black dark:text-gray-400">{following}</span>{" "}
                            following
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full sticky top-0 z-50 mt-3 bg-gray-100 border-b-4 p-3 dark:bg-[#030108] dark:border-gray-900">
                <Tabs
                    value={currentTab}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="basic tabs example"
                    centered
                    theme={tabDarkTheme}
                    component="nav"
                    style={darkTheme ? { background: "#030108" } : null}
                >
                    <Tab label="Posts" value={1} theme={darkTheme ? tabDarkTheme : null} />
                    <Tab label="Comments" value={2} theme={darkTheme ? tabDarkTheme : null} />
                    <Tab label="media" value={3} theme={darkTheme ? tabDarkTheme : null} />
                </Tabs>
            </div>
            <div className="w-full pl-4 mx-auto">
                {currentTab === 1 && <ProfilePostContainer />}
                {currentTab === 2 && <PostComments />}
                {currentTab === 3 && <MediaPostContainer />}
            </div>
        </div>
    );
};

export default Profile;
