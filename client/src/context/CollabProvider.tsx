import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useSocket } from "./SocketProvider";
import { SOCKET_EVENTS } from "../constants/socket";

interface Collaborator {
    created_at: string;
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
    cursor: {
        top: number;
        left: number;
    };
}

interface CollabContextValue {
    isCollaboration: boolean;
    setIsCollaboration: React.Dispatch<React.SetStateAction<boolean>>;
    canvasState: JSON | null;
    collaborators: Collaborator[];
}

const CollabContext = createContext<CollabContextValue>(
    {} as CollabContextValue
);

interface CollabProviderProps {
    children: React.ReactNode;
}

export const CollabProvider = ({ children }: CollabProviderProps) => {
    const [isCollaboration, setIsCollaboration] = useState<boolean>(false); // is collaboration ON/OFF
    const [canvasState, setCanvasState] = useState<JSON | null>(null); // JSON object of synced canvas
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]); // list of all the collaborators

    const { initSocket, socket, emitSocketEvent } = useSocket();

    const handleStartCollaboration = useCallback(async (currCanvasState) => {
        try {
            const response = await emitSocketEvent(
                SOCKET_EVENTS.START_COLLABORATION,
                {
                    currCanvasState,
                }
            );
        } catch (error) {
            console.error("Error in starting collaboration:", error);
        }
    }, []);
    const handleAddCollaborator = useCallback(() => {}, []);
    const handleRemoveCollaborator = useCallback(() => {}, []);
    const handleSendUpdate = useCallback(() => {}, []);
    const handleGetUpdate = useCallback(() => {}, []);

    // add/remove socket event listeners
    useEffect(() => {
        if (!socket) return;

        socket.on(SOCKET_EVENTS.START_COLLABORATION, handleStartCollaboration);
        socket.on(SOCKET_EVENTS.ADD_COLLABORATOR, handleAddCollaborator);
        socket.on(SOCKET_EVENTS.REMOVE_COLLABORATOR, handleRemoveCollaborator);
        socket.on(SOCKET_EVENTS.SEND_UPDATE, handleSendUpdate);
        socket.on(SOCKET_EVENTS.GET_UPDATE, handleGetUpdate);

        return () => {
            socket.off(
                SOCKET_EVENTS.START_COLLABORATION,
                handleStartCollaboration
            );
            socket.off(SOCKET_EVENTS.ADD_COLLABORATOR, handleAddCollaborator);
            socket.off(
                SOCKET_EVENTS.REMOVE_COLLABORATOR,
                handleRemoveCollaborator
            );
            socket.off(SOCKET_EVENTS.SEND_UPDATE, handleSendUpdate);
            socket.off(SOCKET_EVENTS.GET_UPDATE, handleGetUpdate);
        };
    }, [
        socket,
        handleStartCollaboration,
        handleAddCollaborator,
        handleRemoveCollaborator,
        handleSendUpdate,
        handleGetUpdate,
    ]);

    // initialize the socket if collaboration is ON
    useEffect(() => {
        if (isCollaboration) {
            initSocket();
        }
    }, [isCollaboration]);

    const contextValue = useMemo(
        () => ({
            isCollaboration,
            setIsCollaboration,
            canvasState,
            collaborators,
        }),
        [isCollaboration, canvasState, collaborators]
    );

    return <CollabContext value={contextValue}>{children}</CollabContext>;
};

export const useCollab = () => {
    if (!CollabContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return useContext(CollabContext);
};
