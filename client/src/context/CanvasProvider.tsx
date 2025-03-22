import * as Fabric from "fabric";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { KEYBOARD_SHORTCUTS, TOOLS, ZOOM_LIMIT } from "../constants";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

interface CanvasContextValue {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    canvas: Fabric.Canvas | null;
    tool: string;
    setTool: React.Dispatch<React.SetStateAction<string>>;
    properties: Properties;
    setProperties: React.Dispatch<React.SetStateAction<Properties>>;
    isLocked: boolean;
    setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
    handleGenerateWithAI: () => void;
}

interface Properties {
    stroke: string;
    fill: string;
    strokeWidth: number;
    fontFamily: string;
    fontSize: number;
    textAlignment: string;
    opacity: number;
}

const CanvasContext = createContext<CanvasContextValue>(
    {} as CanvasContextValue
);

interface CanvasProviderProps {
    children: React.ReactNode;
}

export const CanvasProvider = ({ children }: CanvasProviderProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null); // reference to the dom-canvas element
    const [canvas, setCanvas] = useState<Fabric.Canvas | null>(null); // fabric canvas instance
    const [tool, setTool] = useState<string>(TOOLS.SELECT); // current selected tool
    const isDrawing = useRef<boolean>(false); // check if the user is drawing
    const currentElementId = useRef<string | null>(null); // id of the current element being drawn
    const [isLocked, setIsLocked] = useState<boolean>(false); // check if the editing is locked
    const isTextEditing = useRef<boolean>(false); // check if the text is being edited

    const [properties, setProperties] = useState<Properties>({
        stroke: "#ffffff",
        fill: "",
        strokeWidth: 1,
        fontFamily: "Arial",
        fontSize: 16,
        textAlignment: "left",
        opacity: 1,
    } as Properties); // properties from the properties panel

    // to add text to canvas
    const addText = useCallback(
        (x: number, y: number, defaultValue: string = "") => {
            if (!canvas) return;

            const textarea = document.createElement("textarea");
            textarea.value = defaultValue;
            textarea.style.zIndex = "1000";
            textarea.style.resize = "none";
            textarea.style.position = "absolute";
            textarea.style.left = `${x}px`;
            textarea.style.top = `${y}px`;
            textarea.style.outline = "none";
            if (!document.body.className.includes("dark"))
                textarea.style.caretColor = "black";

            textarea.style.fontFamily = properties.fontFamily;
            textarea.style.color = properties.stroke;
            textarea.style.textAlign = properties.textAlignment;

            isTextEditing.current = true;
            document.body.appendChild(textarea);
            setTimeout(() => {
                textarea.focus();
            }, 10);

            const handleClick = (ev: Fabric.TEvent<Fabric.TPointerEvent>) => {
                console.log("Click");
                if (ev.e.target !== textarea) {
                    const textbox = new Fabric.Textbox(textarea.value, {
                        left: x,
                        top: y,
                        fill: properties.stroke,
                        editable: true,
                    });

                    canvas.add(textbox);

                    textbox.on("editing:entered", () => {
                        isTextEditing.current = true;
                    });
                    textbox.on("editing:exited", () => {
                        isTextEditing.current = false;
                    });

                    document.body.removeChild(textarea);
                    isTextEditing.current = false;
                    setTool(TOOLS.SELECT);
                    canvas.off("mouse:down:before", handleClick);
                }
            };

            canvas.on("mouse:down:before", handleClick);
        },
        [canvas, properties]
    );

    // event handlers for mouse events on the canvas
    const onMouseMove = useCallback(
        (evt: Fabric.TEvent<Fabric.TPointerEvent>) => {
            console.log("Mouse is moving");
            if (!isDrawing.current) return;

            if (!canvas || isLocked) return;

            const { x, y } = canvas.getScenePoint(evt.e as PointerEvent);
            const id = currentElementId.current;

            switch (tool) {
                case TOOLS.PAN: {
                    canvas.selection = false;
                    const mEvent = evt.e as MouseEvent;
                    const delta = new Fabric.Point(
                        mEvent.movementX,
                        mEvent.movementY
                    );

                    canvas.relativePan(delta);

                    break;
                }
                case TOOLS.LINE: {
                    const line = canvas
                        .getObjects()
                        .find((obj) => obj.get("id") === id);

                    if (line) {
                        line.set({ x2: x, y2: y });
                        canvas.renderAll();
                    }
                    break;
                }
                case TOOLS.RECTANGLE: {
                    const rect = canvas
                        .getObjects()
                        .find((obj) => obj.get("id") === id);

                    if (rect) {
                        const { left, top } = rect.getBoundingRect();
                        const width = Math.abs(x - left);
                        const height = Math.abs(y - top);

                        rect.set({
                            width,
                            height,
                            top: y > top ? top : y,
                            left: x > left ? left : x,
                        });

                        canvas.renderAll();
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        },
        [tool, canvas, properties, isLocked]
    );
    const onMouseUp = useCallback(
        (_evt: Fabric.TEvent<Fabric.TPointerEvent>) => {
            if (!canvas || isLocked) return;

            isDrawing.current = false;
            currentElementId.current = null;
            canvas.renderAll();

            canvas.off("mouse:move", onMouseMove);
            canvas.off("mouse:up", onMouseUp);
        },
        [tool, canvas, properties, isLocked, onMouseMove]
    );
    const onMouseDown = useCallback(
        (evt: Fabric.TEvent<Fabric.TPointerEvent>) => {
            if (!canvas || isLocked) return;

            isDrawing.current = true;
            const { x, y } = canvas.getScenePoint(evt.e as PointerEvent);
            const id = tool + "__" + uuidv4();
            currentElementId.current = id;

            switch (tool) {
                case TOOLS.LINE: {
                    const line = new Fabric.Line([x, y, x + 1, y + 1], {
                        stroke: properties.stroke,
                        strokeWidth: properties.strokeWidth,
                    });
                    line.set("id", id);

                    canvas.add(line);
                    break;
                }
                case TOOLS.RECTANGLE: {
                    const rect = new Fabric.Rect({
                        left: x,
                        top: y,
                        width: 1,
                        height: 1,
                        fill: properties.fill,
                        stroke: properties.stroke,
                        strokeWidth: properties.strokeWidth,
                        selectable: true,
                    });
                    rect.set("id", id);

                    canvas.add(rect);
                    break;
                }
                case TOOLS.TEXT: {
                    addText(x, y);

                    break;
                }
                case TOOLS.ERASOR: {
                    const target = canvas.findTarget(evt.e as PointerEvent);

                    if (!target) return;

                    canvas.remove(target as Fabric.FabricObject);
                    break;
                }
                default: {
                    break;
                }
            }

            canvas.on("mouse:move", onMouseMove);
            canvas.on("mouse:up", onMouseUp);
        },
        [tool, canvas, properties, isLocked, onMouseMove, onMouseUp, addText]
    );
    const onMouseWheel = useCallback(
        (evt: Fabric.TEvent<WheelEvent>) => {
            if (!canvas || isTextEditing.current) return;

            const { deltaX, deltaY, ctrlKey, offsetX, offsetY } = evt.e;

            if (ctrlKey) {
                // Zooming
                let zoom = canvas.getZoom();

                zoom *= 1.01 ** -deltaY;

                if (zoom > ZOOM_LIMIT.MAX) zoom = ZOOM_LIMIT.MAX;
                if (zoom < ZOOM_LIMIT.MIN) zoom = ZOOM_LIMIT.MIN;

                canvas.zoomToPoint(
                    new Fabric.Point({
                        x: offsetX,
                        y: offsetY,
                    }),
                    zoom
                );
            } else {
                // Panning
                canvas.selection = false;
                const delta = new Fabric.Point(-deltaX, -deltaY);

                canvas.relativePan(delta);
            }

            evt.e.preventDefault();
            evt.e.stopPropagation();
        },
        [canvas]
    );
    const onObjectAdded = useCallback(() => {
        if (!canvas) return;
        console.log("Object added:");
    }, [canvas]);
    const onObjectModified = useCallback(() => {
        if (!canvas) return;
        console.log("Object modified:");
    }, [canvas]);
    const onObjectRemoved = useCallback(() => {
        if (!canvas) return;
        console.log("Object removed:");
    }, [canvas]);

    // delete selected objects from the canvas
    const handleDeleteSelected = useCallback(() => {
        if (!canvas || isLocked) return;

        canvas.getActiveObjects().forEach((obj) => canvas.remove(obj));

        // Clear active selection
        canvas.discardActiveObject();

        // Force re-render
        canvas.requestRenderAll();
    }, [canvas, isLocked]);

    // edit the selected objects properties
    const handleEditSelected = useCallback(() => {
        if (!canvas || isLocked) return;

        canvas.getActiveObjects().forEach((obj) => {
            obj.set({
                fill: properties.fill,
                stroke: properties.stroke,
                strokeWidth: properties.strokeWidth,
                opacity: properties.opacity,
            });

            if (obj instanceof Fabric.IText || obj instanceof Fabric.Textbox) {
                obj.set({
                    fontFamily: properties.fontFamily,
                    fontSize: properties.fontSize,
                    textAlign: properties.textAlignment,
                });
            }
        });

        canvas.requestRenderAll();
    }, [canvas, isLocked, properties]);

    // to generate with ai
    const handleGenerateWithAI = useCallback(async () => {
        console.log("Generating content with AI...");

        try {
            const userQuery =
                "Create a chart of biodiversity that describes three types of biodiversities and some examples with it. Use colourful styles. use dark theme";
            const currCanvas = canvas?.toJSON();

            const response = await axios.post(
                import.meta.env.VITE_SERVER_URI + "/api/generate-with-ai",
                {
                    userQuery,
                    currCanvas,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const { result, message } = await response.data;

            if (canvas) {
                canvas?.loadFromJSON(result);
                canvas.requestRenderAll();
            }

            console.log("message:", message);
        } catch (error) {
            console.error(error);
        }
    }, [canvas]);

    // to lock and unlock canvas
    useEffect(() => {
        if (!canvas) return;

        if (isLocked) {
            canvas.isDrawingMode = false;

            canvas.forEachObject((obj: Fabric.FabricObject) => {
                obj.evented = false;
            });
        } else {
            canvas.forEachObject((obj: Fabric.FabricObject) => {
                obj.evented = true;
            });
        }
    }, [canvas, isLocked]);

    // set the current tool on the canvas and set the properties accordingly
    useEffect(() => {
        if (!canvas || isLocked) return;
        handleEditSelected();
        // console.log(canvas.toJSON());

        if (tool === TOOLS.SELECT) {
            canvas.selection = true;

            return () => {
                canvas.selection = false;
            };
        } else if (tool === TOOLS.PAN) {
            canvas.getObjects().forEach((obj) => (obj.evented = false));

            return () => {
                canvas.getObjects().forEach((obj) => (obj.evented = true));
            };
        } else if (tool === TOOLS.PEN) {
            canvas.isDrawingMode = true;
            canvas.freeDrawingBrush = new Fabric.PencilBrush(canvas);
            canvas.freeDrawingBrush.color = properties.stroke;
            canvas.freeDrawingBrush.width = properties.strokeWidth;

            return () => {
                canvas.isDrawingMode = false;
            };
        } else if (tool === TOOLS.ERASOR) {
        } else if (tool === TOOLS.LINE) {
            canvas.getObjects().forEach((obj) => {
                obj.evented = false;
            });
            return () => {
                canvas.getObjects().forEach((obj) => {
                    obj.evented = true;
                });
            };
        } else if (tool === TOOLS.RECTANGLE) {
            canvas.getObjects().forEach((obj) => {
                obj.evented = false;
            });
            return () => {
                canvas.getObjects().forEach((obj) => {
                    obj.evented = true;
                });
            };
        }
    }, [tool, canvas, properties, isLocked, handleEditSelected]);

    // add event listeners to the canvas
    useEffect(() => {
        if (!canvas) return;

        canvas.on("mouse:down", onMouseDown);
        canvas.on("mouse:wheel", onMouseWheel);
        canvas.on("object:added", onObjectAdded);
        canvas.on("object:modified", onObjectModified);
        canvas.on("object:removed", onObjectRemoved);
        canvas.on("object:layout:after", () => {
            console.log("modify path");
        });

        return () => {
            canvas.off("mouse:down", onMouseDown);
            canvas.off("mouse:wheel", onMouseWheel);
            canvas.off("object:added", onObjectAdded);
            canvas.off("object:modified", onObjectModified);
            canvas.off("object:removed", onObjectRemoved);
        };
    }, [
        canvas,
        onMouseDown,
        onMouseWheel,
        onObjectAdded,
        onObjectModified,
        onObjectRemoved,
    ]);

    // initialize the canvas
    useEffect(() => {
        // localStorage.clear();
        if (!canvasRef.current) return;

        const fabricCanvas = new Fabric.Canvas(
            canvasRef.current as HTMLCanvasElement,
            {
                width: window.innerWidth,
                height: window.innerHeight,
                selection: true,
            }
        );

        setCanvas(fabricCanvas);

        return () => {
            fabricCanvas.dispose();
        };
    }, []);

    const handleKeyEvents = useCallback(
        (evt: KeyboardEvent) => {
            const key = evt.key.toLowerCase();

            if (isTextEditing.current) return;

            if (evt.altKey && key === KEYBOARD_SHORTCUTS.LOCK_TOOGLE) {
                setIsLocked((prev) => !prev);
                return;
            }

            switch (key) {
                case KEYBOARD_SHORTCUTS.SELECT:
                    setTool(TOOLS.SELECT);
                    break;
                case KEYBOARD_SHORTCUTS.PAN:
                    setTool(TOOLS.PAN);
                    break;
                case KEYBOARD_SHORTCUTS.PEN:
                    setTool(TOOLS.PEN);
                    break;
                case KEYBOARD_SHORTCUTS.ERASOR:
                    setTool(TOOLS.ERASOR);
                    break;
                case KEYBOARD_SHORTCUTS.LINE:
                    setTool(TOOLS.LINE);
                    break;
                case KEYBOARD_SHORTCUTS.RECTANGLE:
                    setTool(TOOLS.RECTANGLE);
                    break;
                case KEYBOARD_SHORTCUTS.TEXT:
                    setTool(TOOLS.TEXT);
                    break;
                case "delete":
                    handleDeleteSelected();
                    break;
                default:
                    break;
            }
        },
        [handleDeleteSelected, canvas]
    );

    // add event listener for keyboard shortcuts
    useEffect(() => {
        document.addEventListener("keydown", handleKeyEvents);

        return () => {
            document.removeEventListener("keydown", handleKeyEvents);
        };
    }, [handleKeyEvents]);

    const contextValue = useMemo(
        () => ({
            canvasRef,
            canvas,
            tool,
            setTool,
            properties,
            setProperties,
            isLocked,
            setIsLocked,
            handleGenerateWithAI,
        }),
        [canvas, tool, properties, isLocked, handleGenerateWithAI]
    );

    return <CanvasContext value={contextValue}>{children}</CanvasContext>;
};

export const useCanvas = () => {
    if (!CanvasContext) {
        throw new Error("useFabric must be used within a FabricProvider");
    }

    return useContext(CanvasContext);
};
