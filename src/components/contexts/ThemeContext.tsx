import { createContext, ReactNode, useContext, useState } from "react";
import { ThemeContextProps } from "../../interfaces";

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({children}: {children: ReactNode}) {
    const [isDarkMode, setIsDarkMode] = useState(false)

    return (
        <ThemeContext.Provider value={{isDarkMode, setIsDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within ThemeProvider")
    }
    return context;
}