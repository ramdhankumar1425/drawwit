import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";

interface User {
    created_at: string;
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
}

interface AuthContext {
    isAuthenticated: boolean;
    user: User | null;
    signup: () => void;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, _setIsAuthenticated] = useState<boolean>(false);
    const [user, _setUser] = useState<User | null>({
        created_at: "2024-12-18T05:49:14.002Z",
        email: "ramdhankumar1425@gmail.com",
        email_verified: true,
        name: "Ramdhan Kumar",
        picture:
            "https://lh3.googleusercontent.com/a/ACg8ocJsQSS-Bbn5OoLCU7hhyDAhWtaMQYl2I3aEEran5DboUfJ_hic=s96-c",
    });

    const signup = useCallback(() => {}, []);
    const login = useCallback(() => {}, []);
    const logout = useCallback(() => {}, []);

    const contextValue = useMemo(
        () => ({
            isAuthenticated,
            user,
            signup,
            login,
            logout,
        }),
        [isAuthenticated, user, signup, login, logout]
    );

    return <AuthContext value={contextValue}>{children}</AuthContext>;
};

export const useAuth = () => {
    if (!AuthContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return useContext(AuthContext);
};
