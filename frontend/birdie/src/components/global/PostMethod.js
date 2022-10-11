import React from "react";
import { useNavigate } from "react-router-dom";

const PostMethod = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate(-1);
    });
    return null;
};

export default PostMethod;
