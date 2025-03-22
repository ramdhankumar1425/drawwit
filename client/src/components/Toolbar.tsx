import React from "react";
import { TOOLS, KEYBOARD_SHORTCUTS } from "../constants/index";
import { useCanvas } from "../context/CanvasProvider";
import {
    Eraser,
    Hand,
    Minus,
    MousePointer2,
    Pen,
    Square,
    Type,
} from "lucide-react";
import AISparkleIcon from "./AISparkleIcon";

const Toolbar: React.FC = () => {
    const { tool, setTool, handleGenerateWithAI } = useCanvas();

    return (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 p-1 rounded-r-lg bg-gray-300/70 dark:bg-gray-900/70 backdrop-blur-3xl shadow-2xl border border-l-0 border-gray-300 dark:border-gray-700">
            <div className="w-full h-full flex flex-col justify-center items-center gap-1.5">
                {/* Select */}
                <button
                    className={`w-10 h-10 flex justify-center items-center rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-950 hover:text-gray-900 dark:hover:text-gray-300 ${
                        tool === TOOLS.SELECT
                            ? "bg-gray-400 dark:bg-gray-950"
                            : ""
                    }`}
                    title={`${TOOLS.SELECT} (${KEYBOARD_SHORTCUTS.SELECT})`}
                    onClick={() => setTool(TOOLS.SELECT)}
                >
                    <MousePointer2 />
                </button>
                {/* Pan */}
                <button
                    className={`w-10 h-10 flex justify-center items-center rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-950 hover:text-gray-900 dark:hover:text-gray-300 ${
                        tool === TOOLS.PAN ? "bg-gray-400 dark:bg-gray-950" : ""
                    }`}
                    title={`${TOOLS.PAN} (${KEYBOARD_SHORTCUTS.PAN})`}
                    onClick={() => setTool(TOOLS.PAN)}
                >
                    <Hand />
                </button>
                {/* Pen */}
                <button
                    className={`w-10 h-10 flex justify-center items-center rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-950 hover:text-gray-900 dark:hover:text-gray-300 ${
                        tool === TOOLS.PEN ? "bg-gray-400 dark:bg-gray-950" : ""
                    }`}
                    title={`${TOOLS.PEN} (${KEYBOARD_SHORTCUTS.PEN})`}
                    onClick={() => setTool(TOOLS.PEN)}
                >
                    <Pen />
                </button>
                {/* Erase */}
                <button
                    className={`w-10 h-10 flex justify-center items-center rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-950 hover:text-gray-900 dark:hover:text-gray-300 ${
                        tool === TOOLS.ERASOR
                            ? "bg-gray-400 dark:bg-gray-950"
                            : ""
                    }`}
                    title={`${TOOLS.ERASOR} (${KEYBOARD_SHORTCUTS.ERASOR})`}
                    onClick={() => setTool(TOOLS.ERASOR)}
                >
                    <Eraser />
                </button>
                {/* Line */}
                <button
                    className={`w-10 h-10 flex justify-center items-center rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-950 hover:text-gray-900 dark:hover:text-gray-300 ${
                        tool === TOOLS.LINE
                            ? "bg-gray-400 dark:bg-gray-950"
                            : ""
                    }`}
                    title={`${TOOLS.LINE} (${KEYBOARD_SHORTCUTS.LINE})`}
                    onClick={() => setTool(TOOLS.LINE)}
                >
                    <Minus className="-rotate-45" />
                </button>
                {/* Rectangle */}
                <button
                    className={`w-10 h-10 flex justify-center items-center rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-950 hover:text-gray-900 dark:hover:text-gray-300 ${
                        tool === TOOLS.RECTANGLE
                            ? "bg-gray-400 dark:bg-gray-950"
                            : ""
                    }`}
                    title={`${TOOLS.RECTANGLE} (${KEYBOARD_SHORTCUTS.RECTANGLE})`}
                    onClick={() => setTool(TOOLS.RECTANGLE)}
                >
                    <Square />
                </button>
                {/* Text */}
                <button
                    className={`w-10 h-10 flex justify-center items-center rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-950 hover:text-gray-900 dark:hover:text-gray-300 ${
                        tool === TOOLS.TEXT
                            ? "bg-gray-400 dark:bg-gray-950"
                            : ""
                    }`}
                    title={`${TOOLS.TEXT} (${KEYBOARD_SHORTCUTS.TEXT})`}
                    onClick={() => setTool(TOOLS.TEXT)}
                >
                    <Type />
                </button>
                {/* Generate with AI */}
                <button
                    className={`w-10 h-10 flex justify-center items-center rounded-lg text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-950 hover:text-gray-900 dark:hover:text-gray-300`}
                    title={"Generate with AI"}
                    onClick={handleGenerateWithAI}
                >
                    <AISparkleIcon size={50} />
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
