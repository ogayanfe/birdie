import React from "react";

const Header = () => {
    return (
        <header className="flex items-center justify-center p-2 py-3 bg-blue-100 text-gray-900 sm:px-8 xl:px-0">
            <div className="max max-w-6xl w-full flex justify-between">
                <div class="flex items-center gap-2">
                    <iconify-icon
                        icon="icon-park:hamburger-button"
                        width="30"
                        height="30"
                        class="sm:hidden"
                    ></iconify-icon>
                    <h1 className="text-2xl font-bold md:text-3xl italic">birdie</h1>
                </div>
                <form className="hidden sm:flex items-center max-h-max relative w-5/12">
                    <iconify-icon
                        icon="ci:search"
                        width="25"
                        height="25"
                        flip="horizontal"
                        class="absolute left-2"
                    ></iconify-icon>
                    <input
                        type="text"
                        placeholder="Search"
                        className="rounded-full h-9 w-full py-1 bg-white border-none pl-10 text-xs"
                    />
                    <input type="submit" className="hidden" />
                </form>
                <div className="flex justify-between items-center gap-3">
                    <button className="bg-blue-400 text-blue-50  flex items-center gap-1 justify-center lowercase px-2 h-8 rounded-full w-24">
                        Create
                        <iconify-icon icon="ant-design:plus-outlined"></iconify-icon>
                    </button>
                    <img
                        src="https://tailwindcss.com/_next/static/media/intellisense.c22de782.png"
                        class="w-8 h-8 rounded-full"
                    ></img>
                </div>
            </div>
        </header>
    );
};

export default Header;
