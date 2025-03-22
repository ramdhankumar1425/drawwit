import React from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const UndoRedo: React.FC = () => {
    return (
        <div className="absolute bottom-3 right-14 flex items-center text-gray-800 dark:text-white bg-gray-300/70 dark:bg-gray-900/70 backdrop-blur-3xl rounded-lg overflow-hidden">
            <button className="h-full flex items-center justify-center p-1 pl-1.5 hover:bg-gray-400 dark:hover:bg-gray-950">
                <ChevronsLeft />
            </button>

            <button className="h-full flex items-center justify-center p-1 pr-1.5 hover:bg-gray-400 dark:hover:bg-gray-950">
                <ChevronsRight />
            </button>
        </div>
    );
};

export default UndoRedo;
