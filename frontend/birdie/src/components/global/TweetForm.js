import React, { useState } from "react";
import { Avatar, Modal } from "@mui/material";
import useUserContext from "../../contexts/UserContext";
import { Box } from "@mui/system";
import usePostActionContext from "../../contexts/PostActionContext";
import usePageContext from "../../contexts/pageContext";

const TweetForm = () => {
    const { setData } = usePageContext();
    const { createPost } = usePostActionContext();
    const [previewImage, setPreviewImage] = useState(false);
    const [file, setFile] = useState({ name: "No file chosen yet", file: null });
    const {
        profileData: { username, profile_pic },
    } = useUserContext();
    const chooseImageFile = (e) => {
        e.preventDefault();
        document.querySelector("#post-image-field").click();
    };
    const submitForm = (e) => {
        e.preventDefault();
        const formElement = e.target;
        const success = (r) => {
            setData((prev) => {
                return { ...prev, posts: [r.data, ...prev.posts] };
            });
            formElement.content.value = "";
            formElement.image.value = "";
            setFile((prev) => ({ ...prev, file: null }));
        };
        createPost(new FormData(formElement), success, console.log);
    };

    React.useEffect(() => {
        const formElement = document.querySelector("#tweet-form");
        formElement.addEventListener("submit", submitForm);
        return () => {
            formElement.removeEventListener("submit", submitForm);
        };
    });
    return (
        <div className="w-[95%] max-w-[598px] grid-cols-[49px,_auto] h-28 grid p-3  border-b-4 gap-1 bg-gray-100 mt-2 dark:bg-black dark:bg-opacity-90 dark:shadow-xl dark:border-gray-800">
            <div>
                <Avatar alt="post" src={profile_pic}>
                    {username && username.at(0).toUpperCase()}
                </Avatar>
            </div>
            <form
                className="flex flex-col gap-3 justify-between"
                action="/"
                method="post"
                id="tweet-form"
                encType="multipart/form-data"
            >
                <div>
                    <label htmlFor="main-tweet-form" className="fixed -top-[10000px]">
                        Post content
                    </label>
                    <input
                        type="text"
                        name="content"
                        id="main-tweet-form"
                        placeholder="Say Something?"
                        className="border-none p-2 text-[#5B7083] bg-white w-full  rounded-lg focus:outline-none text-sm dark:bg-gray-900 dark:text-gray-300"
                    />
                    <label htmlFor="post-image-field" className="fixed -top-[10000px]">
                        Select post image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        id="post-image-field"
                        className="fixed -top-[10000px]"
                        onChange={(e) => {
                            const file = URL.createObjectURL(e.target.files[0]);
                            setFile({
                                file: file,
                                name: file.name,
                            });
                        }}
                    />
                    <Modal
                        open={previewImage}
                        onClose={() => setPreviewImage(false)}
                        className="flex items-center justify-center"
                    >
                        <Box className="">
                            {file.file ? (
                                <img
                                    src={file.file}
                                    alt="selected file preview"
                                    className="h-ful 80vw max-w-[95vw] max-h-[70vh] rounded-lg object-contain"
                                ></img>
                            ) : (
                                <div className="bg-black text-purple-100 md:p-20 p-[3rem] flex rounded-sm justify-center capitalize items-center">
                                    <span className="md:text-3xl text-xl text-center">
                                        Preview chosen file here
                                    </span>
                                </div>
                            )}
                        </Box>
                    </Modal>
                </div>
                <div>
                    <button className="m-2 text-purple-500 text-2xl" onClick={chooseImageFile}>
                        <iconify-icon icon="bi:image">Choose Image</iconify-icon>
                    </button>
                    <button
                        className="m-2 text-purple-500 text-2xl"
                        onClick={(e) => {
                            e.preventDefault();
                            setPreviewImage(true);
                        }}
                    >
                        <iconify-icon icon="icon-park-outline:preview-open">
                            preview Image
                        </iconify-icon>
                    </button>
                    <button className="bg-purple-400 text-purple-50 float-right px-2 h-8 rounded-full w-20">
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TweetForm;
