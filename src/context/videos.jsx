import { useContext, createContext, useState } from "react";

const videosContext = createContext()

export const VideoProvider = ({ children }) => {
    const [videos, setVideos] = useState(null)
    return (
        <videosContext.Provider value={[videos, setVideos]}>
            {children}
        </videosContext.Provider>
    )
}

export const useVideos = () => useContext(videosContext)