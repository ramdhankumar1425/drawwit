import React, { useState } from "react";
import { AlignCenter, AlignLeft, AlignRight, Minus, Plus } from "lucide-react";
import { useCanvas } from "../context/CanvasProvider";
import {
    STROKE_COLORS,
    FILL_COLORS,
    STROKE_WIDTHS,
    FONT_FAMILIES,
    FONT_SIZES,
    TEXT_ALIGNMENT,
    CUSTOM_COLORS,
} from "../constants/index";

const PropsPanel: React.FC = () => {
    const { properties, setProperties } = useCanvas();

    const handleChangeProperty = (key: string, value: string | number) => {
        setProperties({ ...properties, [key]: value });
    };

    return (
        <div className="absolute right-5 top-20 w-48 rounded-lg px-2.5 py-3 flex flex-col gap-3 backdrop-blur-3xl text-gray-900/70 dark:text-gray-100 bg-gray-200/70 dark:bg-gray-900/70 border border-gray-300 dark:border-gray-700 shadow-2xl font-roboto">
            {/* Stroke */}
            <div className="flex flex-col gap-1.5">
                <p className="text-sm select-none">Stroke</p>
                <ColorPicker
                    colors={STROKE_COLORS}
                    setColor={(value) => handleChangeProperty("stroke", value)}
                    currColor={properties.stroke}
                />
            </div>
            {/* Fill */}
            <div className="flex flex-col gap-1.5">
                <p className="text-sm select-none">Fill</p>
                <ColorPicker
                    colors={FILL_COLORS}
                    setColor={(value) => handleChangeProperty("fill", value)}
                    currColor={properties.fill}
                />
            </div>
            {/* Stroke Width */}
            <div className="flex flex-col gap-1.5">
                <p className="text-sm select-none">Stroke Width</p>
                <div className="flex items-center justify-start gap-3">
                    <Minus
                        className="p-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 "
                        size="30px"
                        strokeWidth={3}
                        onClick={() =>
                            handleChangeProperty(
                                "strokeWidth",
                                STROKE_WIDTHS.SMALL
                            )
                        }
                        style={
                            properties.strokeWidth === STROKE_WIDTHS.SMALL
                                ? {
                                      backgroundColor: "#d1d5db",
                                      color: "#111827",
                                  }
                                : {}
                        }
                    />
                    <Minus
                        className="p-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 "
                        size="30px"
                        strokeWidth={5}
                        onClick={() =>
                            handleChangeProperty(
                                "strokeWidth",
                                STROKE_WIDTHS.MEDIUM
                            )
                        }
                        style={
                            properties.strokeWidth === STROKE_WIDTHS.MEDIUM
                                ? {
                                      backgroundColor: "#d1d5db",
                                      color: "#111827",
                                  }
                                : {}
                        }
                    />
                    <Minus
                        className="p-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 "
                        size="30px"
                        strokeWidth={6}
                        onClick={() =>
                            handleChangeProperty(
                                "strokeWidth",
                                STROKE_WIDTHS.LARGE
                            )
                        }
                        style={
                            properties.strokeWidth === STROKE_WIDTHS.LARGE
                                ? {
                                      backgroundColor: "#d1d5db",
                                      color: "#111827",
                                  }
                                : {}
                        }
                    />
                    <Minus
                        className="p-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800 "
                        size="30px"
                        strokeWidth={7}
                        onClick={() =>
                            handleChangeProperty(
                                "strokeWidth",
                                STROKE_WIDTHS.EXTRA_LARGE
                            )
                        }
                        style={
                            properties.strokeWidth === STROKE_WIDTHS.EXTRA_LARGE
                                ? {
                                      backgroundColor: "#d1d5db",
                                      color: "#111827",
                                  }
                                : {}
                        }
                    />
                </div>
            </div>
            {/* Opacity */}
            <div className="hidden flex-col">
                <p className="text-sm mb-2 select-none">Opacity</p>
                <input
                    type="range"
                    min={0}
                    max={100}
                    className="mb-0.5 w-full h-2 rounded-lg appearance-none bg-gray-300 dark:bg-gray-700"
                />
                <p className="flex items-center justify-between text-xs px-1">
                    <span>0</span> <span>100</span>
                </p>
            </div>
            {/* Font */}
            <div className="flex flex-col gap-1.5">
                <p className="text-sm select-none">Font</p>
                <div className="flex items-center justify-start gap-3">
                    <span
                        className="h-8 w-8 select-none flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg cursor-default hover:bg-gray-300 dark:hover:bg-gray-800 "
                        title="Arial"
                        onClick={() =>
                            handleChangeProperty(
                                "fontFamily",
                                FONT_FAMILIES.ARIAL
                            )
                        }
                        style={
                            properties.fontFamily === FONT_FAMILIES.ARIAL
                                ? {
                                      backgroundColor:
                                          properties.fontFamily ===
                                              FONT_FAMILIES.ARIAL &&
                                          document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#1e2939"
                                              : "#d1d5db",
                                      color:
                                          properties.fontFamily ===
                                              FONT_FAMILIES.ARIAL &&
                                          !document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#111827"
                                              : "",
                                  }
                                : {}
                        }
                    >
                        A
                    </span>
                    <span
                        className="h-8 w-8 select-none flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg cursor-default hover:bg-gray-300 dark:hover:bg-gray-800 "
                        title="Mono"
                        onClick={() =>
                            handleChangeProperty(
                                "fontFamily",
                                FONT_FAMILIES.MONO
                            )
                        }
                        style={
                            properties.fontFamily === FONT_FAMILIES.MONO
                                ? {
                                      backgroundColor:
                                          properties.fontFamily ===
                                              FONT_FAMILIES.MONO &&
                                          document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#1e2939"
                                              : "#d1d5db",
                                      color:
                                          properties.fontFamily ===
                                              FONT_FAMILIES.MONO &&
                                          !document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#111827"
                                              : "",
                                  }
                                : {}
                        }
                    >
                        M
                    </span>
                    <span
                        className="h-8 w-8 select-none flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg cursor-default hover:bg-gray-300 dark:hover:bg-gray-800 "
                        title="Roboto"
                        onClick={() =>
                            handleChangeProperty(
                                "fontFamily",
                                FONT_FAMILIES.ROBOTO
                            )
                        }
                        style={
                            properties.fontFamily === FONT_FAMILIES.ROBOTO
                                ? {
                                      backgroundColor:
                                          properties.fontFamily ===
                                              FONT_FAMILIES.ROBOTO &&
                                          document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#1e2939"
                                              : "#d1d5db",
                                      color:
                                          properties.fontFamily ===
                                              FONT_FAMILIES.ROBOTO &&
                                          !document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#111827"
                                              : "",
                                  }
                                : {}
                        }
                    >
                        R
                    </span>
                    <span
                        className="h-8 w-8 select-none flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg cursor-default hover:bg-gray-300 dark:hover:bg-gray-800 "
                        title="Poppins"
                        onClick={() =>
                            handleChangeProperty(
                                "fontFamily",
                                FONT_FAMILIES.POPPINS
                            )
                        }
                        style={
                            properties.fontFamily === FONT_FAMILIES.POPPINS
                                ? {
                                      backgroundColor:
                                          properties.fontFamily ===
                                              FONT_FAMILIES.POPPINS &&
                                          document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#1e2939"
                                              : "#d1d5db",
                                      color:
                                          properties.fontFamily ===
                                              FONT_FAMILIES.POPPINS &&
                                          !document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#111827"
                                              : "",
                                  }
                                : {}
                        }
                    >
                        P
                    </span>
                </div>
            </div>
            {/* Font Size */}
            <div className="flex flex-col gap-1.5">
                <p className="text-sm select-none">Font Size</p>
                <div className="flex items-center justify-start gap-3">
                    <span
                        className="h-8 w-8 select-none flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg cursor-default hover:bg-gray-300 dark:hover:bg-gray-800 "
                        title="Small"
                        onClick={() =>
                            handleChangeProperty("fontSize", FONT_SIZES.SMALL)
                        }
                        style={
                            properties.fontSize === FONT_SIZES.SMALL
                                ? {
                                      backgroundColor:
                                          properties.fontSize ===
                                              FONT_SIZES.SMALL &&
                                          document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#1e2939"
                                              : "#d1d5db",
                                      color:
                                          properties.fontSize ===
                                              FONT_SIZES.SMALL &&
                                          !document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#111827"
                                              : "",
                                  }
                                : {}
                        }
                    >
                        S
                    </span>
                    <span
                        className="h-8 w-8 select-none flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg cursor-default hover:bg-gray-300 dark:hover:bg-gray-800 "
                        title="Medium"
                        onClick={() =>
                            handleChangeProperty("fontSize", FONT_SIZES.MEDIUM)
                        }
                        style={
                            properties.fontSize === FONT_SIZES.MEDIUM
                                ? {
                                      backgroundColor:
                                          properties.fontSize ===
                                              FONT_SIZES.MEDIUM &&
                                          document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#1e2939"
                                              : "#d1d5db",
                                      color:
                                          properties.fontSize ===
                                              FONT_SIZES.MEDIUM &&
                                          !document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#111827"
                                              : "",
                                  }
                                : {}
                        }
                    >
                        M
                    </span>
                    <span
                        className="h-8 w-8 select-none flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg cursor-default hover:bg-gray-300 dark:hover:bg-gray-800 "
                        title="Large"
                        onClick={() =>
                            handleChangeProperty("fontSize", FONT_SIZES.LARGE)
                        }
                        style={
                            properties.fontSize === FONT_SIZES.LARGE
                                ? {
                                      backgroundColor:
                                          properties.fontSize ===
                                              FONT_SIZES.LARGE &&
                                          document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#1e2939"
                                              : "#d1d5db",
                                      color:
                                          properties.fontSize ===
                                              FONT_SIZES.LARGE &&
                                          !document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#111827"
                                              : "",
                                  }
                                : {}
                        }
                    >
                        L
                    </span>
                    <span
                        className="h-8 w-8 select-none flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-lg cursor-default hover:bg-gray-300 dark:hover:bg-gray-800 "
                        title="Extra Large"
                        onClick={() =>
                            handleChangeProperty(
                                "fontSize",
                                FONT_SIZES.EXTRA_LARGE
                            )
                        }
                        style={
                            properties.fontSize === FONT_SIZES.EXTRA_LARGE
                                ? {
                                      backgroundColor:
                                          properties.fontSize ===
                                              FONT_SIZES.EXTRA_LARGE &&
                                          document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#1e2939"
                                              : "#d1d5db",
                                      color:
                                          properties.fontSize ===
                                              FONT_SIZES.EXTRA_LARGE &&
                                          !document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#111827"
                                              : "",
                                  }
                                : {}
                        }
                    >
                        XL
                    </span>
                </div>
            </div>
            {/* Text Align */}
            <div className="flex flex-col gap-1.5">
                <p className="text-sm select-none">Text Alignment</p>
                <div className="flex items-center justify-start gap-3">
                    <AlignLeft
                        size="30px"
                        className="p-1.5 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 "
                        onClick={() =>
                            handleChangeProperty(
                                "textAlignment",
                                TEXT_ALIGNMENT.LEFT
                            )
                        }
                        style={
                            properties.textAlignment === TEXT_ALIGNMENT.LEFT
                                ? {
                                      backgroundColor:
                                          properties.textAlignment ===
                                              TEXT_ALIGNMENT.LEFT &&
                                          document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#1e2939"
                                              : "#d1d5db",
                                      color:
                                          properties.textAlignment ===
                                              TEXT_ALIGNMENT.LEFT &&
                                          !document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#111827"
                                              : "",
                                  }
                                : {}
                        }
                    />
                    <AlignCenter
                        size="30px"
                        className="p-1.5 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 "
                        onClick={() =>
                            handleChangeProperty(
                                "textAlignment",
                                TEXT_ALIGNMENT.CENTER
                            )
                        }
                        style={
                            properties.textAlignment === TEXT_ALIGNMENT.CENTER
                                ? {
                                      backgroundColor:
                                          properties.textAlignment ===
                                              TEXT_ALIGNMENT.CENTER &&
                                          document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#1e2939"
                                              : "#d1d5db",
                                      color:
                                          properties.textAlignment ===
                                              TEXT_ALIGNMENT.CENTER &&
                                          !document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#111827"
                                              : "",
                                  }
                                : {}
                        }
                    />
                    <AlignRight
                        size="30px"
                        className="p-1.5 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800 "
                        onClick={() =>
                            handleChangeProperty(
                                "textAlignment",
                                TEXT_ALIGNMENT.RIGHT
                            )
                        }
                        style={
                            properties.textAlignment === TEXT_ALIGNMENT.RIGHT
                                ? {
                                      backgroundColor:
                                          properties.textAlignment ===
                                              TEXT_ALIGNMENT.RIGHT &&
                                          document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#1e2939"
                                              : "#d1d5db",
                                      color:
                                          properties.textAlignment ===
                                              TEXT_ALIGNMENT.RIGHT &&
                                          !document.documentElement.classList.contains(
                                              "dark"
                                          )
                                              ? "#111827"
                                              : "",
                                  }
                                : {}
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default PropsPanel;

interface ColorPickerProps {
    colors: string[];
    setColor: (value: string) => void;
    currColor?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
    colors,
    setColor,
    currColor,
}) => {
    const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);

    return (
        <div className="flex items-center justify-center relative">
            {colors.map((color, index) => (
                <span
                    key={index}
                    className="mr-2 p-3 rounded-full hover:scale-110 -75"
                    style={{
                        backgroundColor: color,
                        outline:
                            currColor === color ? "2px solid #60a5fa" : "none",
                    }}
                    onClick={() => setColor(color)}
                />
            ))}

            <hr className="border-t border-gray-300 dark:border-gray-700 w-5 rotate-90" />
            <Plus
                className="rounded-full scale-100 p-1 "
                onClick={() => setIsPickerOpen((prev) => !prev)}
                style={
                    colors.includes(currColor as string)
                        ? {
                              backgroundColor:
                                  document.documentElement.classList.contains(
                                      "dark"
                                  )
                                      ? "#1e2939"
                                      : "#d1d5db",
                          }
                        : { backgroundColor: currColor as string }
                }
            />

            {isPickerOpen && (
                <div className="absolute top-0 left-0 z-[10] flex flex-wrap gap-2 p-2 justify-center w-[140px] bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg">
                    {CUSTOM_COLORS.map((color, index) => (
                        <span
                            key={index}
                            className="p-3 rounded-full hover:scale-110"
                            style={{
                                backgroundColor: color,
                                outline:
                                    currColor === color
                                        ? "2px solid #60a5fa"
                                        : "none",
                            }}
                            onClick={() => setColor(color)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
