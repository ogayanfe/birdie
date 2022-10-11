import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Base from "./components/global/Base";
import Friends from "./components/Friends";
import Home from "./components/Home";
import Saved from "./components/Saved";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import SignIn from "./components/Auth/SignIn";
import LoginRequiredRoute from "./components/global/ProtectedRoute";
import Logout from "./components/Auth/Logout";

const App = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Base />}>
                <Route path="/" element={<LoginRequiredRoute />}>
                    <Route path="" element={<Home />} action={console.log} />
                    <Route path="friends/" element={<Friends />} />
                    <Route path="saved/" element={<Saved />} />
                    <Route path="chat/" element={<Chat />} />
                    <Route path="profile/" element={<Profile />} />
                    <Route path="logout/" element={<Logout />} />
                </Route>
            </Route>
            <Route path="/signin" element={<SignIn />} />
        </>
    )
);

export default App;
