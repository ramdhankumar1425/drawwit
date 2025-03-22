import React, { useState } from "react";
import { useCollab } from "../context/CollabProvider";
import { MousePointerClick } from "lucide-react";

const CollabCursors = () => {
    const { isCollaboration, collaborators } = useCollab();

    return (
        <>
            {isCollaboration &&
                collaborators.map(({ name, cursor }) => (
                    <Cursor
                        left={cursor.left}
                        top={cursor.top}
                        color={"#fff"}
                        name={name}
                    />
                ))}
        </>
    );
};

interface CursorProps {
    left: number;
    top: number;
    color?: string;
    name?: string;
}

export default CollabCursors;

const Cursor: React.FC<CursorProps> = ({ left, top, color, name }) => {
    const [showName, setShowName] = useState(false);

    return (
        <div
            className="absolute"
            style={{
                left: left,
                top: top,
            }}
        >
            <MousePointerClick
                stroke={color}
                className=""
                onMouseEnter={() => setShowName(true)}
                onMouseLeave={() => setShowName(false)}
            />
            {showName && (
                <p
                    className="mt-2 px-4 py-2.5 rounded-lg select-none"
                    style={{
                        backgroundColor: color,
                        color: invertColor(color),
                    }}
                >
                    {name}
                </p>
            )}
        </div>
    );
};

function invertColor(hex: string = "#000") {
    hex = hex.replace(/^#/, "");

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    r = 255 - r;
    g = 255 - g;
    b = 255 - b;

    // Convert back to hex
    return `#${((1 << 24) | (r << 16) | (g << 8) | b)
        .toString(16)
        .slice(1)
        .toUpperCase()}`;
}
