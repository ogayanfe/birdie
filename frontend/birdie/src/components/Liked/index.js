import React from "react";
import CardContainer from "../global/CardContainer";
import TweetForm from "../global/TweetForm";
import { useLoaderData } from "react-router-dom";

const Liked = () => {
    const data = useLoaderData();
    return (
        <div className="flex flex-col items-center w-full">
            <TweetForm />
            <CardContainer posts={data.posts} />
        </div>
    );
};

export default Liked;
