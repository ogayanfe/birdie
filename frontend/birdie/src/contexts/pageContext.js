import { useState, useContext, createContext } from "react";
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

    const likePost = (id, success) => {
        const _success = (response) => {
            setData((prev) => {
                const update = response.data;
                let newPost = prev.posts.map((post) => (post.id === update.id ? update : post));
                return { ...prev, posts: newPost };
            });
        };
        _likePost(id, success ? success : _success);
    };

    const savePost = (id, success) => {
        const _success = (response) => {
            setData((prev) => {
                const update = response.data;
                let newPost = prev.posts.map((post) => (post.id === update.id ? update : post));
                return { ...prev, posts: newPost };
            });
        };
        _savePost(id, success ? success : _success);
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
            onSuccess(response);
        } else onFailure(response);
    };

    const followUser = (id, success, onFailure) => {
        axiosInstance
            .post(`/accounts/follow_unfollow/${id}/`)
            .then((response) => {
                success(response);
            })
            .catch((e) => onFailure(e));
    };

    const deletePost = (id, onSuccess, onFailure) => {
        axiosInstance
            .delete(`/post/delete/${id}/`)
            .then((response) => {
                setData((prev) => {
                    const newPosts = prev.posts.filter((post) => post.id !== id);
                    return { ...prev, posts: newPosts };
                });
                onSuccess(response);
            })
            .catch((e) => onFailure(e));
    };

    const getCardInfoFromData = (id) => {
        return data.posts.filter((post) => post.id === id);
    };

    const updatePost = (id, formData, onSuccess, onFailure) => {
        axiosInstance
            .patch(`/post/update/${id}/`, formData)
            .then((response) => {
                const updatedData = response.data;
                setData((prev) => {
                    const posts = prev.posts.map((post) => (post.id === id ? updatedData : post));
                    return { ...prev, posts: posts };
                });
                onSuccess(response);
            })
            .catch((e) => onFailure(e));
    };
    const context = {
        data: data,
        setData: setData,
        likePost: likePost,
        savePost: savePost,
        deletePost: deletePost,
        updatePost: updatePost,
        getCardInfoFromData: getCardInfoFromData,
        createComment: createComment,
        getNextItems: getNextItems,
        getNextUrl: () => data.next,
        followUser: followUser,
        maxFileSizeKb: 200, // Max image size in kilobyte
    };

    return <pageContext.Provider value={context}>{children}</pageContext.Provider>;
};

const usePageContext = () => {
    return useContext(pageContext);
};

export default usePageContext;
