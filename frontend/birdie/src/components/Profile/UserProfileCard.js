import { Avatar } from "@mui/material";
import React from "react";

const UserProfileCard = (props) => {
    const { profile_pic, username, followers } = props;
    return (
        <div className="mt-2 pl-3 p-2 bg-gray-50 w-full flex gap-2 items-center rounded-lg dark:bg-[#030108]">
            <Avatar src={profile_pic ? profile_pic : null} alt={username}>
                {username.at(0).toUpperCase()}
            </Avatar>
            <div className="flex flex-col mr-auto">
                <div className="text-sm dark:text-gray-100">{username}</div>
                <div className="text-[.75rem] text-gray-600">
                    {followers === 1 ? "1 follower" : followers + " followers"}
                </div>
            </div>
            <button className="float-right m-4 border-2 p-1 px-2 rounded-full text-purple-500 text-[.7rem] border-purple-500">
                Unfollow
            </button>
        </div>
    );
};

export default UserProfileCard;
