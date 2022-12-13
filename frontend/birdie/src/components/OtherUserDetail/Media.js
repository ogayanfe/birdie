import React, { useEffect, useState } from "react";
import useUserContext from "../../contexts/UserContext";
import usePageContext from "../../contexts/pageContext";
import CardContainer from "../global/CardContainer";
import { useParams } from "react-router-dom";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const Media = () => {
    const { axiosInstance } = useUserContext();
    const { getNextItems } = usePageContext();
    const { userId } = useParams();
    const [{ posts, next }, setData] = useState({
        posts: [],
        next: null,
    });

    useEffect(() => {
        axiosInstance
            .get(`/post/user/${userId}/all/?filter=media`)
            .then((response) => {
                const { next, results } = response.data;
                setData({ next: next, posts: results });
            })
            .catch(() => alert("Couldn't refresh post, check internet connection and refresh"));
    }, [axiosInstance, userId]);

    const retrieveNextPosts = () => {
        const success = (response) => {
            setData((prev) => {
                return {
                    next: response.data.next,
                    posts: [...prev.posts, ...response.data.results],
                };
            });
        };
        if (!next) return;
        getNextItems(next, success);
    };

    const onLike = (response) => {
        setData((prev) => {
            const update = response.data;
            let newPost = prev.posts.map((post) => (post.id === update.id ? update : post));
            return { ...prev, posts: newPost };
        });
    };

    const onSave = (response) => {
        setData((prev) => {
            const update = response.data;
            let newPost = prev.posts.map((post) => (post.id === update.id ? update : post));
            return { ...prev, posts: newPost };
        });
    };

    const updateCommentCount = (id) => {
        setData((prev) => {
            const newPosts = prev.posts.map((post) => {
                return post.id === id
                    ? { ...post, comments: post.comments + 1, is_commented: true }
                    : post;
            });
            return { ...prev, posts: newPosts };
        });
    };
    return (
        <>
            <CardContainer
                posts={posts}
                onLike={onLike}
                onSave={onSave}
                onComment={updateCommentCount}
            />
            {next && (
                <div className="flex flex-col items-center w-full">
                    <button
                        className="text-purple-500 m-10 text-2xl p-1 flex justify-center items-center gap-1"
                        onClick={retrieveNextPosts}
                    >
                        more
                        <KeyboardDoubleArrowDownIcon />
                    </button>
                </div>
            )}
        </>
    );
};

export default Media;
