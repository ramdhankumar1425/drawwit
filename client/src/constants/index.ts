const TOOLS = {
    SELECT: "Select",
    PAN: "Pan",
    PEN: "Pen",
    ERASOR: "Erasor",
    LINE: "Line",
    RECTANGLE: "Rectangle",
    TEXT: "Text",
};

const KEYBOARD_SHORTCUTS = {
    SELECT: "v",
    PAN: "h",
    PEN: "p",
    ERASOR: "e",
    LINE: "l",
    RECTANGLE: "r",
    TEXT: "t",
    LOCK_TOOGLE: "l",
};

const ZOOM_LIMIT = {
    MIN: 0.01,
    MAX: 10,
};

const ZOOM_STEP = 0.1;

const THEME_COLORS = {
    LIGHT: {
        CANVAS_BG: "#f5f5f5",
        TOOLBAR_BG: "#fff",
        TOOLBAR_ICON: "#000",
        TOOLBAR_ICON_ACTIVE: "#000",
        TOOLBAR_ICON_HOVER: "#000",
        TOOLBAR_ICON_ACTIVE_HOVER: "#000",
        TOOLBAR_ICON_DISABLED: "#000",
    },
    DARK: {
        CANVAS_BG: "#333",
        TOOLBAR_BG: "#444",
        TOOLBAR_ICON: "#fff",
        TOOLBAR_ICON_ACTIVE: "#fff",
        TOOLBAR_ICON_HOVER: "#fff",
        TOOLBAR_ICON_ACTIVE_HOVER: "#fff",
        TOOLBAR_ICON_DISABLED: "#fff",
    },
};

const STROKE_COLORS = ["#ffffff", "#e01919", "#e3d10b", "#09e811"];
const FILL_COLORS = ["", "#6f7870", "#2ec5d9", "#261b26"];
const CUSTOM_COLORS = [
    "#000000", // Black
    "#FFFFFF", // White
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#808080", // Gray
    "#800000", // Maroon
    "#808000", // Olive
    "#008000", // Dark Green
    "#800080", // Purple
    "#008080", // Teal
    "#FFA500", // Orange
    "#A52A2A", // Brown
];

const STROKE_WIDTHS = {
    SMALL: 0.1,
    MEDIUM: 0.3,
    LARGE: 0.5,
    EXTRA_LARGE: 1,
};

const FONT_FAMILIES = {
    ARIAL: "Arial",
    MONO: "mono",
    ROBOTO: "Roboto",
    POPPINS: "Poppins",
};

const FONT_SIZES = {
    SMALL: 12,
    MEDIUM: 16,
    LARGE: 20,
    EXTRA_LARGE: 24,
};

const TEXT_ALIGNMENT = {
    LEFT: "left",
    CENTER: "center",
    RIGHT: "right",
};

const LOCAL_STORAGE_CANVAS_ID = "fabric-canvas";

export {
    TOOLS,
    KEYBOARD_SHORTCUTS,
    ZOOM_LIMIT,
    ZOOM_STEP,
    THEME_COLORS,
    STROKE_COLORS,
    FILL_COLORS,
    STROKE_WIDTHS,
    FONT_FAMILIES,
    FONT_SIZES,
    TEXT_ALIGNMENT,
    LOCAL_STORAGE_CANVAS_ID,
    CUSTOM_COLORS,
};
