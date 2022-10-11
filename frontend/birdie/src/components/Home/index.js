import React, { useEffect, useState } from "react";
import CardContainer from "../global/CardContainer";
import useUserContext from "../../contexts/UserContext";
import TweetForm from "../global/TweetForm";
import { getAxiosInstance } from "../../actions";
import { useLoaderData } from "react-router-dom";

export async function homePostsLoader() {
    const axiosInstance = getAxiosInstance();
    let results = {
        next: null,
        posts: [],
    };
    const response = await axiosInstance.get("/post/all");
    results = {
        next: response.data.next,
        posts: response.data.results,
    };

    return results;
}

const Home = () => {
    const { axiosInstance } = useUserContext();
    const data = useLoaderData();
    return (
        <div className="flex flex-col items-center w-full">
            <TweetForm />
            <CardContainer posts={data.posts} />
        </div>
    );
};

export default Home;
