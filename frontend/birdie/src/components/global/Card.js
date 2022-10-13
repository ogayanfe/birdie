import React from "react";
import { Avatar } from "@mui/material";
import useUserContext from "../../contexts/UserContext";

const Card = (props) => {
    const {
        user: { user_id },
    } = useUserContext();
    const {
        avatar,
        card_content,
        card_image,
        comments,
        likes,
        shares,
        saves,
        user,
        owner_id,
        liked,
        is_saved,
        is_commented,
    } = props;
    return (
        <div className="w-[598px] max-w-[95%] p-3 gap-2 grid grid-cols-[49px,_auto] bg-gray-50 mt-4 rounded-md">
            <div>
                <Avatar src={avatar}>{user.at(0).toUpperCase()}</Avatar>
            </div>
            <div>
                <div className="flex h-5 mb-2">
                    <div className="text-sm col text-[#0F1419] capitalize">
                        {user_id === owner_id ? "You" : user}
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
                <nav className="w-full grid grid-cols-4">
                    <button className="flex justify-center gap-4 items-center w-full h-full ">
                        {is_commented ? (
                            <iconify-icon icon="bi:chat-fill" style={{ color: "#1960D2" }}>
                                Comments
                            </iconify-icon>
                        ) : (
                            <iconify-icon icon="fa:comment-o">Comments</iconify-icon>
                        )}
                        <span style={is_commented ? { color: "blue" } : null}>{comments}</span>
                    </button>
                    <button className="flex justify-center gap-4 items-center w-full h-full ">
                        {liked ? (
                            <iconify-icon icon="flat-color-icons:like">Like</iconify-icon>
                        ) : (
                            <iconify-icon icon="icon-park-outline:like">Like</iconify-icon>
                        )}
                        <span style={is_saved ? { color: "red" } : null}>{likes}</span>
                    </button>
                    <button className="flex justify-center gap-4 items-center w-full h-full">
                        <iconify-icon icon="carbon:data-share">share</iconify-icon>
                        <span>{shares}</span>
                    </button>
                    <button
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
