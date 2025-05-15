import { useContext, createContext, useState } from "react";

const workSpacesContext = createContext()

export const WorkSpaceProvider = ({ children }) => {
    const [workSpaces, setWorkSpaces] = useState(null)
    return (
        <workSpacesContext.Provider value={[workSpaces, setWorkSpaces]}>
            {children}
        </workSpacesContext.Provider>
    )
}

export const useWorkSpaces = () => useContext(workSpacesContext)