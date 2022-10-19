import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import usePageContext from "../../contexts/pageContext";
import useUserContext from "../../contexts/UserContext";
import CardContainer from "./CardContainer";

const PostDetail = () => {
    const { postId } = useParams();
    const { setData } = usePageContext();
    const { axiosInstance } = useUserContext();
    useEffect(() => {
        axiosInstance.get(`/post/${postId}/`).then((response) => {
            setData({
                next: null,
                posts: [response.data],
            });
        });
    }, [axiosInstance, postId, setData]);

    return (
        <div className="w-full flex justify-center mt-4 overflow-y-scroll">
            <CardContainer />
        </div>
    );
};

export default PostDetail;
