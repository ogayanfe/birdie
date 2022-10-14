import { Comment } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import usePostActionContext from "../../contexts/PostActionContext";

const CommentsModal = ({ id, open, close }) => {
    const { getComments } = usePostActionContext();
    const [{ comments, next }, setComments] = useState({
        next: null,
        comments: [],
    });

    useEffect(() => {
        const success = (response) => {
            setComments({
                next: response.data.next,
                comments: response.data.results,
            });
        };
        getComments(id, success, console.log);
    }, [id, setComments, getComments]);

    return (
        <Dialog open={open} onClose={close}>
            CommentsModal
            {comments.map((comment) => {
                return <li>{Comment}</li>;
            })}
        </Dialog>
    );
};

export default CommentsModal;
