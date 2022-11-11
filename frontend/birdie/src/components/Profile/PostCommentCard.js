import { Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PostCommentCard = (props) => {
    const {
        post_id,
        created,
        post_content,
        content,
        post_creator_profile,
        post_creator,
        post_created,
    } = props;
    return (
        <div className="w-ful bg-gray-50 mt-4 p-4 grid grid-cols-1 rounded-md m-2 sm:m-0 sm:mt-4 dark:bg-[#030108]">
            <div className="flex gap-4 items-center">
                <Avatar
                    sx={{ width: "32px", height: "32px" }}
                    src={post_creator_profile}
                    alt={post_creator}
                >
                    {post_creator.at(0).toUpperCase()}
                </Avatar>
                <div className="text-[.75rem]">
                    <div className="capitalize dark:text-white">{post_creator}</div>
                    <div className="text-gray-500">posted {post_created}</div>
                </div>
            </div>
            <Link
                to={`/post/${post_id}`}
                className="text-[.8rem] text-gray-500 mt-2 hover:text-blue-500"
            >
                {post_content.slice(0, 100)} {post_content > 100 && <span> ...</span>}
                <span aria-hidden={true} className="text-sm">
                    <iconify-icon icon="bx:link-alt"></iconify-icon>
                </span>
            </Link>
            <p className="text-[.8rem] flex  flex-col mt-2 text-gray-900 ">
                <span className="dark:text-gray-200">You - {content}</span>
                <span className="text-gray-500 text-[.75rem]">Commented {created}</span>
            </p>
        </div>
    );
};

export default PostCommentCard;
