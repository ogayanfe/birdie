import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import useUserContext from "../../contexts/UserContext";
import usePageContext from "../../contexts/pageContext";
import { CommentsModal, EditPostModal } from "./Modals";
import { Link } from "react-router-dom";

const CardOptionsComponent = ({ deletePost, edit, onClose }) => {
    useEffect(() => {
        window.addEventListener("click", onClose);
        return () => window.addEventListener("click", onClose);
    }, [onClose]);

    return (
        <div className="flex flex-col items-start rounded-sm text-sm w-20 shadow dark:text-gray-500 bg-gray-100 dark:bg-[#000208] shadow-gray-600">
            <button
                className="flex gap-2 justify-between p-1 w-full hover:bg-[#fff] dark:hover:bg-[#1b1b1b]"
                onClick={edit}
            >
                <span>Edit</span>
                <iconify-icon icon="material-symbols:edit"></iconify-icon>
            </button>
            <div className="w-full h-[.1rem] bg-gray-400 my-1"></div>
            <button
                className="flex gap-2 justify-between p-1 w-full hover:bg-[#fff] dark:hover:bg-[#1b1b1b]"
                onClick={deletePost}
            >
                <span>Delete</span>
                <iconify-icon icon="material-symbols:delete-rounded"></iconify-icon>
            </button>
        </div>
    );
};

const Card = (props) => {
    const {
        user: { user_id },
    } = useUserContext();
    const [showEditPostModal, setShowEditPostModal] = useState(false);

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
        onLike,
        onSave,
        is_saved,
        is_commented,
        is_following_user,
        created,
        isEdited,
        onComment,
    } = props;
    const { likePost, savePost, deletePost } = usePageContext();
    const [viewComment, setViewComment] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);

    const handleDelete = (e) => {
        const del = window.confirm("Delete post?");
        if (!del) {
            alert("Not deleted");
            return;
        }
        const success = (response) => {
            alert("Successfully completed action");
        };
        const failure = () => alert("Could not complet action");
        deletePost(id, success, failure);
    };

    return (
        <div className="w-[598px] max-w-[95%] p-3 gap-2 grid grid-cols-[49px,_auto] bg-gray-50 mt-4 rounded-md dark:bg-[#000208] post-card relative">
            <div>
                <Avatar src={avatar}>{user.at(0).toUpperCase()}</Avatar>
            </div>
            <div>
                <div className="flex h-5 mb-2">
                    <div className="text-sm col text-[#0F1419] capitalize dark:text-purple-200 hover:text-purple-500">
                        <Link to={user_id === creator_id ? "/profile" : `/user/${creator_id}/`}>
                            {user_id === creator_id ? "You" : user}
                        </Link>
                    </div>
                    <div className="text-[#5B7083] text-[.8rem] dark:text-gray-400">
                        <span className="m-2">.</span> {created}
                    </div>
                    {id !== creator_id && is_following_user && (
                        <div className="text-[#5B7083] text-[.8rem] dark:text-gray-400">
                            <span className="m-2">.</span> following
                        </div>
                    )}
                </div>
                <div className="text-[#0F1419] text-[0.8rem] dark:text-white">
                    {isEdited ? "Edited: " : ""}
                    {card_content}
                </div>
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
                {user_id === creator_id && (
                    <>
                        <div className="absolute top-2 right-1">
                            <button
                                className="text-black p-1 dark:text-white hover:border-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenOptions((prev) => !prev);
                                }}
                            >
                                <span className="fixed left-[30000000px]">toggle options</span>
                                <iconify-icon icon="simple-line-icons:options-vertical"></iconify-icon>
                            </button>
                            {openOptions ? (
                                <div className="right-8 absolute top-1">
                                    <CardOptionsComponent
                                        onClose={() => setOpenOptions(false)}
                                        deletePost={handleDelete}
                                        id={id}
                                        edit={() => setShowEditPostModal(true)}
                                    />
                                </div>
                            ) : null}
                        </div>
                        {showEditPostModal && (
                            <EditPostModal
                                id={id}
                                onClose={() => setShowEditPostModal(false)}
                                open={showEditPostModal}
                            />
                        )}
                    </>
                )}
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
                            onComment={onComment}
                            open={viewComment}
                            close={() => setViewComment(false)}
                        />
                    )}
                    <button
                        className={`flex justify-center gap-4 items-center w-full h-full ${
                            liked ? "text-red-500" : "dark:text-gray-400"
                        }`}
                        onClick={() => likePost(id, onLike)}
                    >
                        {liked ? (
                            <iconify-icon icon="flat-color-icons:like">Like</iconify-icon>
                        ) : (
                            <iconify-icon icon="icon-park-outline:like">Like</iconify-icon>
                        )}
                        <span>{likes}</span>
                    </button>

                    <button
                        onClick={() => savePost(id, onSave)}
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
