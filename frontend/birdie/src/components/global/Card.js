import React, { useState } from "react";
import { Avatar } from "@mui/material";
import useUserContext from "../../contexts/UserContext";
import usePageContext from "../../contexts/pageContext";
import CommentsModal from "./CommentsModal";

const Card = (props) => {
    const {
        user: { user_id },
    } = useUserContext();
    const {
        id,
        avatar,
        card_content,
        card_image,
        comments,
        likes,
        saves,
        user,
        liked,
        creator_id,
        is_saved,
        is_commented,
        is_following_user,
        is_followed_by_user,
        created,
    } = props;
    console.log(is_followed_by_user == is_following_user);
    const followButtonText =
        is_followed_by_user && !is_following_user
            ? "follow back"
            : is_following_user
            ? "unfollow"
            : "follow";
    const { likePost, savePost } = usePageContext();
    const [viewComment, setViewComment] = useState(false);
    return (
        <div className="w-[598px] max-w-[95%] p-3 gap-2 grid grid-cols-[49px,_auto] bg-gray-50 mt-4 rounded-md dark:bg-[#000208] post-card relative">
            <div>
                <Avatar src={avatar}>{user.at(0).toUpperCase()}</Avatar>
            </div>
            <div>
                <div className="flex h-5 mb-2">
                    <div className="text-sm col text-[#0F1419] capitalize dark:text-gray-200">
                        {user_id === creator_id ? "You" : user}
                    </div>
                    <div className="text-[#5B7083] text-[.8rem] dark:text-gray-400">
                        <span className="m-2">.</span> {created}
                    </div>
                    {user_id !== creator_id && (
                        <button className="absolute right-0 top-0 m-4 border-2 p-1 px-2 h-7 rounded-full text-purple-500 text-[.7rem] border-purple-500">
                            {followButtonText}
                        </button>
                    )}
                </div>
                <div className="text-[#0F1419] text-[0.8rem] dark:text-white">{card_content}</div>
                {card_image && (
                    <div className="my-2 ">
                        <img
                            src={card_image}
                            className="h-ful max-h-[65vh] w-full rounded-xl object-cover"
                            alt="posts"
                        />
                    </div>
                )}
                <br />
                <nav className="w-full grid grid-cols-3">
                    <button
                        className={`flex justify-center gap-4 items-center w-full h-full ${
                            is_commented ? "text-blue-500" : "dark:text-gray-200"
                        }`}
                        onClick={() => setViewComment(true)}
                    >
                        {is_commented ? (
                            <iconify-icon icon="bi:chat-fill">Comments</iconify-icon>
                        ) : (
                            <iconify-icon icon="fa:comment-o">Comments</iconify-icon>
                        )}
                        <span>{comments}</span>
                    </button>
                    {viewComment && (
                        <CommentsModal
                            id={id}
                            open={viewComment}
                            close={() => setViewComment(false)}
                        />
                    )}
                    <button
                        className={`flex justify-center gap-4 items-center w-full h-full ${
                            liked ? "text-red-500" : "dark:text-gray-400"
                        }`}
                        onClick={() => likePost(id)}
                    >
                        {liked ? (
                            <iconify-icon icon="flat-color-icons:like">Like</iconify-icon>
                        ) : (
                            <iconify-icon icon="icon-park-outline:like">Like</iconify-icon>
                        )}
                        <span>{likes}</span>
                    </button>

                    <button
                        onClick={() => savePost(id)}
                        className={`flex justify-center gap-4 items-center w-full h-full ${
                            is_saved ? "text-blue-500" : "dark:text-gray-400"
                        }`}
                    >
                        <iconify-icon icon="bi:save">Save</iconify-icon>
                        <span>{saves}</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Card;
