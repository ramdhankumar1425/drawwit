import { useCanvas } from "../context/CanvasProvider";

const Canvas = () => {
    const { canvasRef } = useCanvas();

    return <canvas id="canvas" ref={canvasRef} className="w-full h-full" />;
};

export default Canvas;
