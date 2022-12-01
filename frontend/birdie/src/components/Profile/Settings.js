import React from "react";
import useUserContext from "../../contexts/UserContext";

const Settings = () => {
    const { profileData } = useUserContext();
    const { profile_pic, username, cover_pic } = profileData;

    const handleEditClick = (name) => {
        document.querySelector(`#${name}`).click();
    };

    return (
        <div className="bg-gray-50 w-full p-7 mt-3 border-b-4 dark:bg-[#030108]">
            <form
                className="flex flex-col gap-7 justify-between"
                id="tweet-form"
                encType="multipart/form-data"
            >
                <div className="flex gap-3 flex-col w-full relative">
                    <label
                        for="profilePicUpdate"
                        className="dark:text-gray-200 font-medium tracking-wide"
                    >
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        name="profile_pic"
                        id="profilePicUpdate"
                        className="fixed -top-[20000px]"
                    />
                    <button
                        type="button"
                        className="text-purple-500 text-lg absolute right-3 px-1 py-[.2rem] rounded hover:bg-gray-200 hover:dark:bg-gray-900"
                        onClick={() => handleEditClick("profilePicUpdate")}
                    >
                        Edit
                    </button>
                    <div className="w-full flex items-center justify-center">
                        <img
                            src={profile_pic}
                            alt={username}
                            className="rounded-full w-[136px] h-[136px]  border-4 border-purple-500"
                        ></img>
                    </div>
                </div>
                <div className="flex gap-3 flex-col w-full relative">
                    <label
                        for="coverPicUpdate"
                        className="dark:text-gray-200 font-medium tracking-wide"
                    >
                        Cover Image
                    </label>
                    <input
                        type="file"
                        name="cover_pic"
                        className="fixed -top-[20000px]"
                        id="coverPicUpdate"
                    />
                    <button
                        type="button"
                        className="text-purple-500 text-lg absolute right-3 px-1 font-medium py-[.2rem] rounded hover:bg-gray-200 hover:dark:bg-gray-900"
                        onClick={() => handleEditClick("coverPicUpdate")}
                    >
                        Edit
                    </button>
                    <div className="w-full flex items-center justify-center p-2 rounded">
                        <img
                            src={cover_pic}
                            alt="Profile Cover Image"
                            className="w-4/5 rounded-lg object-cover max-h-[40vh]"
                        ></img>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <label
                        for
                        id="usernameUpdate"
                        className="dark:text-gray-200 font-medium tracking-wide"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="usernameUpdate"
                        className="border-none p-2 text-gray-900 bg-gray-300 w-full  rounded-lg focus:outline-none text-sm dark:bg-gray-900 dark:text-gray-300"
                    />
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
        </div>
    );
};

export default Settings;
