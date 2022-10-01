import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Base from "./components/global/Base";
import Friends from "./components/Friends";
import Home from "./components/Home";
import Saved from "./components/Saved";
import Chat from "./components/Chat";
import Profile from "./components/Profile";

const rout = createBrowserRouter([
    {
        path: "/",
        element: <Base />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/friends",
                element: <Friends />,
            },
            {
                path: "/saved",
                element: <Saved />,
            },
            {
                path: "/chat",
                element: <Chat />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
        ],
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={rout} />
        </>
    );
}

export default App;
