import React from "react";
import { Avatar } from "@mui/material";
import useUserContext from "../../contexts/UserContext";
import { Form } from "react-router-dom";

const TweetForm = () => {
    const {
        user: { user_name: username },
    } = useUserContext();
    return (
        <div className="w-[95%] max-w-[598px] grid-cols-[49px,_auto] h-28 grid p-3 gap-1 bg-gray-50">
            <div>
                <Avatar alt="post">{username.at(0).toUpperCase()}</Avatar>
            </div>
            <div className="flex flex-col gap-3 justify-between">
                <Form action="/createpost/" method="post">
                    <label htmlFor="main-tweet-form" className="fixed -top-[10000px]">
                        Post Something
                    </label>
                    <input
                        type="text"
                        name="content"
                        id="main-tweet-form"
                        placeholder="What's happening?"
                        className="border-none p-2 text-[#5B7083] w-full  rounded-lg focus:outline-none text-sm"
                    />
                </Form>
                <div>
                    <button className="m-2 text-purple-500 text-2xl">
                        <iconify-icon icon="bi:image">Choose Image</iconify-icon>
                    </button>
                    <button className="bg-purple-400 text-purple-50 float-right px-2 h-8 rounded-full w-20">
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TweetForm;
