import React, { useEffect, useState, useRef } from "react";
import CardContainer from "../global/CardContainer";
import TweetForm from "../global/TweetForm";
import usePostActionContext from "../../contexts/PostActionContext";
import usePageContext from "../../contexts/pageContext";

const Liked = () => {
    const { getPosts } = usePostActionContext();
    const { data, setData, setOnPostSave, getNextItems, getNextUrl } = usePageContext();
    const container = useRef();
    const [retrivingPost, setRetrivingPost] = useState(false);

    useEffect(() => {
        const success = (r) => {
            setData({ next: r.data.next, posts: r.data.results });
        };
        getPosts("saved", success, console.log);
        setOnPostSave(() => (newPosts) => {
            return newPosts.filter((post) => post.is_saved === true);
        });
        return () => {
            setData({ next: null, posts: [] });
            setOnPostSave(null);
        };
    }, []);

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
        const element = container.current.parentNode;
        const checkHeight = () => checkScrollHeight(element);
        element.addEventListener("scroll", checkHeight);
        return () => element.removeEventListener("scroll", checkHeight);
    });
    return (
        <div className="flex flex-col items-center w-full" ref={container}>
            <TweetForm />
            <CardContainer />
        </div>
    );
};

export default Liked;
