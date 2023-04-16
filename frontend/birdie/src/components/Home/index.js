import React, { useEffect, useRef } from "react";
import CardContainer from "../global/CardContainer";
import TweetForm from "../global/TweetForm";
import usePostActionContext from "../../contexts/PostActionContext";
import usePageContext from "../../contexts/pageContext";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const Home = () => {
    const { getPosts } = usePostActionContext();
    const { setData, getNextItems, getNextUrl } = usePageContext();
    const container = useRef();
    useEffect(() => {
        const success = (r) => {
            setData({ next: r.data.next, posts: r.data.results });
        };
        getPosts("", success, () => alert("Couldn't load content"));
        return () => {
            setData({ next: null, posts: [] });
        };
    }, [getPosts, setData]);

    useEffect(() => {
        document.title = "Birdie | Home";
        return () => {
            document.title = "Birdie";
        };
    }, []);
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
        <div className="flex flex-col items-center w-full" ref={container} id="demo">
            <TweetForm />
            <CardContainer />
            {getNextUrl() && (
                <button
                    className="text-purple-500 m-10 text-3xl p-1 flex justify-center items-center gap-1"
                    onClick={retrieveNextPost}
                >
                    more
                    <KeyboardDoubleArrowDownIcon />
                </button>
            )}
        </div>
    );
};

export default Home;
