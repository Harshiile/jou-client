import { useContext, createContext, useState } from "react";

const userContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        role: null
    })
    return (
        <userContext.Provider value={[user, setUser]}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => useContext(userContext)