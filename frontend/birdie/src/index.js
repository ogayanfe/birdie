import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";
import { PostActionContextProvider } from "./contexts/PostActionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <UserContextProvider>
            <PostActionContextProvider>
                <RouterProvider router={App} />
            </PostActionContextProvider>
        </UserContextProvider>
    </React.StrictMode>
);
