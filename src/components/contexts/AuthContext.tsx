import { createContext, ReactNode, useContext, useState } from "react";
import { AuthContextProps } from "../../interfaces";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context;
}