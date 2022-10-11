import React from "react";
import { Avatar } from "@mui/material";

const Card = () => {
    return (
        <div className="w-[598px] max-w-[95%] p-3 gap-2 grid grid-cols-[49px,_auto] bg-gray-50 mt-4 rounded-md">
            <div>
                <Avatar src="http://localhost:8000/media/images/posts/images/admin_1/6a21ad2cb11eb7727afb1662e3600c0a.jpeg">
                    T
                </Avatar>
            </div>
            <div>
                <div className="flex h-5 mb-2">
                    <div className="text-sm col text-[#0F1419]">Devon Lane</div>
                    <div className="text-[#5B7083] text-sm">. 23s</div>
                </div>
                <div className="text-[#0F1419] text-[0.8rem]">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque cum eligendi
                    distinctio corporis nihil labore libero cupiditate dolor dolorum.
                    <a href="#readmore" className="text-blue-400 pl-1 hover:text-gray-400">
                        show more
                    </a>
                </div>
                <div className="py-3 h-72">
                    <img
                        src="http://localhost:8000/media/images/posts/images/admin_1/96da8690b44bf531b567f1d51eb9fac7.jpeg"
                        className="h-full w-full rounded-xl object-cover"
                    />
                </div>
                <nav className="w-full grid grid-cols-4">
                    <button className="flex justify-center gap-4 items-center w-full h-full ">
                        <iconify-icon icon="fa:comment-o">Comments</iconify-icon>
                        <span>15</span>
                    </button>
                    <button className="flex justify-center gap-4 items-center w-full h-full ">
                        {/* <iconify-icon icon="flat-color-icons:like"></iconify-icon> */}
                        <iconify-icon icon="icon-park-outline:like">Like</iconify-icon>
                        <span>10</span>
                    </button>
                    <button className="flex justify-center gap-4 items-center w-full h-full">
                        <iconify-icon icon="carbon:data-share">share</iconify-icon>
                        <span>0</span>
                    </button>
                    <button className="flex justify-center gap-4 items-center w-full h-full ">
                        <iconify-icon icon="bi:save">Save</iconify-icon>
                        <span>4</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Card;
