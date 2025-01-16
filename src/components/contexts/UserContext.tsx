import { createContext, ReactNode, useContext, useState } from "react";
import { User, UserContextProps } from "../../interfaces";

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | undefined>(undefined)

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within UserProvider")
    }

    return context;
}