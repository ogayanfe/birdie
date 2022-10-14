import { Comment } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import usePostActionContext from "../../contexts/PostActionContext";
import CommentForm from "./CommentForm";

const CommentsModal = ({ id, open, close }) => {
    const { getComments, createComment } = usePostActionContext();
    const [{ comments, next }, setComments] = useState({
        next: null,
        comments: [],
    });
    const [fullScreen, setFullScreen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        createComment(id, formData, console.log, console.log);
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
    });

    return (
        <Dialog
            open={open}
            onClose={close}
            className="p-0 m-0"
            PaperProps={{ style: { padding: "0px" } }}
            fullScreen={fullScreen}
        >
            <div className="max-w-md mx-auto w-screen h-[90vh] flex flex-col p-2 gap-2">
                <CommentForm handleSubmit={handleSubmit} />
                <div></div>
            </div>
        </Dialog>
    );
};

export default CommentsModal;
