import { createContext,useContext, useEffect, useState } from "react";

export const ThemeContext = createContext()

export const useTheme = ()=>{
    return useContext(ThemeContext)
}
export const ThemeProvider = ({children}) => {
    const [isLightMode, setIsLightMode] = useState(false)
    

    const toggleTheme = () => {
        setIsLightMode(prev => !prev)
    }

    const theme = isLightMode?'light':'dark'

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
    },[isLightMode])

    return (
    <ThemeContext.Provider value={{theme,toggleTheme}} >
        {children}
    </ThemeContext.Provider>
    )
}
