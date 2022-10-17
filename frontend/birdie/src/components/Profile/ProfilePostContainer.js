import React, { useEffect } from "react";
import usePageContext from "../../contexts/pageContext";
import usePostActionContext from "../../contexts/PostActionContext";
import CardContainer from "../global/CardContainer";

const ProfilePostContainer = () => {
    const { setData } = usePageContext();
    const { getPosts } = usePostActionContext();

    useEffect(() => {
        const success = (response) => {
            setData({ next: response.data.next, posts: response.data.results });
        };
        getPosts("user", success, console.log);
        return () => {
            setData({
                next: null,
                posts: [],
            });
        };
    }, [getPosts, setData]);
    return (
        <>
            <CardContainer />
        </>
    );
};

export default ProfilePostContainer;
