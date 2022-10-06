import React from "react";
import { UserContextProvider } from "./contexts/UserContext";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Base from "./components/global/Base";
import Friends from "./components/Friends";
import Home from "./components/Home";
import Saved from "./components/Saved";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import SignIn from "./components/Auth/SignIn";
import LoginRequiredRoute from "./components/global/ProtectedRoute";
import Logout from "./components/Auth/Logout";

function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Base />}>
                        <Route path="/" element={<LoginRequiredRoute />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/friends" element={<Friends />} />
                            <Route path="/saved" element={<Saved />} />
                            <Route path="/chat" element={<Chat />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/logout" element={<Logout />} />
                        </Route>
                    </Route>
                    <Route path="/signin" element={<SignIn />} />
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    );
}

export default App;
