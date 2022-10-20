import React, { useEffect, useRef, useState } from "react";
import usePageContext from "../../contexts/pageContext";
import usePostActionContext from "../../contexts/PostActionContext";
import CardContainer from "../global/CardContainer";

const ProfilePostContainer = () => {
    const { setData, getNextItems, getNextUrl } = usePageContext();
    const { getPosts } = usePostActionContext();
    const [retrivingPost, setRetrivingPost] = useState(false);
    const container = useRef();
    useEffect(() => {
        const success = (response) => {
            setData({ next: response.data.next, posts: response.data.results });
        };
        getPosts("user", success, console.log);
    }, [getPosts, setData]);
    const checkScrollHeight = (element) => {
        const success = (response) => {
            setData((prev) => {
                return {
                    next: response.data.next,
                    posts: [...prev.posts, ...response.data.results],
                };
            });
            setRetrivingPost(false);
        };
        if (element.offsetHeight + element.scrollTop >= element.scrollHeight) {
            const nextUrl = getNextUrl();
            if (retrivingPost || !nextUrl) return;
            setRetrivingPost(true);
            getNextItems(nextUrl, success);
        }
    };
    useEffect(() => {
        const element = container.current.parentNode.parentNode.parentNode;
        const checkHeight = () => checkScrollHeight(element);
        element.addEventListener("scroll", checkHeight);
        return () => element.removeEventListener("scroll", checkHeight);
    });

    return (
        <div ref={container}>
            <CardContainer />
        </div>
    );
};

export default ProfilePostContainer;
