import React, { useEffect } from "react";
import CardContainer from "../global/CardContainer";
import TweetForm from "../global/TweetForm";
import usePostActionContext from "../../contexts/PostActionContext";
import usePageContext from "../../contexts/pageContext";

const Liked = () => {
    const { getPosts } = usePostActionContext();
    const { data, setData, setOnPostSave, setOnPostLike } = usePageContext();
    useEffect(() => {
        const success = (r) => {
            setData({ next: r.data.next, posts: r.data.results });
        };
        getPosts("saved", success, console.log);
        setOnPostSave(() => (newPosts) => {
            return newPosts.filter((post) => post.is_saved === true);
        });
        setOnPostLike(null);
        return () => {
            setData({ next: null, posts: [] });
        };
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            <TweetForm />
            <CardContainer />
        </div>
    );
};

export default Liked;
