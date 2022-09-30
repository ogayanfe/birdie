import React from "react";

const SideNav = (props) => {
    const { setShowSidebar, open } = props;
    return (
        <div className="w-full h-full relative flex flex-row bg-gray-50 border-r-4 border-gray-300">
            <div className="w-full text-center flex justify-center items-center h-16 gap-5 pt-3 text-gray-500 italic">
                <span className="text-5xl">
                    <iconify-icon icon="game-icons:hummingbird"></iconify-icon>
                </span>
                <h1
                    className={`text-2xl ${
                        open ? "block" : "hidden"
                    } lg:block transition duration-1500`}
                >
                    Sidebar
                </h1>
            </div>
            <nav className="flex">
                <button
                    className="absolute -right-3 rounded-full top-1/3 lg:hidden text-blue-400"
                    onClick={() => setShowSidebar((p) => !p)}
                    ariaHidden="true"
                >
                    <iconify-icon
                        icon="akar-icons:circle-chevron-right-fill"
                        rotate={open ? "180deg" : ""}
                        width="30px"
                    >
                        Toggle Sidebar
                    </iconify-icon>
                </button>
                <button></button>
            </nav>
        </div>
    );
};

export default SideNav;
