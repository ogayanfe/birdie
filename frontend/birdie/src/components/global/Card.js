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
    } = props;
    const { likePost, savePost } = usePageContext();
    const [viewComment, setViewComment] = useState(false);
    return (
        <div className="w-[598px] max-w-[95%] p-3 gap-2 grid grid-cols-[49px,_auto] bg-gray-50 mt-4 rounded-md">
            <div>
                <Avatar src={avatar}>{user.at(0).toUpperCase()}</Avatar>
            </div>
            <div>
                <div className="flex h-5 mb-2">
                    <div className="text-sm col text-[#0F1419] capitalize">
                        {user_id === creator_id ? "You" : user}
                    </div>
                    <div className="text-[#5B7083] text-sm">. 23s</div>
                </div>
                <div className="text-[#0F1419] text-[0.8rem]">
                    {card_content}
                    <a href="#readmore" className="text-blue-400 pl-1 hover:text-gray-400">
                        show more
                    </a>
                </div>
                {card_image && (
                    <div className="my-2 ">
                        <img
                            src={card_image}
                            className="h-ful max-h-[70vh] w-full rounded-xl object-cover"
                            alt="posts"
                        />
                    </div>
                )}
                <br />
                <nav className="w-full grid grid-cols-3">
                    <button
                        className="flex justify-center gap-4 items-center w-full h-full"
                        onClick={() => setViewComment(true)}
                    >
                        {is_commented ? (
                            <iconify-icon icon="bi:chat-fill" style={{ color: "#1960D2" }}>
                                Comments
                            </iconify-icon>
                        ) : (
                            <iconify-icon icon="fa:comment-o">Comments</iconify-icon>
                        )}
                        <span style={is_commented ? { color: "blue" } : null}>{comments}</span>
                    </button>
                    {viewComment && (
                        <CommentsModal
                            id={id}
                            open={viewComment}
                            close={() => setViewComment(false)}
                        />
                    )}
                    <button
                        className="flex justify-center gap-4 items-center w-full h-full "
                        onClick={() => likePost(id)}
                    >
                        {liked ? (
                            <iconify-icon icon="flat-color-icons:like">Like</iconify-icon>
                        ) : (
                            <iconify-icon icon="icon-park-outline:like">Like</iconify-icon>
                        )}
                        <span style={liked ? { color: "red" } : null}>{likes}</span>
                    </button>

                    <button
                        onClick={() => savePost(id)}
                        className="flex justify-center gap-4 items-center w-full h-full"
                        style={is_saved ? { color: "blue" } : null}
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
