import React from "react";

interface AISparkleIconProps {
    size?: number;
    className?: string;
}

const AISparkleIcon: React.FC<AISparkleIconProps> = ({
    size = 50,
    className = "",
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width={size}
            height={size}
            className={`group ${className} !transition-all !duration-500 hover:scale-105 ease-in-out`}
        >
            <defs>
                <linearGradient
                    id="textGradientLight"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#0066FF" />
                    <stop offset="50%" stopColor="#8800FF" />
                    <stop offset="100%" stopColor="#FF6600" />
                </linearGradient>
                <linearGradient
                    id="textGradientDark"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#00FFFF" />
                    <stop offset="30%" stopColor="#3388FF" />
                    <stop offset="70%" stopColor="#8855FF" />
                    <stop offset="100%" stopColor="#CC66FF" />
                </linearGradient>
            </defs>

            {/* Main AI text */}
            <text
                x="20"
                y="70"
                fontSize="48"
                className="font-bold fill-[url(#textGradientLight)] dark:fill-[url(#textGradientDark)] !transition-transform !duration-300 ease-in-out group-hover:rotate-4 select-none"
            >
                AI
            </text>

            {/* Sparkles */}
            <path
                className="fill-[#0066FF] dark:fill-cyan-400 origin-center !transition-transform !duration-500 ease-in-out group-hover:scale-110 group-hover:rotate-[20deg] group-hover:opacity-90"
                d="M70 20 L73 28 L81 31 L73 34 L70 42 L67 34 L59 31 L67 28 Z"
            />
            <path
                className="fill-[#8800FF] dark:fill-indigo-400 origin-center !transition-transform !duration-500 ease-in-out group-hover:scale-125 group-hover:-rotate-[15deg] group-hover:opacity-90"
                d="M55 15 L57 20 L62 22 L57 24 L55 29 L53 24 L48 22 L53 20 Z"
            />
            <path
                className="fill-[#FF6600] dark:fill-purple-400 origin-center !transition-transform !duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-[30deg] group-hover:opacity-90"
                d="M80 35 L82 40 L87 42 L82 44 L80 49 L78 44 L73 42 L78 40 Z"
            />

            {/* Small dots */}
            <circle
                className="fill-[#0066FF] dark:fill-cyan-400 !transition-transform !duration-500 ease-in-out group-hover:scale-110"
                cx="75"
                cy="15"
                r="2"
            />
            <circle
                className="fill-[#8800FF] dark:fill-indigo-400 !transition-transform !duration-500 ease-in-out group-hover:scale-110"
                cx="85"
                cy="25"
                r="1.5"
            />
            <circle
                className="fill-[#FF6600] dark:fill-purple-400 !transition-transform !duration-500 ease-in-out group-hover:scale-110"
                cx="65"
                cy="25"
                r="1"
            />
        </svg>
    );
};

export default AISparkleIcon;
