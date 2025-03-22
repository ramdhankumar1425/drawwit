import React, { useRef } from "react";

// const MAX_HEIGHT = 200;

const AIPromptBox: React.FC = () => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-300/60 backdrop-blur-xs pt-20 flex justify-center text-gray-800 font-roboto text-lg">
            <textarea
                ref={textareaRef}
                className="w-1/2 h-fit px-5 py-3 pr-10 rounded-4xl bg-gray-300 border border-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                rows={1}
                placeholder="Write something here..."
            ></textarea>
        </div>
    );
};

export default AIPromptBox;
