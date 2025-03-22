import React,{ useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { CircleHelp, LogIn, LogOut, Settings, UserRound } from "lucide-react";

const User:React.FC = () => {
    const { isAuthenticated, user } = useAuth();
    const [active, setActive] = useState<boolean>(false);

    return (
        <div
            className={`absolute left-1.5 bottom-1.5 rounded-lg p-1.5 cursor-pointer flex items-center gap-1 ${
                active && "bg-gray-200 dark:bg-gray-900"
            }`}
            onClick={() => setActive(!active)}
            title="User"
        >
            {active &&
                (isAuthenticated ? (
                    <div
                        className="absolute bottom-full mb-2 w-40 bg-gray-100 shadow-lg rounded-lg p-2 dark:bg-gray-800 font-roboto border border-gray-200 dark:border-gray-700"
                        title=""
                    >
                        <div
                            className="w-full flex items-center gap-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                            title="Profile"
                        >
                            <UserRound size={20} />
                            <span>Profile</span>
                        </div>
                        <div
                            className="w-full flex items-center gap-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                            title="Settings"
                        >
                            <Settings size={20} />
                            <span>Settings</span>
                        </div>
                        <div
                            className="w-full flex items-center gap-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                            title="Get help"
                        >
                            <CircleHelp size={20} />
                            <span>Get help</span>
                        </div>
                        <div
                            className="w-full flex items-center gap-2 p-2 rounded-md text-red-500 dark:hover:text-gray-300 hover:bg-red-200 dark:hover:bg-red-700 cursor-pointer"
                            title="Sign out"
                        >
                            <LogOut size={20} />
                            <span>Sign out</span>
                        </div>
                    </div>
                ) : (
                    <div
                        className="absolute bottom-full mb-2 w-40 bg-gray-100 shadow-lg rounded-lg p-2 dark:bg-gray-800 font-roboto border border-gray-200 dark:border-gray-700"
                        title=""
                    >
                        <div
                            className="w-full flex items-center gap-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                            title="Sign in"
                        >
                            <LogIn size={20} />
                            <span>Sign in</span>
                        </div>
                        <div
                            className="w-full flex items-center gap-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                            title="Settings"
                        >
                            <Settings size={20} />
                            <span>Settings</span>
                        </div>
                        <div
                            className="w-full flex items-center gap-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                            title="Get help"
                        >
                            <CircleHelp size={20} />
                            <span>Get help</span>
                        </div>
                    </div>
                ))}

            {isAuthenticated ? (
                <img
                    className="size-9 rounded-full"
                    src={user?.picture}
                    alt="User Logo"
                />
            ) : (
                <UserRound
                    size={36}
                    className="p-1.5 outline outline-gray-400 dark:outline-gray-600 rounded-full text-gray-800 dark:text-gray-200 bg-gray-200/70 backdrop-blur-3xl dark:bg-gray-700/70"
                />
            )}
        </div>
    );
};

export default User;
