import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import useUserContext from "../../contexts/UserContext";
import PostComments from "./PostComments";
import ProfilePostContainer from "./ProfilePostContainer";
import MediaPostContainer from "./MediaPostContainer";

const Profile = () => {
    const { profileData } = useUserContext();
    const [currentTab, setCurrentTab] = useState(1);
    const handleChange = (x, value) => {
        setCurrentTab(value);
    };
    const { username, profile_pic, followers, following, date_joined, cover_pic } = profileData;
    return (
        <div className="w-[599px] max-w-[98%] mt-2 mx-auto">
            <div className="bg-gray-100 border-b-4">
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
                            <span className="text-black">{followers}</span>
                            {followers > 1 ? "followers" : "follower"}
                        </div>
                        <span className="text-black">.</span>
                        <div>
                            <span className="text-black">{following}</span> following
                        </div>
                    </div>
                </div>
                <div className="w-full sticky p-2">
                    <Tabs
                        value={currentTab}
                        onChange={handleChange}
                        variant="fullWidth"
                        aria-label="basic tabs example"
                        className="sticky top-0"
                        centered
                        // textColor="secondary"
                        // indicatorColor="secondary"
                    >
                        <Tab label="Posts" value={1} />
                        <Tab label="Comments" value={2} />
                        <Tab label="media" value={3} />
                    </Tabs>
                </div>
            </div>
            <div>
                {currentTab === 1 && <ProfilePostContainer />}
                {currentTab === 2 && <PostComments />}
                {currentTab === 3 && <MediaPostContainer />}
            </div>
        </div>
    );
};

export default Profile;
