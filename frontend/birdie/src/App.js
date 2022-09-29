import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Base from "./components/global/Base";

const rout = createBrowserRouter([
    {
        path: "/",
        element: <Base />,
        children: [
            {
                path: "/hello",
                element: <div>Hello world!</div>,
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
