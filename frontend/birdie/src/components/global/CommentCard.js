import React from "react";
import { Avatar } from "@mui/material";
import useUserContext from "../../contexts/UserContext";

const CommentCard = (props) => {
    const {
        user: { user_id },
    } = useUserContext();
    const { content, creator_name, creator_profile_pic, creator_id, created } = props;
    return (
        <div className="flex gap-2 p-2 bg-gray-50 dark:bg-[#000208] my-2">
            <div>
                <Avatar
                    sx={{ width: "35px", height: "35px" }}
                    src={creator_profile_pic}
                    alt={creator_name}
                >
                    {creator_name.at(0).toUpperCase()}
                </Avatar>
            </div>
            <div className="flex-grow">
                <div className="flex items-center">
                    <div className="text-sm capitalize dark:text-white">
                        {creator_id === user_id ? "You" : creator_name}
                    </div>
                    <div className="text-[.65rem] dark:text-gray-200">
                        <span className="m-2">.</span>
                        {created}
                    </div>
                </div>
                <div className="text-[.8rem] text-gray-500 mt-2 text-justify">{content}</div>
            </div>
        </div>
    );
};

export default CommentCard;
