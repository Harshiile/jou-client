import { useContext, createContext, useState } from "react";

const channelsContext = createContext()

export const ChannelsProvider = ({ children }) => {
    const [channels, setChannels] = useState([])
    return (
        <channelsContext.Provider value={[channels, setChannels]}>
            {children}
        </channelsContext.Provider>
    )
}

export const useChannels = () => useContext(channelsContext)