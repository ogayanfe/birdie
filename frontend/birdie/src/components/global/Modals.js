import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "@mui/material";
import usePageContext from "../../contexts/pageContext";
import useUserContext from "../../contexts/UserContext";
import usePostActionContext from "../../contexts/PostActionContext";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { Avatar } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

const ImagePreview = ({ src, removeImage, file }) => {
    if (src || file.file) {
        return (
            <div className="w-full float-right relative mt-3">
                <img
                    src={file.file ? file.file : src}
                    alt="selected file preview"
                    className="w-full rounded-lg object-cover max-h-[50vh]"
                ></img>
                {file.file && (
                    <button
                        className="w-full h-full p-3  rounded-lg lg:text-2xl absolute top-0 left-0 bg-gray-900 opacity-0 hover:opacity-80 text-white transition-all"
                        onClick={removeImage}
                        type="button"
                    >
                        Remove Image
                    </button>
                )}
            </div>
        );
    }
    return (
        <div className="w-full h-48 rounded-md bg-white text-gray-700 dark:text-gray-200 flex items-center text-3xl justify-center dark:bg-[#03060e]">
            No File Selected
        </div>
    );
};

const CommentsModal = ({ id, open, close }) => {
    const { getComments } = usePostActionContext();
    const { createComment, getNextItems } = usePageContext();
    const [{ comments, next }, setComments] = useState({
        next: null,
        comments: [],
    });
    const [fullScreen, setFullScreen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = (response) => {
            setComments((prev) => {
                return {
                    ...prev,
                    comments: [response.data, ...prev.comments],
                };
            });
            e.target.content.value = "";
        };
        const formData = new FormData(e.target);
        createComment(id, formData, success);
    };

    useEffect(() => {
        const success = (response) => {
            setComments({
                next: response.data.next,
                comments: response.data.results,
            });
        };
        getComments(id, success, console.log);
    }, [id, setComments, getComments]);

    const checkWindowSize = () => {
        if (window.innerWidth < 520) {
            setFullScreen(true);
        } else setFullScreen(false);
    };

    useEffect(() => {
        window.addEventListener("resize", checkWindowSize);
        return () => {
            window.removeEventListener("resize", checkWindowSize);
        };
    }, []);

    const retrieveNextComments = () => {
        const success = (response) => {
            setComments((prev) => {
                return {
                    next: response.data.next,
                    comments: [...prev.comments, ...response.data.results],
                };
            });
        };
        if (!next) return;
        getNextItems(next, success);
    };

    return (
        <Dialog
            open={open}
            onClose={close}
            className="p-0 m-0"
            PaperProps={{ style: { padding: "0px" } }}
            fullScreen={fullScreen}
        >
            <div
                className="max-w-md mx-auto w-screen h-screen  dark:bg-black flex flex-col p-2 gap-2 overflow-hidden dark:border-2 dark:border-gray-900"
                onClick={(e) => e.stopPropagation()}
            >
                <CommentForm handleSubmit={handleSubmit} />
                <div className="overflow-y-scroll h-full pb-12">
                    {comments.map((comment) => {
                        return (
                            <CommentCard
                                content={comment.content}
                                creator_name={comment.creator.username}
                                creator_profile_pic={comment.creator.profile_pic}
                                creator_id={comment.creator.id}
                                key={comment.id}
                                created={comment.created}
                            />
                        );
                    })}
                    {next && (
                        <div className="flex flex-col items-center w-full">
                            <button
                                className="text-purple-500 m-10 text-2xl p-1 flex justify-center items-center gap-1"
                                onClick={retrieveNextComments}
                            >
                                more
                                <KeyboardDoubleArrowDownIcon />
                            </button>
                        </div>
                    )}
                </div>
                <button className="bg-purple-400 text-purple-100" onClick={close}>
                    Close
                </button>
            </div>
        </Dialog>
    );
};

