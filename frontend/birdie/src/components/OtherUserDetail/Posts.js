import React, { useEffect, useState } from "react";
import useUserContext from "../../contexts/UserContext";
import usePageContext from "../../contexts/pageContext";
import CardContainer from "../global/CardContainer";
import { useParams } from "react-router-dom";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const Posts = () => {
    const { axiosInstance } = useUserContext();
    const { getNextItems } = usePageContext();
    const { userId } = useParams();
    const [{ posts, next }, setData] = useState({
        posts: [],
        next: null,
    });

    useEffect(() => {
        axiosInstance
            .get(`/post/user/${userId}/all/`)
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

    return (
        <>
            <CardContainer posts={posts} />
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

export default Posts;