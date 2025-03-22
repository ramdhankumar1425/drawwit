import { CanvasProvider } from "./context/CanvasProvider";
import Header from "./components/Header";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import PropsPanel from "./components/PropsPanel";
import Zoom from "./components/Zoom";
import User from "./components/User";
import { AuthProvider } from "./context/AuthProvider";
// import AIPromptBox from "./components/AIPromptBox";
import UndoRedo from "./components/UndoRedo";
import { CollabProvider } from "./context/CollabProvider";
import CollabCursors from "./components/CollabCursors";
import { SocketProvider } from "./context/SocketProvider";

function App() {
    return (
        <AuthProvider>
            <SocketProvider>
                <CollabProvider>
                    <CanvasProvider>
                        <div className="w-screen h-screen overflow-hidden relative bg-gray-100 dark:bg-gray-800">
                            <Header />
                            <Canvas />
                            <Toolbar />
                            <PropsPanel />
                            <Zoom />
                            <UndoRedo />
                            <User />
                            {/* <AIPromptBox /> */}
                            <CollabCursors />
                        </div>
                    </CanvasProvider>
                </CollabProvider>
            </SocketProvider>
        </AuthProvider>
    );
}

export default App;
