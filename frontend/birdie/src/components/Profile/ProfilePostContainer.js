import React, { useEffect, useRef } from "react";
import usePageContext from "../../contexts/pageContext";
import usePostActionContext from "../../contexts/PostActionContext";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import CardContainer from "../global/CardContainer";

const ProfilePostContainer = () => {
    const { setData, getNextItems, getNextUrl } = usePageContext();
    const { getPosts } = usePostActionContext();
    const container = useRef();
    useEffect(() => {
        const success = (response) => {
            setData({ next: response.data.next, posts: response.data.results });
        };
        getPosts("user", success, () => alert("Couldn't load content"));
        return () => setData({ next: null, posts: [] });
    }, [getPosts, setData]);

    const retrieveNextPost = () => {
        const success = (response) => {
            setData((prev) => {
                return {
                    next: response.data.next,
                    posts: [...prev.posts, ...response.data.results],
                };
            });
        };
        const nextUrl = getNextUrl();
        if (!nextUrl) return;
        getNextItems(nextUrl, success);
    };

    return (
        <div ref={container} className="flex flex-col items-center w-full">
            <CardContainer />
            {getNextUrl() && (
                <button
                    className="text-purple-500 m-10 text-2xl p-1 flex justify-center items-center gap-1"
                    onClick={retrieveNextPost}
                >
                    more
                    <KeyboardDoubleArrowDownIcon />
                </button>
            )}
        </div>
    );
};

export default ProfilePostContainer;
