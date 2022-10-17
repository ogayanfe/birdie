import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import usePageContext from "../../contexts/pageContext";
import usePostActionContext from "../../contexts/PostActionContext";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

const CommentsModal = ({ id, open, close }) => {
    const { getComments } = usePostActionContext();
    const { createComment } = usePageContext();
    const [{ comments, next }, setComments] = useState({
        next: null,
        comments: [],
    });
    const [fullScreen, setFullScreen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = (response) => {
            setComments((prev) => {
                return {
                    ...prev,
                    comments: [response.data, ...prev.comments],
                };
            });
            e.target.content.value = "";
        };
        const formData = new FormData(e.target);
        createComment(id, formData, success, console.log);
    };

    useEffect(() => {
        const success = (response) => {
            setComments({
                next: response.data.next,
                comments: response.data.results,
            });
        };
        getComments(id, success, console.log);
    }, [id, setComments, getComments]);
    const checkWindowSize = () => {
        if (window.innerWidth < 520) {
            setFullScreen(true);
        } else setFullScreen(false);
    };
    useEffect(() => {
        window.addEventListener("resize", checkWindowSize);
        return () => {
            window.removeEventListener("resize", checkWindowSize);
        };
    }, []);
    return (
        <Dialog
            open={open}
            onClose={close}
            className="p-0 m-0"
            PaperProps={{ style: { padding: "0px" } }}
            fullScreen={fullScreen}
        >
            <div className="max-w-md mx-auto w-screen h-[90vh]  dark:bg-black flex flex-col p-2 gap-2 overflow-hidden">
                <CommentForm handleSubmit={handleSubmit} />
                <div className="overflow-y-scroll h-full pb-12">
                    {comments.map((comment) => {
                        return (
                            <CommentCard
                                content={comment.content}
                                creator_name={comment.creator.username}
                                creator_profile_pic={comment.creator.profile_pic}
                                creator_id={comment.creator.id}
                                key={comment.id}
                                created={comment.created}
                            />
                        );
                    })}
                </div>
            </div>
        </Dialog>
    );
};

export default CommentsModal;
