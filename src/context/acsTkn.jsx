import { useContext, createContext, useState } from "react";

const accessTokenContext = createContext()

export const AccessTokenProvider = ({ children }) => {
    const [acsTkn, setAcsTkn] = useState([])
    return (
        <accessTokenContext.Provider value={[acsTkn, setAcsTkn]}>
            {children}
        </accessTokenContext.Provider>
    )
}

export const useChannels = () => useContext(accessTokenContext)