import React, { useState, useEffect } from "react";
import usePageContext from "../../contexts/pageContext";
import useUserContext from "../../contexts/UserContext";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import PostCommentCard from "./PostCommentCard";

const PostComments = () => {
    const [{ next, comments }, setCommentsData] = useState({
        next: null,
        comments: [],
    });
    const { getNextItems } = usePageContext();
    const { axiosInstance } = useUserContext();
    useEffect(() => {
        axiosInstance.get("/post/comments/all/").then((response) => {
            setCommentsData({
                next: response.data.next,
                comments: response.data.results,
            });
        });
    }, [axiosInstance]);

    const retrieveNextComments = () => {
        const success = (response) => {
            setCommentsData((prev) => {
                return {
                    next: response.data.next,
                    comments: [...prev.comments, ...response.data.results],
                };
            });
        };
        if (!next) return;
        getNextItems(next, success);
    };
    return (
        <div className="w-full ">
            {comments.map((comment) => {
                return <PostCommentCard {...comment} key={comment.id}></PostCommentCard>;
            })}
            {next && (
                <div className="flex flex-col items-center w-full">
                    <button
                        className="text-purple-500 m-10 text-2xl p-1 flex justify-center items-center gap-1"
                        onClick={retrieveNextComments}
                    >
                        more
                        <KeyboardDoubleArrowDownIcon />
                    </button>
                </div>
            )}
        </div>
    );
};

export default PostComments;
