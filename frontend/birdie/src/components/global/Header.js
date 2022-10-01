import Avatar from "@mui/material/Avatar";
import React from "react";
// import randomColor from "randomcolor";

const Header = () => {
    return (
        <header className="flex items-center justify-center  p-2 h-14 absolute w-full bg-gray-100 border-0 text-gray-900 sm:px-8">
            <div className="max max-w-6xl w-full flex justify-between">
                <div
                    className="flex gap-2 text-2xl text-blue-400 items-center lg:invisible"
                    aria-hidden={true}
                >
                    <span className="text-4xl">
                        <iconify-icon icon="game-icons:hummingbird">birdie logo</iconify-icon>
                    </span>
                    <h1 className="font-bold italic hidden sm:inline-block">birdie</h1>
                </div>
                <div className="flex justify-between items-center gap-3">
                    <button className="bg-blue-400 text-blue-50  flex items-center gap-1 justify-center px-2 h-8 rounded-full w-24">
                        Create
                        <iconify-icon icon="ant-design:plus-outlined"></iconify-icon>
                    </button>
                    <Avatar>T</Avatar>
                </div>
            </div>
        </header>
    );
};

export default Header;
