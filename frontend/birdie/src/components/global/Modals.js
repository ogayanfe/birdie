import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "@mui/material";
import usePageContext from "../../contexts/pageContext";
import useUserContext from "../../contexts/UserContext";
import usePostActionContext from "../../contexts/PostActionContext";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { Avatar } from "@mui/material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import useThemeContext from "../../contexts/themeContext";

const ImagePreview = ({ src, removeImage, file }) => {
    if (src || file.file) {
        return (
            <div className="w-full float-right relative mt-3">
                <img
                    src={file.file ? file.file : src}
                    alt="selected file preview"
                    className="w-full rounded-lg object-cover max-h-[50vh]"
                ></img>
                <button
                    className="w-full h-full p-3  rounded-lg lg:text-2xl absolute top-0 left-0 bg-gray-900 opacity-0 hover:opacity-80 text-white transition-all"
                    onClick={removeImage}
                    type="button"
                >
                    Remove Image
                </button>
            </div>
        );
    }
    return (
        <div className="w-full h-48 rounded-md bg-white text-gray-700 dark:text-gray-200 flex items-center text-3xl justify-center dark:bg-[#03060e]">
            No File Selected
        </div>
    );
};

const CommentsModal = ({ id, open, close, onComment }) => {
    const { getComments } = usePostActionContext();
    const { createComment, getNextItems } = usePageContext();
    const [{ comments, next }, setComments] = useState({
        next: null,
        comments: [],
    });
    const [fullScreen, setFullScreen] = useState(window.innerWidth < 520);

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = (response) => {
            setComments((prev) => {
                return {
                    ...prev,
                    comments: [response.data, ...prev.comments],
                };
            });
            onComment && onComment(id);
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
        getComments(id, success, () => alert("Couldn't load comments"));
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
    const { darkTheme } = useThemeContext();
    const { getCardInfoFromData, maxFileSizeKb, updatePost } = usePageContext();
    const prevContent = getCardInfoFromData(id)[0];
    const [file, setFile] = useState({ name: "", file: null, sizeKb: 0 });
    const [prevImageSrc, setPrevImageSrc] = useState(prevContent.image);
    const [editPostText, setEditPostText] = useState(prevContent.content);
    const chooseImageFile = (e) => {
        e.preventDefault();
        document.querySelector("#edit-post-image-field").click();
    };
    const [fullScreen, setFullScreen] = useState(window.innerWidth < 520);
    const fileInputRef = useRef();

    const submitForm = (e) => {
        e.preventDefault();
        const formElement = e.target;
        if (file.sizeKb > maxFileSizeKb) {
            alert(
                `File to large, maximum size is ${maxFileSizeKb} kb. Your file is ${file.sizeKb} kb`
            );
            return;
        }
        const success = () => {
            alert("Successfully updated post");
        };
        updatePost(id, new FormData(formElement), success, () => {
            alert("Failed to update post");
        });
    };

    const clearFile = (e) => {
        e.preventDefault();
        const remove = window.confirm(`Clear image from form?`);
        if (!remove) return;
        if (!file.file) {
            setPrevImageSrc("");
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
    const darkThemePaperStyle = {
        background: "black",
        border: "2px solid rgb(17, 24, 39)",
    };
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={fullScreen}
            PaperProps={{
                style: darkTheme ? darkThemePaperStyle : {},
            }}
        >
            <div className="max-w-md mb-3 mx-auto w-screen dark:bg-black flex overflow-y-scroll flex-col p-2 gap-2 overflow-hidden">
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
                                disabled={prevImageSrc && !file.file}
                                onChange={(e) => {
                                    const file = URL.createObjectURL(e.target.files[0]);
                                    setFile({
                                        file: file,
                                        sizeKb: Math.round(e.target.files[0].size / 1024),
                                        name: e.target.value.split("\\").pop(),
                                    });
                                }}
                            />
                            <input type="hidden" name="isEdited" value="True" />
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
                            src={prevImageSrc}
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
                className="bg-purple-400 text-purple-100 w-[96%] mx-auto rounded-sm mb-4 mt-auto"
                onClick={onClose}
            >
                Close
            </button>
        </Dialog>
    );
};

const validUsernamePattern = /^[\w.@+-]+$/;

function validateUsername(username) {
    if (!username || username.at(-1) === " ") return false;
    return Boolean(username.match(validUsernamePattern));
}

const ChangePasswordModal = ({ open, close }) => {
    const [passwordError, setPasswordError] = useState(false);
    const [{ newPassword, newPasswordConfirm }, setPasswords] = useState({
        newPassword: "",
        newPasswordConfirm: "",
    });
    const { axiosInstance } = useUserContext();

    function handleSubmit(e) {
        e.preventDefault();
        if (newPassword !== newPasswordConfirm) {
            alert("Passwords do not match");
            return;
        }
        axiosInstance
            .patch("/accounts/profile/update/", {
                password: newPassword,
            })
            .then(() => {
                alert("Update Successfull");
                close();
            })
            .catch(() => alert("Couldn't update passwords"));
    }
    function handleChange(e) {
        setPasswords((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setPasswordError(!validateUsername(e.target.value));
    }

    return (
        <Dialog open={open} PaperProps={{ style: { background: "transparent" } }} onClose={close}>
            <div className="w-[80vw] bg-purple-50 max-w-lg p-6 h-max-content rounded-lg dark:bg-black dark:border-2 border-gray-900 rounded-lgz">
                <h1 className="text-2xl text-purple-500 flex justify-center gap-1 items-center m-2">
                    <span className="text-3xl">
                        <iconify-icon icon="game-icons:hummingbird"></iconify-icon>
                    </span>
                    Change Password
                </h1>
                <form
                    className="flex flex-col gap-3 border-b-4 border-gray-300  dark:border-gray-900 pb-6"
                    id="update-password-form"
                    onSubmit={handleSubmit}
                >
                    {passwordError && <p className="text-sm text-red-500">Invalid password</p>}
                    <label htmlFor="new-password" className="dark:text-gray-200">
                        New password
                    </label>
                    <input
                        type="password"
                        className="rounded-lg p-2 text-sm text-[#5B7083] bg-white dark:bg-gray-900 dark:text-gray-300"
                        name="newPassword"
                        id="new-password"
                        onChange={handleChange}
                        required
                        value={newPassword}
                        placeholder="password"
                    />
                    <label htmlFor="new-password-confirm" className="dark:text-gray-200">
                        Type password again
                    </label>
                    <input
                        type="password"
                        value={newPasswordConfirm}
                        onChange={handleChange}
                        className="rounded-lg p-2 text-sm text-[#5B7083] bg-white dark:bg-gray-900 dark:text-gray-300"
                        name="newPasswordConfirm"
                        id="new-password-confirm"
                        required
                        placeholder="confirm your password"
                    />
                    <div>
                        <button className="bg-purple-600 text-purple-100 rounded-full px-2 w-20 py-1 float-right mt-2">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};

export { CommentsModal, EditPostModal, ChangePasswordModal };
