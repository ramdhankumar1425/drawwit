import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import {
    SOCKET_CONNECTION_TIMEOUT,
    SOCKET_RECONNECTION_ATTEMPTS,
    SOCKET_RECONNECTION_DELAY,
    SOCKET_RECONNECTION_DELAY_MAX,
} from "../constants/socket";

interface SocketContextValue {
    socket: Socket | null;
    emitSocketEvent: (event: string, data: object) => Promise<unknown>;
    initSocket: () => void;
}

interface SocketProviderProps {
    children: React.ReactNode;
}

interface SocketEventResponse {
    success: boolean;
    error: string;
    payload: object;
}

const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider = ({ children }: SocketProviderProps) => {
    const [socket, setSocket] = useState<Socket | null>(null); // to store the socket connection

    // to initialize the socket connection
    const initSocket = useCallback(() => {
        if (socket) return;

        const socketInstance = io(import.meta.env.VITE_SERVER_URI, {
            timeout: SOCKET_CONNECTION_TIMEOUT,
            reconnection: true,
            reconnectionAttempts: SOCKET_RECONNECTION_ATTEMPTS,
            reconnectionDelay: SOCKET_RECONNECTION_DELAY,
            reconnectionDelayMax: SOCKET_RECONNECTION_DELAY_MAX,
        });

        setSocket(socketInstance);

        socketInstance.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
            toast.error("Error in connecting to server. Please try again.");
        });

        socketInstance.on("disconnect", (reason) => {
            // console.warn("Socket disconnected:", reason);
            if (reason === "io server disconnect") {
                // Disconnected by server, attempt to reconnect
                toast.info("Connection to server lost. Reconnecting...");
                setTimeout(() => socketInstance.connect(), 5000); // reconnect after 5 seconds
            }
        });
    }, [socket]);

    // to emit socket events
    const emitSocketEvent = useCallback(
        async (event: string, data: object = {}) => {
            if (!socket) {
                console.error("Socket connection not initialized");
                return;
            }
            return new Promise((resolve, reject) => {
                socket.emit(event, data, (response: SocketEventResponse) => {
                    if (response.success) resolve(response);
                    else reject(new Error(response.error || "Unknown error"));
                });
            });
        },
        [socket]
    );

    const contextValue = useMemo(
        () => ({
            socket,
            initSocket,
            emitSocketEvent,
        }),
        [socket, initSocket, emitSocketEvent]
    );

    return <SocketContext value={contextValue}>{children}</SocketContext>;
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }

    return context;
};
