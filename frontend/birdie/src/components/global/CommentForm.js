import React from "react";
import { Avatar } from "@mui/material";
import useUserContext from "../../contexts/UserContext";

const CommentForm = ({ handleSubmit }) => {
    const {
        profileData: { username, profile_pic },
    } = useUserContext();
    return (
        <div className="w-full bg-gray-100 p-3 flex gap-2 h-min border-b-4 dark:bg-black dark:border-gray-900">
            <div>
                <Avatar src={profile_pic} alt={username}>
                    {username && username.at(0).toUpperCase()}
                </Avatar>
            </div>
            <form className="flex-1 flex flex-col focus:outline-0 gap-4" onSubmit={handleSubmit}>
                <label htmlFor="commentText" className="fixed -top-[200000px]">
                    Comment
                </label>
                <input
                    type="text"
                    name="content"
                    id="commentText"
                    className="block w-full bg-white p-2 focus:outline-none rounded-lg text-gray-700 text-sm dark:bg-gray-900 dark:text-gray-300"
                    placeholder="Type comment here"
                />
                <button
                    type="submit"
                    className="ml-auto bg-purple-400 text-purple-100 px-6 py-1 rounded-full"
                >
                    Post
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
