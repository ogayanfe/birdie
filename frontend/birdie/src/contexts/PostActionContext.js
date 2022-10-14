import { useContext, createContext } from "react";
import useUserContext from "./UserContext";

export const postActionContext = createContext();

export const PostActionContextProvider = ({ children }) => {
    const { axiosInstance } = useUserContext();
    const createPost = async (formData, onSuccess, onFailure) => {
        let response;
        response = await axiosInstance.post("post/create/", formData);
        if (response.status >= 200 && response.status < 400) {
            onSuccess(response);
        } else onFailure(response);
    };

    const getPosts = async (filter = null, onSuccess, onFailure) => {
        let response;
        response = await axiosInstance.get(`post/all/?filter=${filter}`);
        if (response.status >= 200 && response.status < 400) {
            onSuccess(response);
        } else onFailure(response);
    };

    const likePost = async (id, onSuccess, onFailure = console.error) => {
        let response;
        response = await axiosInstance.post(`post/${id}/like/`);
        if (response.status >= 200 && response.status < 400) {
            onSuccess(response);
        } else onFailure(response);
    };
    const savePost = async (id, onSuccess, onFailure = console.error) => {
        let response;
        response = await axiosInstance.post(`post/${id}/save/`);
        if (response.status >= 200 && response.status < 400) {
            onSuccess(response);
        } else onFailure(response);
    };

    const getComments = async (id, onSuccess, onFailure = console.log) => {
        let response;
        response = await axiosInstance.get(`post/${id}/comments/`);
        if (response.status >= 200 && response.status < 400) {
            onSuccess(response);
        } else onFailure(response);
    };
    // const savePost
    const contextValue = {
        createPost: createPost,
        getComments: getComments,
        getPosts: getPosts,
        _likePost: likePost,
        _savePost: savePost,
    };

    return <postActionContext.Provider value={contextValue}>{children}</postActionContext.Provider>;
};

const usePostActionContext = () => {
    return useContext(postActionContext);
};

export default usePostActionContext;
