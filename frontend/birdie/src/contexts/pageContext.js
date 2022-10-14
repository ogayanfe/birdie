import { useState, useContext, createContext } from "react";
import usePostActionContext from "./PostActionContext";

export const pageContext = createContext();

export const PageContextProvider = ({ children }) => {
    const [data, setData] = useState({
        next: null,
        posts: [],
    });
    const { _likePost, _savePost } = usePostActionContext();
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

    const context = {
        data: data,
        setData: setData,
        likePost: likePost,
        savePost: savePost,
        setOnPostLike: setOnPostLike,
        setOnPostSave: setOnPostSave,
    };
    return <pageContext.Provider value={context}>{children}</pageContext.Provider>;
};

const usePageContext = () => {
    return useContext(pageContext);
};

export default usePageContext;
