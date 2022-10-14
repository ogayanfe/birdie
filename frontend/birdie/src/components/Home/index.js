import React, { useEffect, useState } from "react";
import CardContainer from "../global/CardContainer";
import TweetForm from "../global/TweetForm";
import usePostActionContext from "../../contexts/PostActionContext";
import usePageContext, { PageContextProvider } from "../../contexts/pageContext";

const Home = () => {
    const { getPosts } = usePostActionContext();
    const { data, setData } = usePageContext();
    useEffect(() => {
        const success = (r) => {
            setData({ next: r.data.next, posts: r.data.results });
        };
        getPosts("all", success, console.log);
    }, []);

    return (
        <div className="flex flex-col items-center w-full">
            <TweetForm />
            <CardContainer />
        </div>
    );
};

export default Home;
