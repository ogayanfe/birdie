import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Base from "./components/global/Base";
import Home from "./components/Home";
import Saved from "./components/Saved";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import SignIn from "./components/Auth/SignIn";
import LoginRequiredRoute from "./components/global/ProtectedRoute";
import Logout from "./components/Auth/Logout";
import ErrorPage from "./components/global/ErrorPage";
import Liked from "./components/Liked";
import PostDetail from "./components/global/PostDetail";
import OtherUserDetail from "./components/OtherUserDetail";
import SignUp from "./components/Auth/Signup";

const App = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Base />} errorElement={<ErrorPage />}>
                <Route path="/" element={<LoginRequiredRoute />}>
                    <Route path="" element={<Home />} />
                    <Route path="likes/" element={<Liked />} />
                    <Route path="saved/" element={<Saved />} />
                    <Route path="explore/" element={<Explore />} />
                    <Route path="profile/" element={<Profile />} />
                    <Route path="logout/" element={<Logout />} />
                    <Route path="post/:postId" element={<PostDetail />} />
                    <Route path="user/:userId" element={<OtherUserDetail />} />
                </Route>
            </Route>
            <Route path="signin/" element={<SignIn />} />
            <Route path="signup/" element={<SignUp />} />
        </>
    )
);

export default App;
