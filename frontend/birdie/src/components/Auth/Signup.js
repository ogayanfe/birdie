import React, { useState } from "react";
import useUserContext from "../../contexts/UserContext";
import { Navigate, Link } from "react-router-dom";

const validUsernamePattern = /^[\w.@+-]+$/;

function validateUsername(username) {
    if (!username || username.at(-1) === " ") return false;
    return Boolean(username.match(validUsernamePattern));
}

export default function SignUp() {
    const { user, signup } = useUserContext();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
    });
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (formData.password !== formData.passwordConfirm) setPasswordError(true);
        else {
            signup(formData, (error) => {
                const data = error.response.data;
                alert(data.username);
            });
        }
    }

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (!validateUsername(e.target.value)) {
            setUsernameError(true);
        } else setUsernameError(false);
    };

    if (user) return <Navigate to="/" />;
    return (
        <main className="w-screen h-screen flex items-center justify-center">
            <div className="w-[90vw] bg-purple-50 max-w-lg p-6 h-max-content rounded-lgz border-l-4">
                <h1 className="text-2xl text-purple-500 flex justify-center gap-1 items-center m-2">
                    <span className="text-3xl">
                        <iconify-icon icon="game-icons:hummingbird"></iconify-icon>
                    </span>
                    Create An Account
                </h1>
                <form onSubmit={(e) => handleSubmit(e)} className="w-full flex flex-col gap-3">
                    <label htmlFor="signup-username">Username</label>

                    {usernameError && (
                        <p className="text-sm text-red-500">
                            Invalid username, only letters, numbers, and @/./+/-/_ characters.
                        </p>
                    )}
                    <input
                        type="text"
                        autoFocus
                        name="username"
                        required
                        className="rounded-lg p-2 text-sm"
                        onChange={handleChange}
                        value={formData.username}
                        placeholder="username"
                        id="signup-username"
                    />
                    {passwordError && <p className="text-sm text-red-500">invalid password</p>}
                    <label htmlFor="signup-password">Password</label>
                    <input
                        type="password"
                        className="rounded-lg p-2 text-sm"
                        name="password"
                        id="signup-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="password"
                    />

                    <label htmlFor="signup-password-confirm">Password confirmation</label>
                    <input
                        type="password"
                        className="rounded-lg p-2 text-sm"
                        name="passwordConfirm"
                        id="signup-password-confirm"
                        value={formData.passwordConfirm}
                        required
                        onChange={handleChange}
                        placeholder="password confirm"
                    />
                    <p className="mt-3">
                        Already have an account,{" "}
                        <Link to="/signin" className="underline text-blue-600">
                            Login
                        </Link>
                    </p>
                    <div>
                        <button className="bg-purple-600 text-purple-100 rounded-full px-2 w-20 py-1 float-right mt-2">
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
