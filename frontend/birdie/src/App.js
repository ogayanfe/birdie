import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Base from "./components/global/Base";
import Friends from "./components/Friends";
import Home, { homePostsLoader } from "./components/Home";
import Saved from "./components/Saved";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import SignIn from "./components/Auth/SignIn";
import LoginRequiredRoute from "./components/global/ProtectedRoute";
import Logout from "./components/Auth/Logout";
import { createPost } from "./actions";
import PostMethod from "./components/global/PostMethod";
import ErrorPage from "./components/global/ErrorPage";

const App = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Base />} errorElement={<ErrorPage />}>
                <Route path="/" element={<LoginRequiredRoute />}>
                    <Route
                        path=""
                        element={<Home />}
                        action={createPost}
                        loader={homePostsLoader}
                    />
                    <Route path="friends/" element={<Friends />} />
                    <Route path="saved/" element={<Saved />} />
                    <Route path="chat/" element={<Chat />} />
                    <Route path="profile/" element={<Profile />} />
                    <Route path="logout/" element={<Logout />} />
                </Route>
            </Route>
            <Route path="signin/" element={<SignIn />} />
            <Route path="createpost/" action={createPost} element={<PostMethod />} />
        </>
    )
);

export default App;
