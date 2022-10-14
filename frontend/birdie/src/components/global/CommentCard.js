import React from "react";
import { Avatar } from "@mui/material";
import useUserContext from "../../contexts/UserContext";

const CommentCard = (props) => {
    const {
        user: { user_id },
    } = useUserContext();
    const { content, creator_name, creator_profile_pic, creator_id } = props;
    return (
        <div className="flex gap-2 p-2 bg-gray-50">
            <div>
                <Avatar
                    sx={{ width: "35px", height: "35px" }}
                    src={creator_profile_pic}
                    alt={creator_name}
                >
                    A
                </Avatar>
            </div>
            <div className="flex-grow">
                <div className="flex items-center justify-between">
                    <div className="text-sm capitalize">
                        {creator_id === user_id ? "You" : creator_name}
                    </div>
                    <div className="text-[.65rem]">23s</div>
                </div>
                <div className="text-[.8rem] text-gray-500 mt-2 text-justify">{content}</div>
            </div>
        </div>
    );
};

export default CommentCard;
