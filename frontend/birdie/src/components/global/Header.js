import Avatar from "@mui/material/Avatar";
import React from "react";

const Header = () => {
    return (
        <header className="flex items-center justify-center  p-2 h-14 absolute w-full bg-gray-100 border-0 text-gray-900 sm:px-8">
            <div className="max max-w-6xl w-full flex justify-between">
                <h1 className="text-3xl font-bold italic">birdie</h1>
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
