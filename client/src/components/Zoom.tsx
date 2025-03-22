import React from "react";
import { Lock, LockOpen, Minus, Plus } from "lucide-react";
import { ZOOM_LIMIT, ZOOM_STEP } from "../constants/index";
import { useCanvas } from "../context/CanvasProvider";
import { Point } from "fabric";

const Zoom: React.FC = () => {
    const { isLocked, setIsLocked, canvas } = useCanvas();

    const updateZoom = (action: string) => {
        if (!canvas) return;

        let zoom = canvas.getZoom();

        if (action === "inc") {
            zoom += ZOOM_STEP;
        } else if (action === "dec") {
            zoom -= ZOOM_STEP;
        }

        if (zoom < ZOOM_LIMIT.MIN) zoom = ZOOM_LIMIT.MIN;
        if (zoom > ZOOM_LIMIT.MAX) zoom = ZOOM_LIMIT.MAX;

        // canvas.setZoom(zoom);
        canvas.zoomToPoint(
            new Point(canvas.width / 2, canvas.height / 2),
            zoom
        );
    };

    return (
        <div className="absolute right-3 bottom-3 flex flex-col items-center justify-center text-gray-800 dark:text-white bg-gray-300/70 dark:bg-gray-900/70 backdrop-blur-3xl rounded-lg overflow-hidden">
            <button
                className="w-full flex items-center justify-center p-1 pt-1.5 hover:bg-gray-400 dark:hover:bg-gray-950"
                title={isLocked ? "Unlock (Alt+L)" : "Lock (Alt+L)"}
                onClick={() => setIsLocked((prev) => !prev)}
            >
                {isLocked ? (
                    <Lock className="scale-75" />
                ) : (
                    <LockOpen className="scale-75" />
                )}
            </button>

            <hr className="w-full border-gray-400 dark:border-gray-800" />

            <button
                className="w-full flex items-center justify-center p-1 hover:bg-gray-400 dark:hover:bg-gray-950"
                title="Zoom In"
                onClick={() => updateZoom("inc")}
                // disabled={zoom >= ZOOM_LIMIT.MAX}
            >
                <Plus className="scale-75" />
            </button>

            <hr className="w-full border-gray-400 dark:border-gray-800" />

            <button
                className="w-full flex items-center justify-center p-1 pb-1.5 hover:bg-gray-400 dark:hover:bg-gray-950"
                title="Zoom Out"
                onClick={() => updateZoom("dec")}
                // disabled={zoom <= ZOOM_LIMIT.MIN}
            >
                <Minus className="scale-75" />
            </button>
        </div>
    );
};

export default Zoom;