const EditPostModal = ({ id, open, onClose }) => {
    const {
        profileData: { username, profile_pic },
    } = useUserContext();
    const { getCardInfoFromData, maxFileSizeKb } = usePageContext();
    const prevContent = getCardInfoFromData(id)[0];
    const [file, setFile] = useState({ name: "", file: null, sizeKb: 0 });
    const [editPostText, setEditPostText] = useState(prevContent.content);
    const fileInputRef = useRef();
    const submitForm = (e) => {
        e.preventDefault();
    };
    const chooseImageFile = (e) => {
        e.preventDefault();
        document.querySelector("#edit-post-image-field").click();
    };
    const [fullScreen, setFullScreen] = useState(false);
    console.log(prevContent);
    const clearFile = (e) => {
        if (e) {
            e.preventDefault();
            const remove = window.confirm(`Clear ${file.name} from form?`);
            if (!remove) return;
        }
        fileInputRef.value = null;
        setFile({
            name: "",
            file: null,
            sizeKb: 0,
        });
    };

    const checkWindowSize = () => {
        if (window.innerWidth < 520) {
            setFullScreen(true);
        } else setFullScreen(false);
    };

    useEffect(() => {
        window.addEventListener("resize", checkWindowSize);
        return () => {
            window.removeEventListener("resize", checkWindowSize);
        };
    }, []);

    return (
        <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
            <div className="max-w-md mx-auto w-screen dark:bg-black flex flex-col p-2 gap-2 overflow-hidden dark:border-2 dark:border-gray-900">
                <div className="w-full grid-cols-[49px,_auto] h-min-content grid p-3  border-b-4 gap-1 bg-gray-100 mt-2 dark:bg-black dark:bg-opacity-90 dark:shadow-xl dark:border-gray-800">
                    <div>
                        <Avatar alt="post" src={profile_pic}>
                            {username && username.at(0).toUpperCase()}
                        </Avatar>
                    </div>
                    <form
                        className="flex flex-col gap-3 justify-between"
                        action="/"
                        method="post"
                        id="edit-form"
                        onSubmit={submitForm}
                        encType="multipart/form-data"
                    >
                        <div>
                            <label htmlFor="edit-tweet-input" className="fixed -top-[10000px]">
                                Post content
                            </label>
                            <input
                                type="text"
                                name="content"
                                value={editPostText}
                                id="edit-tweet-input"
                                required
                                onChange={(e) => setEditPostText(e.target.value)}
                                className="border-none p-2 text-[#5B7083] bg-white w-full  rounded-lg focus:outline-none text-sm dark:bg-gray-900 dark:text-gray-300"
                            />

                            <label htmlFor="edit-post-image-field" className="fixed -top-[10000px]">
                                Select post image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                name="image"
                                id="edit-post-image-field"
                                ref={fileInputRef}
                                className="fixed -top-[10000px]"
                                onChange={(e) => {
                                    const file = URL.createObjectURL(e.target.files[0]);
                                    console.log(e);
                                    setFile({
                                        file: file,
                                        sizeKb: Math.round(e.target.files[0].size / 1024),
                                        name: e.target.value.split("\\").pop(),
                                    });
                                }}
                            />
                        </div>
                        {file.file && (
                            <div
                                className={`mt-2 px-2 w-max  ${
                                    file.sizeKb > maxFileSizeKb
                                        ? "text-red-600 dark:text-red-400"
                                        : "text-green-600 dark:text-green-300 "
                                }`}
                            >
                                Size: {file.sizeKb} kb / {maxFileSizeKb} kb (
                                {file.sizeKb <= maxFileSizeKb ? "Ok" : "Too Large"})
                            </div>
                        )}
                        <ImagePreview
                            file={file}
                            src={prevContent.image}
                            removeImage={(e) => clearFile(e)}
                        />
                        <div>
                            <button
                                className="m-2 text-purple-500 text-2xl"
                                onClick={chooseImageFile}
                            >
                                <iconify-icon icon="bi:image">Choose Image</iconify-icon>
                            </button>
                            <button
                                className="bg-purple-400 text-purple-50 float-right px-2 h-8 rounded-full w-20"
                                type="submit"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <button
                className="bg-purple-400 text-purple-100 w-[90%] m-auto rounded-md my-4"
                onClick={onClose}
            >
                Close
            </button>
        </Dialog>
    );
};
export { CommentsModal, EditPostModal };
