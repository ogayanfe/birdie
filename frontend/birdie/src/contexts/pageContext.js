import { useState, useContext, createContext, useEffect } from "react";
import usePostActionContext from "./PostActionContext";
import useUserContext from "./UserContext";

export const pageContext = createContext();

export const PageContextProvider = ({ children }) => {
    const { axiosInstance } = useUserContext();
    const [data, setData] = useState({
        next: null,
        posts: [],
    });
    const { _likePost, _savePost, _createComment } = usePostActionContext();
    // function to be called to filter posts when liked
    const [onPostLike, setOnPostLike] = useState(null);
    // function to be called to filter posts when saved
    const [onPostSave, setOnPostSave] = useState(null);
    const likePost = (id) => {
        const success = (response) => {
            setData((prev) => {
                const update = response.data;
                let newPost = prev.posts.map((post) => (post.id === update.id ? update : post));
                if (onPostLike) newPost = onPostLike(newPost);
                return { ...prev, posts: newPost };
            });
        };
        _likePost(id, success);
    };

    const savePost = (id) => {
        const success = (response) => {
            setData((prev) => {
                const update = response.data;
                let newPost = prev.posts.map((post) => (post.id === update.id ? update : post));
                if (onPostSave) newPost = onPostSave(newPost);
                return { ...prev, posts: newPost };
            });
        };
        _savePost(id, success);
    };

    const createComment = async (id, formData, onSuccess, onFailure) => {
        const success = (response) => {
            onSuccess(response);
            setData((prev) => {
                const newPosts = prev.posts.map((post) => {
                    return post.id === id
                        ? { ...post, comments: post.comments + 1, is_commented: true }
                        : post;
                });
                return { ...prev, posts: newPosts };
            });
        };
        _createComment(id, formData, success, onFailure);
    };

    const getNextItems = async (next, onSuccess, onFailure = console.log) => {
        const response = await axiosInstance.get(`${next}`);
        if (response.status >= 200 && response.status < 400) {
            console.log(response);
            onSuccess(response);
        } else onFailure(response);
    };

    const context = {
        data: data,
        setData: setData,
        likePost: likePost,
        savePost: savePost,
        setOnPostLike: setOnPostLike,
        setOnPostSave: setOnPostSave,
        createComment: createComment,
        getNextItems: getNextItems,
        getNextUrl: () => data.next,
    };

    return <pageContext.Provider value={context}>{children}</pageContext.Provider>;
};

const usePageContext = () => {
    return useContext(pageContext);
};

export default usePageContext;
