import React from "react";
import usePageContext from "../../contexts/pageContext";
import Card from "./Card";

const CardContainer = (props) => {
    const {
        data: { posts },
    } = usePageContext();
    return (
        <>
            {posts.map((post) => {
                return (
                    <Card
                        id={post.id}
                        key={post.id + new Date().toString()}
                        user={post.creator.username}
                        card_content={post.content}
                        card_image={post.image}
                        comments={post.comments}
                        likes={post.likes}
                        saves={post.saves}
                        liked={post.is_liked}
                        avatar={post.creator.profile_pic}
                        creator_id={post.creator.id}
                        is_saved={post.is_saved}
                        is_commented={post.is_commented}
                    />
                );
            })}
        </>
    );
};

export default CardContainer;
