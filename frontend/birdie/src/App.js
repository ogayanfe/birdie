import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Base from "./components/global/Base";
import Home from "./components/Home";
import Saved from "./components/Saved";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import SignIn from "./components/Auth/SignIn";
import LoginRequiredRoute from "./components/global/ProtectedRoute";
import Logout from "./components/Auth/Logout";
import PostMethod from "./components/global/PostMethod";
import ErrorPage from "./components/global/ErrorPage";
import Liked from "./components/Liked";

const App = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Base />} errorElement={<ErrorPage />}>
                <Route path="/" element={<LoginRequiredRoute />}>
                    <Route path="" element={<Home />} />
                    <Route path="likes/" element={<Liked />} />
                    <Route path="saved/" element={<Saved />} />
                    <Route path="chat/" element={<Chat />} />
                    <Route path="profile/" element={<Profile />} />
                    <Route path="logout/" element={<Logout />} />
                </Route>
            </Route>
            <Route path="signin/" element={<SignIn />} />
        </>
    )
);

export default App;
