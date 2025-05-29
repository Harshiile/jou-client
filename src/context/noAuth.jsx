import { useContext, createContext, useState } from "react";

const noAuthContext = createContext()

export const NoAuthProvider = ({ children }) => {
    const [noAuth, setNoAuth] = useState(null)
    return (
        <noAuthContext.Provider value={[noAuth, setNoAuth]}>
            {children}
        </noAuthContext.Provider>
    )
}

export const useNoAuth = () => useContext(noAuthContext)