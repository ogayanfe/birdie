import React, { useState, useEffect } from "react";
import useUserContext from "../../contexts/UserContext";
import PostCommentCard from "./PostCommentCard";

const PostComments = () => {
    const [{ next, comments }, setCommentsData] = useState({
        next: null,
        comments: [],
    });
    const { axiosInstance } = useUserContext();
    useEffect(() => {
        axiosInstance.get("/post/comments/all/").then((response) => {
            setCommentsData({
                next: response.data.next,
                comments: response.data.results,
            });
        });
    }, [axiosInstance]);
    return (
        <div className="w-full">
            {comments.map((comment) => {
                return <PostCommentCard {...comment} key={comment.id}></PostCommentCard>;
            })}
        </div>
    );
};

export default PostComments;
