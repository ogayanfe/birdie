import React, { useState, useEffect } from "react";
import useUserContext from "../../contexts/UserContext";
import UserProfileCard from "./UserProfileCard";

const ProfileUsers = () => {
    const [{ followers }, setFollowers] = useState({
        next: null,
        followers: [],
    });

    const {
        axiosInstance,
        user: { user_id },
    } = useUserContext();

    useEffect(() => {
        axiosInstance
            .get(`/accounts/${user_id}/following/`)
            .then((response) => {
                setFollowers({
                    next: response.data.next,
                    followers: response.data.results,
                });
            })
            .catch(() => alert("Could not retrieve data"));
    }, [axiosInstance, user_id]);
    return (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 p-2">
            {followers.map((user) => {
                return <UserProfileCard {...user} key={user.id} />;
            })}
        </div>
    );
};

export default ProfileUsers;
