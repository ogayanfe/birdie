import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Base from "./components/global/Base";
import Home from "./components/Home";
import { pageLoader } from "./loaders";
import Saved from "./components/Saved";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import SignIn from "./components/Auth/SignIn";
import LoginRequiredRoute from "./components/global/ProtectedRoute";
import Logout from "./components/Auth/Logout";
import { createPost } from "./actions";
import PostMethod from "./components/global/PostMethod";
import ErrorPage from "./components/global/ErrorPage";
import Liked from "./components/Liked";

const App = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Base />} errorElement={<ErrorPage />}>
                <Route path="/" element={<LoginRequiredRoute />}>
                    <Route
                        path=""
                        element={<Home />}
                        action={createPost}
                        loader={async () => {
                            return await pageLoader("all");
                        }}
                    />
                    <Route
                        path="likes/"
                        element={<Liked />}
                        action={createPost}
                        loader={async () => {
                            return await pageLoader("liked");
                        }}
                    />
                    <Route
                        path="saved/"
                        element={<Saved />}
                        action={createPost}
                        loader={async () => {
                            return await pageLoader("saved");
                        }}
                    />
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
