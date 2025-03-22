import { Link } from "lucide-react";
import React, { useEffect, useState } from "react";

const Header: React.FC = () => {
    const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.body.classList.remove("dark");
        } else {
            document.body.classList.add("dark");
        }
        setIsDarkMode(!isDarkMode);
    };

    // detect system theme on load
    useEffect(() => {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.body.classList.add("dark");
            setIsDarkMode(true);
        }
    }, []);

    return (
        <div className="absolute top-0 left-0 z-[1] flex items-center justify-between w-full py-2.5 px-4">
            {/* Logo */}
            <div
                className="text-2xl text-gray-800 dark:text-gray-200 cursor-pointer"
                onClick={() => window.location.reload()}
            >
                <span className="font-monomaniac select-none">drawwIt</span>
            </div>

            <div className="relative flex items-center gap-4">
                {/* Theme toggle */}
                <div
                    className={`relative w-32 h-12 rounded-full cursor-pointer transition-all duration-300 outline ${
                        isDarkMode
                            ? "bg-gray-900 outline-gray-700"
                            : "bg-gray-200 outline-gray-300"
                    }`}
                    onClick={toggleTheme}
                    style={{
                        width: "48px",
                        height: "32px",
                    }}
                    title="Toggle theme"
                >
                    {/* Toggle button */}
                    <div
                        className={`absolute flex items-center justify-center bg-white dark:bg-gray-700 rounded-full shadow-md theme-toggle-icon transform ${
                            isDarkMode ? "translate-x-4" : "translate-x-0"
                        }`}
                        style={{
                            width: "24px",
                            height: "24px",
                            top: "4px",
                            left: "4px",
                        }}
                    >
                        {/* Sun icon */}
                        <div
                            className={`absolute transition-opacity duration-300 ${
                                isDarkMode ? "opacity-0" : "opacity-100"
                            }`}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="5"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="12"
                                    y1="4"
                                    x2="12"
                                    y2="2"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="12"
                                    y1="22"
                                    x2="12"
                                    y2="20"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="20"
                                    y1="12"
                                    x2="22"
                                    y2="12"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="2"
                                    y1="12"
                                    x2="4"
                                    y2="12"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="17.6569"
                                    y1="6.34315"
                                    x2="19.0711"
                                    y2="4.92893"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="4.92896"
                                    y1="19.0711"
                                    x2="6.34317"
                                    y2="17.6569"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="19.0711"
                                    y1="19.0711"
                                    x2="17.6569"
                                    y2="17.6569"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                                <line
                                    x1="6.34317"
                                    y1="6.34315"
                                    x2="4.92896"
                                    y2="4.92893"
                                    stroke="black"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>

                        {/* Moon icon */}
                        <div
                            className={`absolute transition-opacity duration-300 ${
                                isDarkMode ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="white"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Share */}
                <button
                    className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-3 py-1 rounded-md cursor-pointer !duration-150 select-none"
                    title="Share"
                    onClick={() => setIsShareOpen(!isShareOpen)}
                >
                    Share
                </button>

                {isShareOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-gray-100 shadow-lg rounded-lg p-2 dark:bg-gray-800 font-roboto border border-gray-200 dark:border-gray-700">
                        <div className="w-full flex items-center justify-between gap-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <label
                                htmlFor="access"
                                className="text-sm font-medium"
                            >
                                Access
                            </label>
                            <select
                                id="access"
                                className="flex-1 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-md px-2 py-1 outline-none cursor-pointer appearance-none"
                            >
                                <option
                                    className="bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    value="public"
                                >
                                    Anyone
                                </option>
                                <option
                                    className="bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    value="private"
                                >
                                    Private
                                </option>
                            </select>
                        </div>
                        <div className="w-full flex items-center gap-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <Link size={20} />
                            <span className="text-sm font-medium">
                                Copy link
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
