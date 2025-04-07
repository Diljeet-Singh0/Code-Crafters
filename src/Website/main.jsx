import React from "react";

const LogoCard = () => {
    return (
        <div className="w-full fixed top-0 z-50 ">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex  bg-blue-600 gap-4 items-center justify-between  p-4 rounded-b-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-700 hover:shadow-2xl">
                    {/* Logo + Title */}
                    <div className="flex items-center gap-4">
                        <img
                            src="37cde907-e8a2-45d4-9a6a-05d5cac3ff6c.jpeg" // <-- Put your image filename here
                            alt="logo"
                            className="h-16 w-16 rounded-2xl"
                        />
                        <h1 className="text-white text-3xl font-bold tracking-wide">
                            Info<span className="text-yellow-300">2</span>Docs
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoCard;

