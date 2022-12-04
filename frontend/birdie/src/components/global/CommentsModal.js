import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import usePageContext from "../../contexts/pageContext";
import usePostActionContext from "../../contexts/PostActionContext";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const CommentsModal = ({ id, open, close }) => {
    const { getComments } = usePostActionContext();
    const { createComment, getNextItems } = usePageContext();
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
        createComment(id, formData, success);
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

    const retrieveNextComments = () => {
        const success = (response) => {
            setComments((prev) => {
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
        <Dialog
            open={open}
            onClose={close}
            className="p-0 m-0"
            PaperProps={{ style: { padding: "0px" } }}
            fullScreen={fullScreen}
        >
            <div className="max-w-md mx-auto w-screen h-screen  dark:bg-black flex flex-col p-2 gap-2 overflow-hidden dark:border-2 dark:border-gray-900">
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
                <button className="bg-purple-400 text-purple-100" onClick={close}>
                    Close
                </button>
            </div>
        </Dialog>
    );
};

export default CommentsModal;
