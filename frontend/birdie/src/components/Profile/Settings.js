import React, { useState } from "react";
import useUserContext from "../../contexts/UserContext";
import usePageContext from "../../contexts/pageContext";
import { useEffect } from "react";
import { ChangePasswordModal } from "../global/Modals";

const validUsernamePattern = /^[\w.@+-]+$/;

function validateUsername(username) {
    if (!username || username.at(-1) === " ") return false;
    return Boolean(username.match(validUsernamePattern));
}

const Settings = () => {
    const { profileData, updateInfo, isDemoUser } = useUserContext();
    const { maxFileSizeKb } = usePageContext();
    const { profile_pic, username, cover_pic } = profileData;
    const defaultFileValues = {
        profile_pic: { name: "", file: null, sizeKb: 0 },
        cover_pic: { name: "", file: null, sizeKb: 0 },
    };
    const [editUsername, setEditUsername] = useState(false);
    const [formValues, setFormValues] = useState({
        username: username,
        ...defaultFileValues,
    });
    const [updatePassword, setupdatePassword] = useState(false);
    const clearField = (field) => {
        const fieldFileIdMapping = {
            profile_pic: "profilePicUpdate",
            cover_pic: "coverPicUpdate",
        };
        setFormValues((prev) => {
            return { ...prev, [field]: defaultFileValues[field] };
        });
        const fieldId = fieldFileIdMapping[field];
        document.getElementById(fieldId).value = "";
        document.getElementById(fieldId).disabled = true;
    };
    const handleEditClick = (name) => {
        document.querySelector(`#${name}`).click();
        document.querySelector(`#${name}`).disabled = false;
    };

    const handleChange = (e) => {
        setFormValues((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleFileChange = (e) => {
        const file = URL.createObjectURL(e.target.files[0]);
        setFormValues((prev) => {
            return {
                ...prev,
                [e.target.name]: {
                    file: file,
                    sizeKb: Math.round(e.target.files[0].size / 1024),
                    name: e.target.value.split("\\").pop(),
                },
            };
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (!validateUsername(formValues.username)) {
            alert("You have provided an invalid username");
            return;
        }
        const formElement = e.target;
        const success = () => {
            alert("Changes will take effect next time you load the page");
        };

        const failure = (e) => {
            const errorMessages = e.response.data;
            const field = Object.keys(errorMessages)[0];
            alert(errorMessages[field][0]);
        };

        updateInfo(new FormData(formElement), success, failure);
    };

    useEffect(() => {
        setFormValues((prev) => ({ ...prev, username: username }));
    }, [editUsername, username]);

    return (
        <div className="bg-gray-50 w-full p-7 mt-3 border-b-4 dark:bg-[#030108] dark:border-gray-900">
            <form
                onSubmit={submitForm}
                className="flex flex-col gap-7 justify-between"
                id="tweet-form"
                encType="multipart/form-data"
            >
                <div className="flex gap-3 flex-col w-full relative">
                    <label
                        htmlFor="profilePicUpdate"
                        className="dark:text-gray-200 font-medium tracking-wide"
                    >
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        disabled
                        name="profile_pic"
                        accept="image/*"
                        id="profilePicUpdate"
                        className="fixed -top-[20000px]"
                        onChange={handleFileChange}
                    />
                    <div className="flex gap-3 absolute right-3">
                        <button
                            type="button"
                            onClick={() => handleEditClick("profilePicUpdate")}
                            className="text-purple-500  hover:bg-gray-200 hover:dark:bg-gray-900 py-[.2rem] px-1 text-large rounded"
                        >
                            Edit
                        </button>
                        {formValues.profile_pic.file && (
                            <button
                                type="button"
                                onClick={() => clearField("profile_pic")}
                                className="bg-red-400 text-red-50  hover:dark:bg-gray-900 text-sm px-1 text-large rounded"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {formValues.profile_pic.file && (
                        <div
                            className={`w-max  ${
                                formValues.profile_pic.sizeKb > maxFileSizeKb
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-green-600 dark:text-green-300 "
                            }`}
                        >
                            Size: {formValues.profile_pic.sizeKb} kb / {maxFileSizeKb} kb (
                            {formValues.profile_pic.sizeKb <= maxFileSizeKb ? "Ok" : "Too Large"})
                        </div>
                    )}
                    <div className="w-full flex items-center justify-center">
                        {formValues.profile_pic.file || profile_pic ? (
                            <img
                                src={
                                    formValues.profile_pic.file
                                        ? formValues.profile_pic.file
                                        : profile_pic
                                }
                                alt={username}
                                className="rounded-full w-[136px] h-[136px]  border-4 border-purple-500"
                            ></img>
                        ) : (
                            <div className="rounded-full w-[136px] h-[136px] flex items-center justify-center text-white text-5xl border-4 bg-[#bdbdbd]">
                                {username && username.at(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex gap-3 flex-col w-full relative">
                    <label
                        htmlFor="coverPicUpdate"
                        className="dark:text-gray-200 font-medium tracking-wide"
                    >
                        Cover Image
                    </label>
                    <input
                        type="file"
                        disabled
                        name="cover_pic"
                        className="fixed -top-[20000px]"
                        accept="image/*"
                        id="coverPicUpdate"
                        onChange={handleFileChange}
                    />

                    <div className="flex gap-3 absolute right-3">
                        <button
                            type="button"
                            onClick={() => handleEditClick("coverPicUpdate")}
                            className="text-purple-500  hover:bg-gray-200 hover:dark:bg-gray-900 py-[.2rem] px-1 text-large rounded"
                        >
                            Edit
                        </button>
                        {formValues.cover_pic.file && (
                            <button
                                type="button"
                                onClick={() => clearField("cover_pic")}
                                className="bg-red-400 text-red-50 text-sm  hover:dark:bg-gray-900 px-1 text-large rounded"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {formValues.cover_pic.file && (
                        <div
                            className={` w-max  ${
                                formValues.cover_pic.sizeKb > maxFileSizeKb
                                    ? "text-red-600 dark:text-red-400"
                                    : "text-green-600 dark:text-green-300 "
                            }`}
                        >
                            Size: {formValues.cover_pic.sizeKb} kb / {maxFileSizeKb} kb (
                            {formValues.cover_pic.sizeKb <= maxFileSizeKb ? "Ok" : "Too Large"})
                        </div>
                    )}
                    <div className="w-full flex items-center justify-center p-2 rounded">
                        <img
                            src={formValues.cover_pic.file ? formValues.cover_pic.file : cover_pic}
                            alt="Profile Cover"
                            className="w-4/5 rounded-lg object-cover max-h-[40vh]"
                        ></img>
                    </div>
                </div>
                <div className="flex gap-1 flex-col justify-center relative">
                    <label
                        htmlFor="usernameUpdate"
                        className="dark:text-gray-200 font-medium tracking-wide"
                    >
                        Username
                    </label>
                    <div className="flex gap-3 absolute top-0 right-3">
                        <button
                            type="button"
                            onClick={() => {
                                if (isDemoUser) {
                                    alert("You can't change the username of this account");
                                    return;
                                }
                                setEditUsername((prev) => !prev);
                            }}
                            className="text-purple-500 hover:bg-gray-200 hover:dark:bg-gray-900 py-[.2rem] px-1 text-large rounded capitalize"
                        >
                            {editUsername ? "cancel" : "edit"}
                        </button>
                    </div>
                    <div className="w-2 h-2"></div>
                    {editUsername ? (
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            id="usernameUpdate"
                            className="border-none p-2 text-gray-900 bg-gray-300 w-full  rounded-lg focus:outline-none text-sm dark:bg-gray-900 dark:text-gray-300"
                            autoFocus
                            onChange={handleChange}
                            value={formValues.username}
                        />
                    ) : (
                        <div className="border-none p-2 text-gray-900 bg-gray-300 w-full  rounded-lg focus:outline-none text-sm dark:bg-gray-900 dark:text-gray-300">
                            @{username}
                        </div>
                    )}
                </div>
                <div className="flex gap-1 flex-col justify-center relative">
                    <label
                        htmlFor="usernameUpdate"
                        className="dark:text-gray-200 font-medium tracking-wide"
                    >
                        Password
                    </label>
                    <div className="flex gap-3 absolute top-0 right-3">
                        <button
                            type="button"
                            className="text-purple-500 hover:bg-gray-200 hover:dark:bg-gray-900 py-[.2rem] px-1 text-large rounded capitalize"
                            onClick={() => {
                                if (isDemoUser) {
                                    alert("You can't update the password of this account");
                                    return;
                                }
                                setupdatePassword(true);
                            }}
                        >
                            Change
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-end w-full">
                    <button
                        className="bg-purple-400 text-purple-50 float-right px-2 h-8 rounded-full  mt-3 w-20"
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </form>
            {updatePassword && (
                <ChangePasswordModal open={updatePassword} close={() => setupdatePassword(false)} />
            )}
        </div>
    );
};

export default Settings;
