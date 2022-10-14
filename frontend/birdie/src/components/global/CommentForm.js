import React from "react";
import { Avatar } from "@mui/material";
import useUserContext from "../../contexts/UserContext";

const CommentForm = ({ handleSubmit }) => {
    const {
        user: { user_name },
    } = useUserContext();
    return (
        <div className="w-full bg-gray-100 p-3 flex gap-2 h-min border-b-4">
            <div>
                <Avatar>{user_name.at(0).toUpperCase()}</Avatar>
            </div>
            <form className="flex-1 flex flex-col focus:outline-0 gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="content"
                    className="block w-full bg-white p-1 focus:outline-none rounded-lg"
                    placeholder="Type comment here"
                />
                <button
                    type="submit"
                    className="w-min float-left bg-purple-500 text-purple-100 px-4 py-1 rounded-full"
                >
                    Post
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
